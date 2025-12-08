import ExcelJS from 'exceljs'

export async function exportStudentsToExcel(students: any[]) {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Students')

    // Define columns
    worksheet.columns = [
        { header: 'Admission No', key: 'admissionNumber', width: 15 },
        { header: 'Student Name', key: 'name', width: 25 },
        { header: 'Father Name', key: 'fatherName', width: 25 },
        { header: 'Mobile', key: 'mobile', width: 15 },
        { header: 'Email', key: 'email', width: 25 },
        { header: 'Course', key: 'course', width: 20 },
        { header: 'Batch', key: 'batch', width: 20 },
        { header: 'Total Fee', key: 'totalFee', width: 12 },
        { header: 'Paid', key: 'paid', width: 12 },
        { header: 'Balance', key: 'balance', width: 12 },
        { header: 'Status', key: 'status', width: 12 },
        { header: 'Admission Date', key: 'admissionDate', width: 15 },
    ]

    // Style header row
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } }
    worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4F46E5' }
    }
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }

    // Add data
    students.forEach(student => {
        const admission = student.admission
        worksheet.addRow({
            admissionNumber: admission?.admissionNumber || '-',
            name: student.name,
            fatherName: student.fatherName,
            mobile: student.mobile,
            email: student.email || '-',
            course: admission?.course?.name || '-',
            batch: admission?.batch?.name || '-',
            totalFee: admission?.totalFee || 0,
            paid: admission?.totalPaid || 0,
            balance: admission?.balance || 0,
            status: admission?.status || '-',
            admissionDate: admission?.admissionDate ? new Date(admission.admissionDate).toLocaleDateString() : '-'
        })
    })

    // Format currency columns
    worksheet.getColumn('totalFee').numFmt = '₹#,##0.00'
    worksheet.getColumn('paid').numFmt = '₹#,##0.00'
    worksheet.getColumn('balance').numFmt = '₹#,##0.00'

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer()
    return buffer
}

export async function exportPaymentsToExcel(payments: any[]) {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Payments')

    // Define columns
    worksheet.columns = [
        { header: 'Date', key: 'date', width: 15 },
        { header: 'Receipt No', key: 'receiptNumber', width: 20 },
        { header: 'Student Name', key: 'studentName', width: 25 },
        { header: 'Course', key: 'course', width: 20 },
        { header: 'Batch', key: 'batch', width: 20 },
        { header: 'Amount', key: 'amount', width: 12 },
        { header: 'Late Fee', key: 'lateFee', width: 12 },
        { header: 'Total', key: 'total', width: 12 },
        { header: 'Mode', key: 'mode', width: 15 },
        { header: 'Transaction ID', key: 'transactionId', width: 20 },
        { header: 'Collected By', key: 'collectedBy', width: 20 },
    ]

    // Style header row
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } }
    worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF10B981' }
    }
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }

    // Add data
    payments.forEach(payment => {
        worksheet.addRow({
            date: new Date(payment.paymentDate).toLocaleDateString(),
            receiptNumber: payment.receipt?.receiptNumber || '-',
            studentName: payment.admission?.student?.name || '-',
            course: payment.admission?.course?.name || '-',
            batch: payment.admission?.batch?.name || '-',
            amount: payment.amount,
            lateFee: payment.lateFee,
            total: payment.totalAmount,
            mode: payment.paymentMode,
            transactionId: payment.transactionId || '-',
            collectedBy: payment.collectedBy?.name || '-'
        })
    })

    // Format currency columns
    worksheet.getColumn('amount').numFmt = '₹#,##0.00'
    worksheet.getColumn('lateFee').numFmt = '₹#,##0.00'
    worksheet.getColumn('total').numFmt = '₹#,##0.00'

    // Add summary row
    const totalRow = worksheet.addRow({
        date: '',
        receiptNumber: '',
        studentName: '',
        course: '',
        batch: 'TOTAL',
        amount: { formula: `SUM(F2:F${worksheet.rowCount})` },
        lateFee: { formula: `SUM(G2:G${worksheet.rowCount})` },
        total: { formula: `SUM(H2:H${worksheet.rowCount})` },
        mode: '',
        transactionId: '',
        collectedBy: ''
    })

    totalRow.font = { bold: true }
    totalRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE5E7EB' }
    }

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer()
    return buffer
}

export async function exportBatchReportToExcel(batch: any) {
    const workbook = new ExcelJS.Workbook()

    // Summary Sheet
    const summarySheet = workbook.addWorksheet('Summary')
    summarySheet.columns = [
        { header: 'Metric', key: 'metric', width: 30 },
        { header: 'Value', key: 'value', width: 20 }
    ]

    summarySheet.addRow({ metric: 'Batch Name', value: batch.name })
    summarySheet.addRow({ metric: 'Course', value: batch.course?.name })
    summarySheet.addRow({ metric: 'Timing', value: batch.timing })
    summarySheet.addRow({ metric: 'Total Students', value: batch.statistics?.totalStudents || 0 })
    summarySheet.addRow({ metric: 'Total Fee', value: batch.statistics?.totalFee || 0 })
    summarySheet.addRow({ metric: 'Total Collected', value: batch.statistics?.totalCollected || 0 })
    summarySheet.addRow({ metric: 'Total Outstanding', value: batch.statistics?.totalOutstanding || 0 })
    summarySheet.addRow({ metric: 'Collection Rate', value: `${batch.statistics?.collectionRate?.toFixed(2) || 0}%` })

    // Students Sheet
    const studentsSheet = workbook.addWorksheet('Students')
    studentsSheet.columns = [
        { header: 'Student Name', key: 'name', width: 25 },
        { header: 'Mobile', key: 'mobile', width: 15 },
        { header: 'Admission No', key: 'admissionNumber', width: 15 },
        { header: 'Total Fee', key: 'totalFee', width: 12 },
        { header: 'Paid', key: 'paid', width: 12 },
        { header: 'Balance', key: 'balance', width: 12 },
        { header: 'Status', key: 'status', width: 12 }
    ]

    batch.admissions?.forEach((admission: any) => {
        const totalPaid = admission.payments?.reduce((sum: number, p: any) => sum + p.totalAmount, 0) || 0
        studentsSheet.addRow({
            name: admission.student?.name,
            mobile: admission.student?.mobile,
            admissionNumber: admission.admissionNumber,
            totalFee: admission.totalFee,
            paid: totalPaid,
            balance: admission.totalFee - totalPaid,
            status: admission.status
        })
    })

    const buffer = await workbook.xlsx.writeBuffer()
    return buffer
}

export function downloadExcelFile(buffer: ArrayBuffer, filename: string) {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    window.URL.revokeObjectURL(url)
}
