import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all students
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const search = searchParams.get('search') || ''
        const course = searchParams.get('course') || ''
        const batch = searchParams.get('batch') || ''
        const status = searchParams.get('status') || ''
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')

        const skip = (page - 1) * limit

        const where: any = {}

        // Search filter
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { mobile: { contains: search } },
                { admissions: { some: { admissionNumber: { contains: search } } } }
            ]
        }

        // Get students with their admissions
        const students = await prisma.student.findMany({
            where,
            include: {
                admissions: {
                    where: {
                        ...(course && { courseId: course }),
                        ...(batch && { batchId: batch }),
                        ...(status && { status: status as any })
                    },
                    include: {
                        course: true,
                        batch: true,
                        feeStructure: true,
                        payments: true,
                        installments: true
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            },
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        })

        const total = await prisma.student.count({ where })

        // Calculate fee details for each student
        const studentsWithFees = students.map(student => {
            const admission = student.admissions[0]
            if (!admission) {
                return {
                    ...student,
                    admission: null,
                    totalFee: 0,
                    paid: 0,
                    balance: 0
                }
            }

            const totalPaid = admission.payments.reduce((sum, p) => sum + p.totalAmount, 0)
            const balance = admission.totalFee - totalPaid

            return {
                ...student,
                admission: {
                    ...admission,
                    totalPaid,
                    balance
                }
            }
        })

        return NextResponse.json({
            students: studentsWithFees,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('Error fetching students:', error)
        return NextResponse.json(
            { error: 'Failed to fetch students' },
            { status: 500 }
        )
    }
}

// POST create new student
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const student = await prisma.student.create({
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

        return NextResponse.json(student, { status: 201 })
    } catch (error) {
        console.error('Error creating student:', error)
        return NextResponse.json(
            { error: 'Failed to create student' },
            { status: 500 }
        )
    }
}
