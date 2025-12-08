# SBCI Fee Management System

A comprehensive web-based fee management system for SBCI Computer Institute built with Next.js, TypeScript, and PostgreSQL.

## Features

### ✅ Implemented Features

#### 1. Dashboard
- **6 KPI Cards**: Active students, today's collection, monthly collection with target, outstanding fees, overdue installments, new admissions
- **Charts**: Monthly collection bar chart, course-wise revenue pie chart
- **Data Tables**: Today's fee collection, upcoming dues (7 days), top defaulters
- **Quick Actions**: New admission, collect fee, view students, view dues

#### 2. Student Management
- **Student List**: Search, filter by course/status, sortable columns, pagination
- **Stats Cards**: Total students, active, completed, dropped
- **Multi-step Admission Form**:
  - Step 1: Personal details (name, mobile, address, photo, etc.)
  - Step 2: Course & batch selection
  - Step 3: Fee plan selection (lump sum or installments)
  - Step 4: Confirmation and review
- **Student Profile**: View details, payment history, installment schedule

#### 3. Fee Collection
- **Student Search**: By name, mobile, or admission number
- **Payment Form**: Multiple payment modes (Cash, UPI, Card, Bank Transfer, Wallet)
- **Installment Tracking**: Visual schedule with status indicators
- **Late Fee Calculation**: Automatic calculation based on overdue days
- **Receipt Generation**: Print, download, share options
- **Recent Payments**: Payment history with actions

#### 4. Dues Management
- **Stats Cards**: Total outstanding, students with dues, overdue 30+ days, due this week
- **Filters**: Course, batch, overdue days, sorting options
- **Bulk Selection**: Select multiple students for reminders
- **Overdue Highlighting**: Color-coded rows based on overdue severity
- **Reminder System**: Preview and send reminders to selected students

#### 5. Reports & Analytics
- **Report Types**:
  - Daily collection report
  - Monthly collection report
  - Course-wise revenue analysis
  - Defaulter report
  - User-wise collection
  - Admission report
- **Quick Stats**: Today's collection, monthly total, new admissions
- **Recent Reports**: List of generated reports with download options

#### 6. UI/UX Components
- **Responsive Design**: Mobile-first approach with sidebar navigation
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Reusable Components**: Button, Card, Input, Badge
- **Color Coding**: Status-based visual indicators
- **Interactive Charts**: Using Recharts library

### 🚧 To Be Implemented (Backend Integration)

- Database connection and Prisma setup
- Authentication with NextAuth.js
- API routes for CRUD operations
- Receipt PDF generation
- WhatsApp/SMS integration
- Backup functionality
- Audit logging
- User role management

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Headless UI
- **Icons**: Lucide React
- **Charts**: Recharts
- **Database**: PostgreSQL (schema ready)
- **ORM**: Prisma
- **Authentication**: NextAuth.js (to be configured)
- **Forms**: React Hook Form + Zod validation

## Project Structure

```
fee-management/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx                 # Main dashboard
│   │   ├── students/
│   │   │   ├── page.tsx            # Students list
│   │   │   └── new/
│   │   │       └── page.tsx        # New admission form
│   │   ├── fee-collection/
│   │   │   └── page.tsx            # Fee collection
│   │   ├── dues/
│   │   │   └── page.tsx            # Dues management
│   │   └── reports/
│   │       └── page.tsx            # Reports landing
│   └── page.tsx                     # Home (redirects to dashboard)
├── components/
│   ├── layout/
│   │   └── DashboardLayout.tsx     # Main layout with sidebar
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── Badge.tsx
├── lib/
│   ├── prisma.ts                    # Prisma client
│   └── utils.ts                     # Utility functions
├── prisma/
│   └── schema.prisma                # Database schema
└── .env                             # Environment variables
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd d:\Coding\fee-management
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Update the `.env` file with your database credentials:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/fee_management?schema=public"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

4. **Setup database**:
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations (creates database tables)
   npx prisma migrate dev --name init

   # (Optional) Seed database with sample data
   npx prisma db seed
   ```

5. **Run development server**:
   ```bash
   npm run dev
   ```

6. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The system includes the following models:

- **Institute**: Institute settings and configuration
- **User**: System users with role-based access
- **Course**: Course catalog
- **FeeStructure**: Fee templates with installment plans
- **Batch**: Batch scheduling
- **Student**: Student master data
- **Admission**: Student course enrollments
- **Installment**: Auto-generated payment schedule
- **Payment**: Payment records
- **Receipt**: Payment receipts
- **LateFeeRule**: Late fee calculation rules
- **AuditLog**: Activity tracking
- **Backup**: Backup history

## Key Features Explained

### Fee Collection Workflow
1. Search for student by name/mobile/ID
2. View student details and installment schedule
3. Enter payment amount (suggested: next installment)
4. Select payment mode (Cash, UPI, Card, etc.)
5. Add transaction ID (for digital payments)
6. System auto-calculates late fees if applicable
7. Generate receipt with unique number
8. Print, download, or share receipt

### Installment Management
- Auto-generated based on fee structure
- Status tracking: Not Paid, Partially Paid, Fully Paid, Overdue
- Visual progress indicators
- Automatic status updates on payment

### Dues Tracking
- Real-time outstanding balance calculation
- Overdue highlighting with color coding
- Bulk reminder functionality
- Customizable filters and sorting

## Utility Functions

Located in `lib/utils.ts`:

- `formatCurrency()`: Format numbers as Indian currency (₹)
- `formatDate()`: Format dates in DD MMM YYYY format
- `numberToWords()`: Convert numbers to words (for receipts)
- `generateReceiptNumber()`: Auto-generate unique receipt numbers
- `generateAdmissionNumber()`: Auto-generate admission numbers
- `calculateLateFee()`: Calculate late fees based on rules
- `getInstallmentStatus()`: Determine installment status

## Next Steps

1. **Database Setup**: Configure PostgreSQL and run migrations
2. **Authentication**: Implement login/logout with NextAuth.js
3. **API Routes**: Create backend endpoints for all CRUD operations
4. **Receipt PDF**: Implement PDF generation for receipts
5. **Testing**: Add unit and integration tests
6. **Deployment**: Deploy to production (Vercel/VPS)

## Development Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Prisma commands
npx prisma studio          # Open Prisma Studio (database GUI)
npx prisma migrate dev     # Create and apply migrations
npx prisma generate        # Generate Prisma client
```

## Contributing

This is a custom project for SBCI Computer Institute. For any modifications or enhancements, please contact the development team.

## License

Proprietary - SBCI Computer Institute

## Support

For support or queries, contact:
- Email: admin@sbci.com
- Phone: [Institute Phone Number]

---

**Built with ❤️ for SBCI Computer Institute**
