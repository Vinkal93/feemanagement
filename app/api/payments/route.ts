import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all payments
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const dateFrom = searchParams.get('dateFrom')
        const dateTo = searchParams.get('dateTo')
        const mode = searchParams.get('mode')
        const student = searchParams.get('student')
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '50')

        const skip = (page - 1) * limit

        const where: any = {}

        // Date range filter
        if (dateFrom || dateTo) {
            where.paymentDate = {}
            if (dateFrom) where.paymentDate.gte = new Date(dateFrom)
            if (dateTo) where.paymentDate.lte = new Date(dateTo)
        }

        // Payment mode filter
        if (mode && mode !== 'All') {
            where.paymentMode = mode
        }

        // Student filter
        if (student) {
            where.admission = {
                student: {
                    OR: [
                        { name: { contains: student, mode: 'insensitive' } },
                        { mobile: { contains: student } }
                    ]
                }
            }
        }

        const payments = await prisma.payment.findMany({
            where,
            include: {
                admission: {
                    include: {
                        student: true,
                        course: true,
                        batch: true
                    }
                },
                installment: true,
                collectedBy: {
                    select: {
                        name: true
                    }
                },
                receipt: true
            },
            skip,
            take: limit,
            orderBy: { paymentDate: 'desc' }
        })

        const total = await prisma.payment.count({ where })

        // Calculate summary
        const summary = await prisma.payment.aggregate({
            where,
            _sum: {
                totalAmount: true,
                amount: true,
                lateFee: true
            },
            _count: true
        })

        return NextResponse.json({
            payments,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            },
            summary: {
                totalAmount: summary._sum.totalAmount || 0,
                totalPayments: summary._count,
                totalLateFee: summary._sum.lateFee || 0
            }
        })
    } catch (error) {
        console.error('Error fetching payments:', error)
        return NextResponse.json(
            { error: 'Failed to fetch payments' },
            { status: 500 }
        )
    }
}

// POST create new payment
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Create payment
        const payment = await prisma.payment.create({
            data: {
                admissionId: body.admissionId,
                installmentId: body.installmentId,
                amount: body.amount,
                lateFee: body.lateFee || 0,
                totalAmount: body.amount + (body.lateFee || 0),
                paymentMode: body.paymentMode,
                transactionId: body.transactionId,
                paymentDate: body.paymentDate ? new Date(body.paymentDate) : new Date(),
                remarks: body.remarks,
                collectedById: body.collectedById || 'default-user-id' // TODO: Get from session
            },
            include: {
                admission: {
                    include: {
                        student: true,
                        course: true
                    }
                },
                installment: true
            }
        })

        // Update installment status if applicable
        if (body.installmentId) {
            const installment = await prisma.installment.findUnique({
                where: { id: body.installmentId }
            })

            if (installment) {
                const newPaidAmount = installment.paidAmount + body.amount
                const status = newPaidAmount >= installment.amount ? 'FULLY_PAID' : 'PARTIALLY_PAID'

                await prisma.installment.update({
                    where: { id: body.installmentId },
                    data: {
                        paidAmount: newPaidAmount,
                        status
                    }
                })
            }
        }

        // Generate receipt
        const receiptNumber = `RCP-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${String(payment.id).slice(-4).padStart(4, '0')}`

        await prisma.receipt.create({
            data: {
                paymentId: payment.id,
                receiptNumber
            }
        })

        return NextResponse.json(payment, { status: 201 })
    } catch (error) {
        console.error('Error creating payment:', error)
        return NextResponse.json(
            { error: 'Failed to create payment' },
            { status: 500 }
        )
    }
}
