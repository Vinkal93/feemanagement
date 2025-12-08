import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all batches
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const course = searchParams.get('course')
        const isActive = searchParams.get('isActive')

        const where: any = {}

        if (course) where.courseId = course
        if (isActive !== null) where.isActive = isActive === 'true'

        const batches = await prisma.batch.findMany({
            where,
            include: {
                course: true,
                _count: {
                    select: {
                        admissions: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json({ batches })
    } catch (error) {
        console.error('Error fetching batches:', error)
        return NextResponse.json(
            { error: 'Failed to fetch batches' },
            { status: 500 }
        )
    }
}

// POST create new batch
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const batch = await prisma.batch.create({
            data: {
                courseId: body.courseId,
                name: body.name,
                timing: body.timing,
                facultyName: body.facultyName,
                maxStudents: body.maxStudents || 30,
                startDate: new Date(body.startDate),
                endDate: body.endDate ? new Date(body.endDate) : null,
                isActive: body.isActive !== undefined ? body.isActive : true
            },
            include: {
                course: true
            }
        })

        return NextResponse.json(batch, { status: 201 })
    } catch (error) {
        console.error('Error creating batch:', error)
        return NextResponse.json(
            { error: 'Failed to create batch' },
            { status: 500 }
        )
    }
}
