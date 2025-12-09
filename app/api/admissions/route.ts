import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { InstallmentStatus } from '@prisma/client'

// POST create new admission
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // First, create or get student
        let student
        if (body.studentId) {
            student = await prisma.student.findUnique({
                where: { id: body.studentId }
            })
        } else {
            // Create new student
            student = await prisma.student.create({
                data: {
                    name: body.name,
                    fatherName: body.fatherName,
                    mobile: body.mobile,
                    alternateMobile: body.alternateMobile,
                    email: body.email,
                    address: body.address,
                    city: body.city,
                    state: body.state || 'India',
                    pincode: body.pincode,
                    dob: body.dob ? new Date(body.dob) : null,
                    gender: body.gender,
                    aadharNumber: body.aadharNumber,
                    photo: body.photo
                }
            })
        }

        if (!student) {
            return NextResponse.json(
                { error: 'Student not found' },
                { status: 404 }
            )
        }

        // Get fee structure
        const feeStructure = await prisma.feeStructure.findFirst({
            where: {
                id: body.feeStructureId,
                courseId: body.courseId
            }
        })

        if (!feeStructure) {
            return NextResponse.json(
                { error: 'Fee structure not found' },
                { status: 404 }
            )
        }

        // Generate admission number
        const count = await prisma.admission.count()
        const admissionNumber = `ADM${new Date().getFullYear()}${String(count + 1).padStart(4, '0')}`

        // Create admission
        const admission = await prisma.admission.create({
            data: {
                studentId: student.id,
                courseId: body.courseId,
                batchId: body.batchId,
                feeStructureId: body.feeStructureId,
                admissionNumber,
                admissionDate: body.admissionDate ? new Date(body.admissionDate) : new Date(),
                totalFee: feeStructure.totalFee,
                registrationFee: feeStructure.registrationFee,
                examFee: feeStructure.examFee,
                status: 'ACTIVE'
            },
            include: {
                student: true,
                course: true,
                batch: true,
                feeStructure: true
            }
        })

        // Create installments if applicable
        if (feeStructure.feeType === 'INSTALLMENT' && feeStructure.installmentCount) {
            const installments = []
            const installmentAmount = feeStructure.installmentAmount || 0
            const admissionDate = admission.admissionDate

            for (let i = 1; i <= feeStructure.installmentCount; i++) {
                const dueDate = new Date(admissionDate)
                dueDate.setMonth(dueDate.getMonth() + i)

                installments.push({
                    admissionId: admission.id,
                    installmentNumber: i,
                    amount: installmentAmount,
                    dueDate,
                    paidAmount: 0,
                    status: InstallmentStatus.NOT_PAID
                })
            }

            await prisma.installment.createMany({
                data: installments
            })
        }

        // Record registration fee payment if paid
        if (body.registrationFeePaid && feeStructure.registrationFee > 0) {
            await prisma.payment.create({
                data: {
                    admissionId: admission.id,
                    amount: feeStructure.registrationFee,
                    lateFee: 0,
                    totalAmount: feeStructure.registrationFee,
                    paymentMode: body.paymentMode || 'CASH',
                    transactionId: body.transactionId,
                    paymentDate: new Date(),
                    remarks: 'Registration Fee',
                    collectedById: body.collectedById || 'default-user-id'
                }
            })

            // Generate receipt
            const receiptNumber = `RCP-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${String(admission.id).slice(-4).padStart(4, '0')}`

            const payment = await prisma.payment.findFirst({
                where: { admissionId: admission.id },
                orderBy: { createdAt: 'desc' }
            })

            if (payment) {
                await prisma.receipt.create({
                    data: {
                        paymentId: payment.id,
                        receiptNumber
                    }
                })
            }
        }

        return NextResponse.json(admission, { status: 201 })
    } catch (error) {
        console.error('Error creating admission:', error)
        return NextResponse.json(
            { error: 'Failed to create admission' },
            { status: 500 }
        )
    }
}
