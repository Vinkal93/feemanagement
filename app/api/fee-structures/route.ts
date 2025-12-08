import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all fee structures
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const courseId = searchParams.get('courseId')

        const where: any = { isActive: true }
        if (courseId) where.courseId = courseId

        const feeStructures = await prisma.feeStructure.findMany({
            where,
            include: {
                course: true,
                lateFeeRule: true
            },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json({ feeStructures })
    } catch (error) {
        console.error('Error fetching fee structures:', error)
        return NextResponse.json(
            { error: 'Failed to fetch fee structures' },
            { status: 500 }
        )
    }
}

// POST create new fee structure
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const feeStructure = await prisma.feeStructure.create({
            data: {
                courseId: body.courseId,
                name: body.name,
                totalFee: parseFloat(body.totalFee),
                feeType: body.feeType,
                installmentCount: body.installmentCount ? parseInt(body.installmentCount) : null,
                installmentAmount: body.installmentAmount ? parseFloat(body.installmentAmount) : null,
                installmentFrequency: body.installmentFrequency,
                registrationFee: parseFloat(body.registrationFee || 0),
                examFee: parseFloat(body.examFee || 0),
                lateFeeRuleId: body.lateFeeRuleId,
                isActive: body.isActive !== undefined ? body.isActive : true
            },
            include: {
                course: true
            }
        })

        return NextResponse.json(feeStructure, { status: 201 })
    } catch (error) {
        console.error('Error creating fee structure:', error)
        return NextResponse.json(
            { error: 'Failed to create fee structure' },
            { status: 500 }
        )
    }
}
