"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
require("dotenv/config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting database seed...');
    // Create Institute
    const institute = await prisma.institute.upsert({
        where: { id: 'default-institute' },
        update: {},
        create: {
            id: 'default-institute',
            name: 'SBCI Computer Institute',
            address: 'Main Road, City',
            city: 'Your City',
            state: 'Your State',
            pincode: '123456',
            phone: '9876543210',
            email: 'info@sbci.com',
            gstNumber: 'GST123456'
        }
    });
    console.log('✅ Institute created');
    // Hash password for admin user
    const hashedPassword = await bcryptjs_1.default.hash('admin123', 10);
    // Create Default User
    const user = await prisma.user.upsert({
        where: { id: 'default-user-id' },
        update: {},
        create: {
            id: 'default-user-id',
            name: 'Admin User',
            email: 'admin@sbci.com',
            phone: '9876543210',
            role: 'ADMIN',
            password: hashedPassword,
            isActive: true
        }
    });
    console.log('✅ User created');
    // Create Courses
    const courses = await Promise.all([
        prisma.course.create({
            data: {
                name: 'ADCA',
                code: 'ADCA-001',
                description: 'Advanced Diploma in Computer Applications',
                duration: 12,
                isActive: true
            }
        }),
        prisma.course.create({
            data: {
                name: 'DCA',
                code: 'DCA-001',
                description: 'Diploma in Computer Applications',
                duration: 6,
                isActive: true
            }
        }),
        prisma.course.create({
            data: {
                name: 'Tally',
                code: 'TALLY-001',
                description: 'Tally ERP Course',
                duration: 3,
                isActive: true
            }
        }),
        prisma.course.create({
            data: {
                name: 'CCC',
                code: 'CCC-001',
                description: 'Course on Computer Concepts',
                duration: 2,
                isActive: true
            }
        })
    ]);
    console.log('✅ Courses created:', courses.length);
    // Create Late Fee Rule
    const lateFeeRule = await prisma.lateFeeRule.create({
        data: {
            name: 'Standard Late Fee',
            type: 'PER_DAY',
            amount: 50,
            description: 'Standard late fee of ₹50 per day'
        }
    });
    console.log('✅ Late Fee Rule created');
    // Create Fee Structures
    const feeStructures = await Promise.all([
        // ADCA - Installment
        prisma.feeStructure.create({
            data: {
                courseId: courses[0].id,
                name: 'ADCA - 6 Installments',
                totalFee: 12000,
                feeType: 'INSTALLMENT',
                installmentCount: 6,
                installmentAmount: 2000,
                installmentFrequency: 'MONTHLY',
                registrationFee: 1000,
                examFee: 500,
                lateFeeRuleId: lateFeeRule.id,
                isActive: true
            }
        }),
        // DCA - Installment
        prisma.feeStructure.create({
            data: {
                courseId: courses[1].id,
                name: 'DCA - 3 Installments',
                totalFee: 6000,
                feeType: 'INSTALLMENT',
                installmentCount: 3,
                installmentAmount: 2000,
                installmentFrequency: 'MONTHLY',
                registrationFee: 500,
                examFee: 300,
                lateFeeRuleId: lateFeeRule.id,
                isActive: true
            }
        }),
        // Tally - Lump Sum
        prisma.feeStructure.create({
            data: {
                courseId: courses[2].id,
                name: 'Tally - One Time',
                totalFee: 3000,
                feeType: 'LUMP_SUM',
                registrationFee: 300,
                examFee: 200,
                lateFeeRuleId: lateFeeRule.id,
                isActive: true
            }
        }),
        // CCC - Lump Sum
        prisma.feeStructure.create({
            data: {
                courseId: courses[3].id,
                name: 'CCC - One Time',
                totalFee: 2000,
                feeType: 'LUMP_SUM',
                registrationFee: 200,
                examFee: 100,
                lateFeeRuleId: lateFeeRule.id,
                isActive: true
            }
        })
    ]);
    console.log('✅ Fee Structures created:', feeStructures.length);
    // Create Batches
    const batches = await Promise.all([
        prisma.batch.create({
            data: {
                courseId: courses[0].id,
                name: 'Morning Batch',
                timing: '9:00 AM - 11:00 AM',
                facultyName: 'Mr. Sharma',
                maxStudents: 30,
                startDate: new Date('2025-01-01'),
                isActive: true
            }
        }),
        prisma.batch.create({
            data: {
                courseId: courses[0].id,
                name: 'Evening Batch',
                timing: '5:00 PM - 7:00 PM',
                facultyName: 'Ms. Verma',
                maxStudents: 25,
                startDate: new Date('2025-01-01'),
                isActive: true
            }
        }),
        prisma.batch.create({
            data: {
                courseId: courses[1].id,
                name: 'Afternoon Batch',
                timing: '2:00 PM - 4:00 PM',
                facultyName: 'Mr. Kumar',
                maxStudents: 20,
                startDate: new Date('2025-01-15'),
                isActive: true
            }
        })
    ]);
    console.log('✅ Batches created:', batches.length);
    // Create Sample Students
    const students = await Promise.all([
        prisma.student.create({
            data: {
                name: 'Rahul Kumar',
                fatherName: 'Suresh Kumar',
                mobile: '9876543210',
                email: 'rahul@example.com',
                address: '123 Main Street',
                city: 'Delhi',
                state: 'Delhi',
                pincode: '110001',
                dob: new Date('2000-05-15'),
                gender: 'MALE',
                isActive: true
            }
        }),
        prisma.student.create({
            data: {
                name: 'Priya Sharma',
                fatherName: 'Rajesh Sharma',
                mobile: '9876543211',
                email: 'priya@example.com',
                address: '456 Park Road',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400001',
                dob: new Date('2001-08-20'),
                gender: 'FEMALE',
                isActive: true
            }
        }),
        prisma.student.create({
            data: {
                name: 'Amit Verma',
                fatherName: 'Vijay Verma',
                mobile: '9876543212',
                email: 'amit@example.com',
                address: '789 Lake View',
                city: 'Bangalore',
                state: 'Karnataka',
                pincode: '560001',
                dob: new Date('1999-12-10'),
                gender: 'MALE',
                isActive: true
            }
        })
    ]);
    console.log('✅ Students created:', students.length);
    // Create Admissions
    const admissions = await Promise.all([
        prisma.admission.create({
            data: {
                studentId: students[0].id,
                courseId: courses[0].id,
                batchId: batches[0].id,
                feeStructureId: feeStructures[0].id,
                admissionNumber: 'ADM20250001',
                admissionDate: new Date('2025-01-01'),
                totalFee: 12000,
                registrationFee: 1000,
                examFee: 500,
                status: 'ACTIVE'
            }
        }),
        prisma.admission.create({
            data: {
                studentId: students[1].id,
                courseId: courses[1].id,
                batchId: batches[2].id,
                feeStructureId: feeStructures[1].id,
                admissionNumber: 'ADM20250002',
                admissionDate: new Date('2025-01-15'),
                totalFee: 6000,
                registrationFee: 500,
                examFee: 300,
                status: 'ACTIVE'
            }
        }),
        prisma.admission.create({
            data: {
                studentId: students[2].id,
                courseId: courses[0].id,
                batchId: batches[1].id,
                feeStructureId: feeStructures[0].id,
                admissionNumber: 'ADM20250003',
                admissionDate: new Date('2025-01-01'),
                totalFee: 12000,
                registrationFee: 1000,
                examFee: 500,
                status: 'ACTIVE'
            }
        })
    ]);
    console.log('✅ Admissions created:', admissions.length);
    // Create Installments for ADCA students
    const installments = [];
    for (let i = 0; i < 6; i++) {
        const dueDate = new Date('2025-02-01');
        dueDate.setMonth(dueDate.getMonth() + i);
        installments.push(prisma.installment.create({
            data: {
                admissionId: admissions[0].id,
                installmentNumber: i + 1,
                amount: 2000,
                dueDate,
                paidAmount: i === 0 ? 2000 : 0,
                status: i === 0 ? 'FULLY_PAID' : 'NOT_PAID'
            }
        }));
        installments.push(prisma.installment.create({
            data: {
                admissionId: admissions[2].id,
                installmentNumber: i + 1,
                amount: 2000,
                dueDate,
                paidAmount: 0,
                status: 'NOT_PAID'
            }
        }));
    }
    // Create Installments for DCA student
    for (let i = 0; i < 3; i++) {
        const dueDate = new Date('2025-02-15');
        dueDate.setMonth(dueDate.getMonth() + i);
        installments.push(prisma.installment.create({
            data: {
                admissionId: admissions[1].id,
                installmentNumber: i + 1,
                amount: 2000,
                dueDate,
                paidAmount: i === 0 ? 2000 : 0,
                status: i === 0 ? 'FULLY_PAID' : 'NOT_PAID'
            }
        }));
    }
    await Promise.all(installments);
    console.log('✅ Installments created:', installments.length);
    // Create Sample Payments
    const payments = await Promise.all([
        prisma.payment.create({
            data: {
                admissionId: admissions[0].id,
                installmentId: (await prisma.installment.findFirst({ where: { admissionId: admissions[0].id, installmentNumber: 1 } })).id,
                amount: 2000,
                lateFee: 0,
                totalAmount: 2000,
                paymentMode: 'CASH',
                paymentDate: new Date('2025-01-01'),
                remarks: 'First installment',
                collectedById: user.id
            }
        }),
        prisma.payment.create({
            data: {
                admissionId: admissions[1].id,
                installmentId: (await prisma.installment.findFirst({ where: { admissionId: admissions[1].id, installmentNumber: 1 } })).id,
                amount: 2000,
                lateFee: 0,
                totalAmount: 2000,
                paymentMode: 'UPI',
                transactionId: 'UPI123456',
                paymentDate: new Date('2025-01-15'),
                remarks: 'First installment',
                collectedById: user.id
            }
        })
    ]);
    console.log('✅ Payments created:', payments.length);
    // Create Receipts
    const receipts = await Promise.all([
        prisma.receipt.create({
            data: {
                paymentId: payments[0].id,
                receiptNumber: 'RCP-20250101-0001'
            }
        }),
        prisma.receipt.create({
            data: {
                paymentId: payments[1].id,
                receiptNumber: 'RCP-20250115-0002'
            }
        })
    ]);
    console.log('✅ Receipts created:', receipts.length);
    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Courses: ${courses.length}`);
    console.log(`- Batches: ${batches.length}`);
    console.log(`- Students: ${students.length}`);
    console.log(`- Admissions: ${admissions.length}`);
    console.log(`- Installments: ${installments.length}`);
    console.log(`- Payments: ${payments.length}`);
}
main()
    .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
