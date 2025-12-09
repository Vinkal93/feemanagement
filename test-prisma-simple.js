const { PrismaClient } = require('@prisma/client')
require('dotenv/config')

console.log('Starting Prisma test...')
console.log('DATABASE_URL is set:', !!process.env.DATABASE_URL)

const prisma = new PrismaClient({
    log: ['error', 'warn'],
})

async function test() {
    try {
        console.log('Attempting to connect...')
        await prisma.$connect()
        console.log('✅ Connected successfully!')

        console.log('Testing query...')
        const result = await prisma.$queryRaw`SELECT 1 as test`
        console.log('✅ Query successful:', result)

        await prisma.$disconnect()
        console.log('✅ Disconnected successfully!')
    } catch (error) {
        console.error('❌ Error:', error.message)
        console.error('Error code:', error.code)
        console.error('Full error:', JSON.stringify(error, null, 2))
        process.exit(1)
    }
}

test()
