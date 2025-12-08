import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all courses
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const isActive = searchParams.get('isActive')

        const where: any = {}
        if (isActive !== null) where.isActive = isActive === 'true'

        const courses = await prisma.course.findMany({
            where,
            include: {
                _count: {
                    select: {
                        batches: true,
                        admissions: true,
                        feeStructures: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json({ courses })
    } catch (error) {
        console.error('Error fetching courses:', error)
        return NextResponse.json(
            { error: 'Failed to fetch courses' },
            { status: 500 }
        )
    }
}

// POST create new course
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const course = await prisma.course.create({
            data: {
                name: body.name,
                code: body.code,
                description: body.description,
                duration: parseInt(body.duration),
                isActive: body.isActive !== undefined ? body.isActive : true
            }
        })

        return NextResponse.json(course, { status: 201 })
    } catch (error) {
        console.error('Error creating course:', error)
        return NextResponse.json(
            { error: 'Failed to create course' },
            { status: 500 }
        )
    }
}
