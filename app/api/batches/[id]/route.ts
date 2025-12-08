import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET single batch with details
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const batch = await prisma.batch.findUnique({
            where: { id: params.id },
            include: {
                course: true,
                admissions: {
                    include: {
                        student: true,
                        payments: true,
                        installments: true
                    }
                }
            }
        })

        if (!batch) {
            return NextResponse.json(
                { error: 'Batch not found' },
                { status: 404 }
            )
        }

        // Calculate batch statistics
        const totalStudents = batch.admissions.length
        const totalFee = batch.admissions.reduce((sum, adm) => sum + adm.totalFee, 0)
        const totalCollected = batch.admissions.reduce((sum, adm) => {
            const paid = adm.payments.reduce((p, payment) => p + payment.totalAmount, 0)
            return sum + paid
        }, 0)
        const totalOutstanding = totalFee - totalCollected

        return NextResponse.json({
            ...batch,
            statistics: {
                totalStudents,
                totalFee,
                totalCollected,
                totalOutstanding,
                collectionRate: totalFee > 0 ? (totalCollected / totalFee) * 100 : 0
            }
        })
    } catch (error) {
        console.error('Error fetching batch:', error)
        return NextResponse.json(
            { error: 'Failed to fetch batch' },
            { status: 500 }
        )
    }
}

// PUT update batch
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()

        const batch = await prisma.batch.update({
            where: { id: params.id },
            data: {
                name: body.name,
                timing: body.timing,
                facultyName: body.facultyName,
                maxStudents: body.maxStudents,
                startDate: body.startDate ? new Date(body.startDate) : undefined,
                endDate: body.endDate ? new Date(body.endDate) : null,
                isActive: body.isActive
            },
            include: {
                course: true
            }
        })

        return NextResponse.json(batch)
    } catch (error) {
        console.error('Error updating batch:', error)
        return NextResponse.json(
            { error: 'Failed to update batch' },
            { status: 500 }
        )
    }
}

// DELETE batch
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.batch.delete({
            where: { id: params.id }
        })

        return NextResponse.json({ message: 'Batch deleted successfully' })
    } catch (error) {
        console.error('Error deleting batch:', error)
        return NextResponse.json(
            { error: 'Failed to delete batch' },
            { status: 500 }
        )
    }
}
