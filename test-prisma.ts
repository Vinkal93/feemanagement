import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set')

try {
    const prisma = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
    })
    console.log('PrismaClient created successfully')
    await prisma.$connect()
    console.log('Connected to database successfully')
    await prisma.$disconnect()
} catch (error) {
    console.error('Full error:', error)
    if (error instanceof Error) {
        console.error('Error message:', error.message)
        console.error('Error stack:', error.stack)
    }
}
