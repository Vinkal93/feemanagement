'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
    Download,
    Filter,
    Search,
    Calendar,
    DollarSign,
    Users,
    TrendingUp,
    FileText,
    Eye
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { exportPaymentsToExcel, exportStudentsToExcel, downloadExcelFile } from '@/lib/excel-export'

type ReportType = 'fee-collection' | 'dues' | 'students' | 'batch-wise' | 'monthly'

export default function ReportsPage() {
    const [activeReport, setActiveReport] = useState<ReportType>('fee-collection')
    const [loading, setLoading] = useState(false)
    const [reportData, setReportData] = useState<any>(null)

    // Filters
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [paymentMode, setPaymentMode] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')

    const reportTypes = [
        { id: 'fee-collection', name: 'Fee Collection', icon: DollarSign },
        { id: 'dues', name: 'Dues Report', icon: TrendingUp },
        { id: 'students', name: 'Student Report', icon: Users },
        { id: 'batch-wise', name: 'Batch-wise', icon: FileText },
        { id: 'monthly', name: 'Monthly Report', icon: Calendar }
    ]

    useEffect(() => {
        fetchReportData()
    }, [activeReport, dateFrom, dateTo, paymentMode, searchTerm])

    const fetchReportData = async () => {
        setLoading(true)
        try {
            if (activeReport === 'fee-collection') {
                const params = new URLSearchParams()
                if (dateFrom) params.append('dateFrom', dateFrom)
                if (dateTo) params.append('dateTo', dateTo)
                if (paymentMode !== 'All') params.append('mode', paymentMode)
                if (searchTerm) params.append('student', searchTerm)

                const response = await fetch(`/api/payments?${params}`)
                const data = await response.json()
                setReportData(data)
            } else if (activeReport === 'students') {
                const params = new URLSearchParams()
                if (searchTerm) params.append('search', searchTerm)

                const response = await fetch(`/api/students?${params}&limit=1000`)
                const data = await response.json()
                setReportData(data)
            }
        } catch (error) {
            console.error('Error fetching report data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleExport = async () => {
        try {
            if (activeReport === 'fee-collection' && reportData?.payments) {
                const buffer = await exportPaymentsToExcel(reportData.payments)
                downloadExcelFile(buffer, `fee-collection-report-${new Date().toISOString().split('T')[0]}.xlsx`)
            } else if (activeReport === 'students' && reportData?.students) {
                const buffer = await exportStudentsToExcel(reportData.students)
                downloadExcelFile(buffer, `students-report-${new Date().toISOString().split('T')[0]}.xlsx`)
            }
        } catch (error) {
            console.error('Error exporting:', error)
            alert('Failed to export. Please try again.')
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
                    <p className="text-sm text-gray-500 mt-1">Generate and export various reports</p>
                </div>

                {/* Report Type Selector */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {reportTypes.map((report) => {
                        const Icon = report.icon
                        return (
                            <button
                                key={report.id}
                                onClick={() => setActiveReport(report.id as ReportType)}
                                className={`p-4 rounded-lg border-2 transition-all ${activeReport === report.id
                                        ? 'border-indigo-600 bg-indigo-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <Icon className={`w-6 h-6 mx-auto mb-2 ${activeReport === report.id ? 'text-indigo-600' : 'text-gray-400'
                                    }`} />
                                <p className={`text-sm font-medium ${activeReport === report.id ? 'text-indigo-600' : 'text-gray-600'
                                    }`}>
                                    {report.name}
                                </p>
                            </button>
                        )
                    })}
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                                <Filter className="w-5 h-5 mr-2" />
                                Filters
                            </CardTitle>
                            <Button variant="outline" size="sm" onClick={() => {
                                setDateFrom('')
                                setDateTo('')
                                setPaymentMode('All')
                                setSearchTerm('')
                            }}>
                                Clear All
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {(activeReport === 'fee-collection' || activeReport === 'monthly') && (
                                <>
                                    <Input
                                        type="date"
                                        label="From Date"
                                        value={dateFrom}
                                        onChange={(e) => setDateFrom(e.target.value)}
                                    />
                                    <Input
                                        type="date"
                                        label="To Date"
                                        value={dateTo}
                                        onChange={(e) => setDateTo(e.target.value)}
                                    />
                                </>
                            )}

                            {activeReport === 'fee-collection' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Payment Mode
                                    </label>
                                    <select
                                        value={paymentMode}
                                        onChange={(e) => setPaymentMode(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    >
                                        <option value="All">All Modes</option>
                                        <option value="CASH">Cash</option>
                                        <option value="UPI">UPI</option>
                                        <option value="CARD">Card</option>
                                        <option value="BANK_TRANSFER">Bank Transfer</option>
                                        <option value="WALLET">Wallet</option>
                                        <option value="CHEQUE">Cheque</option>
                                    </select>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Search Student
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Name or mobile..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Report Content */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>
                                {reportTypes.find(r => r.id === activeReport)?.name}
                            </CardTitle>
                            <div className="flex items-center space-x-3">
                                <Button variant="outline" size="sm" onClick={fetchReportData}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View
                                </Button>
                                <Button variant="success" size="sm" onClick={handleExport}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Export to Excel
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500">Loading report data...</p>
                            </div>
                        ) : (
                            <>
                                {/* Fee Collection Report */}
                                {activeReport === 'fee-collection' && reportData && (
                                    <>
                                        {/* Summary Cards */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                            <Card>
                                                <CardContent className="pt-6">
                                                    <p className="text-sm text-gray-600">Total Collection</p>
                                                    <p className="text-2xl font-bold text-green-600 mt-2">
                                                        {formatCurrency(reportData.summary?.totalAmount || 0)}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                            <Card>
                                                <CardContent className="pt-6">
                                                    <p className="text-sm text-gray-600">Total Payments</p>
                                                    <p className="text-2xl font-bold text-gray-900 mt-2">
                                                        {reportData.summary?.totalPayments || 0}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                            <Card>
                                                <CardContent className="pt-6">
                                                    <p className="text-sm text-gray-600">Late Fees</p>
                                                    <p className="text-2xl font-bold text-orange-600 mt-2">
                                                        {formatCurrency(reportData.summary?.totalLateFee || 0)}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        {/* Payments Table */}
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b border-gray-200">
                                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Receipt</th>
                                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Student</th>
                                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Course</th>
                                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Mode</th>
                                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Collected By</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {reportData.payments?.map((payment: any) => (
                                                        <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                            <td className="py-3 px-4 text-sm text-gray-900">
                                                                {formatDate(payment.paymentDate)}
                                                            </td>
                                                            <td className="py-3 px-4 text-sm text-gray-600">
                                                                {payment.receipt?.receiptNumber || '-'}
                                                            </td>
                                                            <td className="py-3 px-4 text-sm text-gray-900">
                                                                {payment.admission?.student?.name}
                                                            </td>
                                                            <td className="py-3 px-4 text-sm text-gray-600">
                                                                {payment.admission?.course?.name}
                                                            </td>
                                                            <td className="py-3 px-4 text-sm font-medium text-gray-900">
                                                                {formatCurrency(payment.totalAmount)}
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <Badge variant={payment.paymentMode === 'CASH' ? 'warning' : 'success'}>
                                                                    {payment.paymentMode}
                                                                </Badge>
                                                            </td>
                                                            <td className="py-3 px-4 text-sm text-gray-600">
                                                                {payment.collectedBy?.name}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                )}

                                {/* Students Report */}
                                {activeReport === 'students' && reportData && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-gray-200">
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Mobile</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Course</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Batch</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Total Fee</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Paid</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Balance</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reportData.students?.map((student: any) => (
                                                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                        <td className="py-3 px-4 text-sm text-gray-900">{student.name}</td>
                                                        <td className="py-3 px-4 text-sm text-gray-600">{student.mobile}</td>
                                                        <td className="py-3 px-4 text-sm text-gray-600">
                                                            {student.admission?.course?.name || '-'}
                                                        </td>
                                                        <td className="py-3 px-4 text-sm text-gray-600">
                                                            {student.admission?.batch?.name || '-'}
                                                        </td>
                                                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                                                            {formatCurrency(student.admission?.totalFee || 0)}
                                                        </td>
                                                        <td className="py-3 px-4 text-sm text-green-600">
                                                            {formatCurrency(student.admission?.totalPaid || 0)}
                                                        </td>
                                                        <td className="py-3 px-4 text-sm font-medium">
                                                            <span className={(student.admission?.balance || 0) > 0 ? 'text-red-600' : 'text-green-600'}>
                                                                {formatCurrency(student.admission?.balance || 0)}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4">
                                                            <Badge variant={
                                                                student.admission?.status === 'ACTIVE' ? 'success' :
                                                                    student.admission?.status === 'COMPLETED' ? 'info' : 'default'
                                                            }>
                                                                {student.admission?.status || 'No Admission'}
                                                            </Badge>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* Other Reports - Placeholder */}
                                {(activeReport === 'dues' || activeReport === 'batch-wise' || activeReport === 'monthly') && (
                                    <div className="text-center py-12">
                                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-500">This report will be available once database is connected</p>
                                        <p className="text-sm text-gray-400 mt-1">Configure your database to see real data</p>
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
