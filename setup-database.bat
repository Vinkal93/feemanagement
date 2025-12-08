@echo off
echo ========================================
echo Fee Management System - Quick Setup
echo ========================================
echo.

echo Step 1: Creating .env file...
echo DATABASE_URL="file:./dev.db" > .env
echo ✓ .env file created
echo.

echo Step 2: Installing dependencies...
call npm install -D ts-node
echo ✓ Dependencies installed
echo.

echo Step 3: Running database migrations...
call npx prisma migrate dev --name init
echo ✓ Migrations completed
echo.

echo Step 4: Generating Prisma Client...
call npx prisma generate
echo ✓ Prisma Client generated
echo.

echo Step 5: Seeding database with sample data...
call npx prisma db seed
echo ✓ Database seeded
echo.

echo ========================================
echo ✓ Setup Complete!
echo ========================================
echo.
echo Sample data created:
echo - 4 Courses (ADCA, DCA, Tally, CCC)
echo - 3 Batches
echo - 3 Students with admissions
echo - Sample payments and installments
echo.
echo To view data: npx prisma studio
echo To start app: npm run dev
echo.
pause
