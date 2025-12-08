# Database Setup Guide - Fee Management System

## 🚨 IMPORTANT: Yeh Steps Follow Karo

Database setup ke bina **koi bhi feature kaam nahi karega**. Course add karne par save nahi hoga, student add nahi hoga, kuch bhi data show nahi hoga.

---

## Option 1: SQLite (Sabse Easy - Testing Ke Liye) ⭐ RECOMMENDED

### Step 1: Update Prisma Schema

**File**: `prisma/schema.prisma`

Line 10 par change karo:

```prisma
datasource db {
  provider = "sqlite"  // "postgresql" se change karo
  url      = env("DATABASE_URL")
}
```

### Step 2: Create .env File

**File**: `.env` (root folder mein)

```bash
DATABASE_URL="file:./dev.db"
```

### Step 3: Run Migrations

Terminal mein run karo:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Step 4: Seed Sample Data

```bash
npx prisma db seed
```

### ✅ Done! Ab sab kaam karega!

---

## Option 2: PostgreSQL (Production Ke Liye)

### Step 1: Install PostgreSQL

Download: https://www.postgresql.org/download/

### Step 2: Create Database

PostgreSQL mein login karke:

```sql
CREATE DATABASE fee_management;
```

### Step 3: Update .env File

**File**: `.env`

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/fee_management"
```

Replace karo:
- `username` - Aapka PostgreSQL username
- `password` - Aapka PostgreSQL password

### Step 4: Run Migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Step 5: Seed Sample Data

```bash
npx prisma db seed
```

---

## 🎯 Sample Data Jo Create Hoga

### Courses (4):
1. **ADCA** - Advanced Diploma (12 months) - ₹12,000
2. **DCA** - Diploma (6 months) - ₹6,000
3. **Tally** - Tally ERP (3 months) - ₹3,000
4. **CCC** - Computer Concepts (2 months) - ₹2,000

### Batches (3):
1. **Morning Batch** - ADCA - 9:00 AM - 11:00 AM
2. **Evening Batch** - ADCA - 5:00 PM - 7:00 PM
3. **Afternoon Batch** - DCA - 2:00 PM - 4:00 PM

### Students (3):
1. **Rahul Kumar** - ADCA (Morning Batch)
2. **Priya Sharma** - DCA (Afternoon Batch)
3. **Amit Verma** - ADCA (Evening Batch)

### Payments:
- Rahul: ₹2,000 paid (1st installment)
- Priya: ₹2,000 paid (1st installment)

---

## 🔧 Troubleshooting

### Error: "Prisma Client not generated"

```bash
npx prisma generate
```

### Error: "Cannot find module @prisma/client"

```bash
npm install @prisma/client
npx prisma generate
```

### Error: "Migration failed"

Delete `prisma/migrations` folder and try again:

```bash
npx prisma migrate dev --name init
```

---

## ✅ Verify Setup

### Check Database:

```bash
npx prisma studio
```

Yeh browser mein open hoga aur aap data dekh sakte ho!

### Test in Application:

1. **Add Course**: 
   - Go to Courses
   - Click "Add Course"
   - Fill details
   - Submit
   - ✅ Course list mein dikhega

2. **Add Batch**:
   - Go to Batches
   - Click "New Batch"
   - Select course
   - Fill details
   - Submit
   - ✅ Batch list mein dikhega

3. **Add Student**:
   - Go to Students → New Admission
   - Fill all details
   - Select course and batch
   - Submit
   - ✅ Student list mein dikhega

4. **View Data**:
   - Dashboard: Real numbers dikhenge
   - Students: List mein students
   - Batches: Student count
   - Reports: Real data

---

## 📝 Package.json Update

Add this to `package.json`:

```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

Install ts-node:

```bash
npm install -D ts-node
```

---

## 🎉 After Setup

Sab kuchh kaam karega:
- ✅ Course add hoga aur save hoga
- ✅ Batch create hoga with course selection
- ✅ Student add hoga with course/batch assignment
- ✅ Payments record honge
- ✅ Reports mein real data
- ✅ Dashboard mein real statistics
- ✅ Excel export with real data

---

## 🚀 Quick Start (Copy-Paste)

```bash
# 1. Update .env file (create if not exists)
echo DATABASE_URL="file:./dev.db" > .env

# 2. Run migrations
npx prisma migrate dev --name init

# 3. Generate Prisma Client
npx prisma generate

# 4. Install ts-node
npm install -D ts-node

# 5. Seed database
npx prisma db seed

# 6. Open Prisma Studio to verify
npx prisma studio
```

---

## ⚡ One-Line Setup (SQLite)

```bash
echo DATABASE_URL="file:./dev.db" > .env && npx prisma migrate dev --name init && npx prisma generate && npm install -D ts-node && npx prisma db seed
```

Copy paste karo aur enter press karo - Done! 🎉
