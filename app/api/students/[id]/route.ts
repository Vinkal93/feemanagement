import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET single student
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const student = await prisma.student.findUnique({
            where: { id: params.id },
            include: {
                admissions: {
                    include: {
                        course: true,
                        batch: true,
                        feeStructure: true,
                        installments: {
                            orderBy: { installmentNumber: 'asc' }
                        },
                        payments: {
                            include: {
                                collectedBy: {
                                    select: {
                                        name: true,
                                        email: true
                                    }
                                },
                                receipt: true
                            },
                            orderBy: { paymentDate: 'desc' }
                        }
                    }
                }
            }
        })

        if (!student) {
            return NextResponse.json(
                { error: 'Student not found' },
                { status: 404 }
            )
        }

        // Calculate totals
        const admission = student.admissions[0]
        if (admission) {
            const totalPaid = admission.payments.reduce((sum, p) => sum + p.totalAmount, 0)
            const balance = admission.totalFee - totalPaid

            return NextResponse.json({
                ...student,
                admission: {
                    ...admission,
                    totalPaid,
                    balance
                }
            })
        }

        return NextResponse.json(student)
    } catch (error) {
        console.error('Error fetching student:', error)
        return NextResponse.json(
            { error: 'Failed to fetch student' },
            { status: 500 }
        )
    }
}

// PUT update student
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()

        const student = await prisma.student.update({
            where: { id: params.id },
            data: {
                name: body.name,
                fatherName: body.fatherName,
                mobile: body.mobile,
                alternateMobile: body.alternateMobile,
                email: body.email,
                address: body.address,
                city: body.city,
                state: body.state,
                pincode: body.pincode,
                dob: body.dob ? new Date(body.dob) : null,
                gender: body.gender,
                aadharNumber: body.aadharNumber,
                photo: body.photo,
                isActive: body.isActive
            }
        })

        return NextResponse.json(student)
    } catch (error) {
        console.error('Error updating student:', error)
        return NextResponse.json(
            { error: 'Failed to update student' },
            { status: 500 }
        )
    }
}

// DELETE student
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.student.delete({
            where: { id: params.id }
        })

        return NextResponse.json({ message: 'Student deleted successfully' })
    } catch (error) {
        console.error('Error deleting student:', error)
        return NextResponse.json(
            { error: 'Failed to delete student' },
            { status: 500 }
        )
    }
}
