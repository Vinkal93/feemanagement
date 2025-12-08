import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)
        const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1)

        // Total active students
        const totalActiveStudents = await prisma.admission.count({
            where: { status: 'ACTIVE' }
        })

        // Today's collection
        const todayCollection = await prisma.payment.aggregate({
            where: {
                paymentDate: {
                    gte: today,
                    lt: tomorrow
                }
            },
            _sum: {
                totalAmount: true
            }
        })

        // This month's collection
        const thisMonthCollection = await prisma.payment.aggregate({
            where: {
                paymentDate: {
                    gte: thisMonthStart,
                    lt: nextMonthStart
                }
            },
            _sum: {
                totalAmount: true
            }
        })

        // Total outstanding
        const allAdmissions = await prisma.admission.findMany({
            where: { status: 'ACTIVE' },
            include: {
                payments: true
            }
        })

        const totalOutstanding = allAdmissions.reduce((sum, adm) => {
            const paid = adm.payments.reduce((p, payment) => p + payment.totalAmount, 0)
            return sum + (adm.totalFee - paid)
        }, 0)

        // Overdue installments
        const overdueInstallments = await prisma.installment.findMany({
            where: {
                dueDate: { lt: today },
                status: { in: ['NOT_PAID', 'PARTIALLY_PAID'] }
            },
            include: {
                admission: {
                    include: {
                        student: true
                    }
                }
            }
        })

        const overdueAmount = overdueInstallments.reduce((sum, inst) =>
            sum + (inst.amount - inst.paidAmount), 0
        )

        // New admissions this month
        const newAdmissions = await prisma.admission.count({
            where: {
                admissionDate: {
                    gte: thisMonthStart,
                    lt: nextMonthStart
                }
            }
        })

        // Today's collections list
        const todayPayments = await prisma.payment.findMany({
            where: {
                paymentDate: {
                    gte: today,
                    lt: tomorrow
                }
            },
            include: {
                admission: {
                    include: {
                        student: true,
                        course: true,
                        batch: true
                    }
                },
                collectedBy: {
                    select: { name: true }
                }
            },
            orderBy: { paymentDate: 'desc' },
            take: 10
        })

        // Upcoming dues (next 7 days)
        const sevenDaysLater = new Date(today)
        sevenDaysLater.setDate(sevenDaysLater.getDate() + 7)

        const upcomingDues = await prisma.installment.findMany({
            where: {
                dueDate: {
                    gte: today,
                    lte: sevenDaysLater
                },
                status: { in: ['NOT_PAID', 'PARTIALLY_PAID'] }
            },
            include: {
                admission: {
                    include: {
                        student: true,
                        course: true
                    }
                }
            },
            orderBy: { dueDate: 'asc' },
            take: 10
        })

        // Top defaulters
        const topDefaulters = overdueInstallments
            .slice(0, 10)
            .map(inst => ({
                student: inst.admission.student.name,
                course: inst.admission.course,
                pending: inst.amount - inst.paidAmount,
                daysOverdue: Math.floor((today.getTime() - inst.dueDate.getTime()) / (1000 * 60 * 60 * 24))
            }))

        return NextResponse.json({
            kpis: {
                totalActiveStudents,
                todayCollection: todayCollection._sum.totalAmount || 0,
                thisMonthCollection: thisMonthCollection._sum.totalAmount || 0,
                totalOutstanding,
                overdueAmount,
                overdueCount: overdueInstallments.length,
                newAdmissions
            },
            todayPayments: todayPayments.map(p => ({
                time: p.paymentDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
                student: p.admission.student.name,
                course: p.admission.course.name,
                amount: p.totalAmount,
                mode: p.paymentMode,
                collector: p.collectedBy.name
            })),
            upcomingDues: upcomingDues.map(inst => ({
                dueDate: inst.dueDate.toISOString().split('T')[0],
                student: inst.admission.student.name,
                course: inst.admission.course.name,
                amount: inst.amount - inst.paidAmount,
                mobile: inst.admission.student.mobile
            })),
            topDefaulters
        })
    } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        return NextResponse.json(
            { error: 'Failed to fetch dashboard stats' },
            { status: 500 }
        )
    }
}
