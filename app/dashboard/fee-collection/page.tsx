'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
    Search,
    User,
    DollarSign,
    Calendar,
    CreditCard,
    Printer,
    Download,
    Send,
    CheckCircle,
    AlertCircle,
    Filter,
    X as CloseIcon
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function FeeCollectionPage() {
    const [selectedStudent, setSelectedStudent] = useState<any>(null)
    const [paymentAmount, setPaymentAmount] = useState('')
    const [paymentMode, setPaymentMode] = useState('Cash')
    const [transactionId, setTransactionId] = useState('')

    // Filter states
    const [filterMode, setFilterMode] = useState('All')
    const [filterDateFrom, setFilterDateFrom] = useState('')
    const [filterDateTo, setFilterDateTo] = useState('')
    const [filterStudent, setFilterStudent] = useState('')
    const [showFilters, setShowFilters] = useState(false)

    // Sample student data
    const sampleStudent = {
        id: '1',
        name: 'Rahul Kumar',
        mobile: '9876543210',
        course: 'ADCA',
        batch: 'Morning Batch',
        photo: null,
        totalFee: 12000,
        paid: 6000,
        balance: 6000,
        installments: [
            { id: 1, number: 1, amount: 2000, dueDate: '2025-01-15', paidAmount: 2000, status: 'FULLY_PAID' },
            { id: 2, number: 2, amount: 2000, dueDate: '2025-02-15', paidAmount: 2000, status: 'FULLY_PAID' },
            { id: 3, number: 3, amount: 2000, dueDate: '2025-03-15', paidAmount: 2000, status: 'FULLY_PAID' },
            { id: 4, number: 4, amount: 2000, dueDate: '2025-04-15', paidAmount: 0, status: 'NOT_PAID' },
            { id: 5, number: 5, amount: 2000, dueDate: '2025-05-15', paidAmount: 0, status: 'NOT_PAID' },
            { id: 6, number: 6, amount: 2000, dueDate: '2025-06-15', paidAmount: 0, status: 'NOT_PAID' },
        ]
    }

    const handleSearch = () => {
        // Simulate search
        setSelectedStudent(sampleStudent)
        setPaymentAmount('2000')
    }

    const handlePayment = async () => {
        // Validation
        if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
            alert('Please enter a valid payment amount')
            return
        }

        if (paymentMode !== 'Cash' && !transactionId) {
            alert('Please enter transaction ID for digital payments')
            return
        }

        try {
            console.log('Processing payment:', {
                studentId: selectedStudent?.id,
                amount: paymentAmount,
                mode: paymentMode,
                transactionId
            })

            // TODO: Replace with actual API call
            // const response = await fetch('/api/payments', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ ... })
            // })

            alert(`Payment of ₹${paymentAmount} collected successfully!`)

            // Reset form
            setPaymentAmount('')
            setTransactionId('')
            // Optionally refresh payment history
        } catch (error) {
            console.error('Error processing payment:', error)
            alert('Failed to process payment. Please try again.')
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'FULLY_PAID':
                return <Badge variant="success">Paid</Badge>
            case 'PARTIALLY_PAID':
                return <Badge variant="warning">Partial</Badge>
            case 'OVERDUE':
                return <Badge variant="danger">Overdue</Badge>
            default:
                return <Badge variant="default">Pending</Badge>
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Fee Collection</h1>
                    <p className="text-sm text-gray-500 mt-1">Search student and collect fee payment</p>
                </div>

                {/* Search Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Search Student</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search by name, mobile, or admission number..."
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                            <Button variant="primary" onClick={handleSearch}>
                                <Search className="w-4 h-4 mr-2" />
                                Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {selectedStudent && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Student Details */}
                        <div className="lg:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Student Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                                                <User className="w-8 h-8 text-indigo-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{selectedStudent.name}</p>
                                                <p className="text-sm text-gray-500">{selectedStudent.mobile}</p>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 pt-4 space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Course:</span>
                                                <span className="font-medium text-gray-900">{selectedStudent.course}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Batch:</span>
                                                <span className="font-medium text-gray-900">{selectedStudent.batch}</span>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 pt-4 space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Total Fee:</span>
                                                <span className="font-medium text-gray-900">{formatCurrency(selectedStudent.totalFee)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Paid:</span>
                                                <span className="font-medium text-green-600">{formatCurrency(selectedStudent.paid)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Balance:</span>
                                                <span className="font-bold text-lg text-red-600">{formatCurrency(selectedStudent.balance)}</span>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <div className="w-full bg-gray-200 rounded-full h-3">
                                                <div
                                                    className="bg-green-600 h-3 rounded-full"
                                                    style={{ width: `${(selectedStudent.paid / selectedStudent.totalFee) * 100}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 text-center">
                                                {Math.round((selectedStudent.paid / selectedStudent.totalFee) * 100)}% Paid
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Installment Schedule */}
                            <Card className="mt-6">
                                <CardHeader>
                                    <CardTitle>Installment Schedule</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {selectedStudent.installments.map((inst: any) => (
                                            <div
                                                key={inst.id}
                                                className={`p-3 rounded-lg border-2 ${inst.status === 'FULLY_PAID'
                                                    ? 'border-green-200 bg-green-50'
                                                    : inst.status === 'OVERDUE'
                                                        ? 'border-red-200 bg-red-50'
                                                        : 'border-gray-200 bg-white'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        Installment {inst.number}
                                                    </span>
                                                    {getStatusBadge(inst.status)}
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600">Due: {formatDate(inst.dueDate)}</span>
                                                    <span className="font-medium text-gray-900">{formatCurrency(inst.amount)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Payment Form */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Collect Payment</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {/* Next Due Alert */}
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                                            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-blue-900">Next Installment Due</p>
                                                <p className="text-sm text-blue-700 mt-1">
                                                    Installment #4 of ₹2,000 is due on {formatDate('2025-04-15')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Payment Amount */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Payment Amount <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    type="number"
                                                    value={paymentAmount}
                                                    onChange={(e) => setPaymentAmount(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 text-lg font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    placeholder="0"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="text-xs text-gray-500">Suggested: ₹2,000 (Next installment)</p>
                                                <button
                                                    onClick={() => setPaymentAmount('2000')}
                                                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                                                >
                                                    Use suggested
                                                </button>
                                            </div>
                                        </div>

                                        {/* Payment Mode */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Payment Mode <span className="text-red-500">*</span>
                                            </label>
                                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                                {['Cash', 'UPI', 'Card', 'Bank Transfer', 'Wallet'].map((mode) => (
                                                    <button
                                                        key={mode}
                                                        onClick={() => setPaymentMode(mode)}
                                                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${paymentMode === mode
                                                            ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                                                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                                                            }`}
                                                    >
                                                        {mode}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Transaction ID (for digital payments) */}
                                        {paymentMode !== 'Cash' && (
                                            <Input
                                                label="Transaction ID / Reference Number"
                                                value={transactionId}
                                                onChange={(e) => setTransactionId(e.target.value)}
                                                helperText="Enter UPI transaction ID or bank reference number"
                                            />
                                        )}

                                        {/* Payment Date */}
                                        <Input
                                            label="Payment Date"
                                            type="date"
                                            defaultValue={new Date().toISOString().split('T')[0]}
                                        />

                                        {/* Late Fee (if applicable) */}
                                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-orange-900">Late Fee</p>
                                                    <p className="text-xs text-orange-700 mt-1">No late fee applicable</p>
                                                </div>
                                                <span className="text-lg font-bold text-orange-900">₹0</span>
                                            </div>
                                        </div>

                                        {/* Remarks */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Remarks (Optional)
                                            </label>
                                            <textarea
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                placeholder="Add any notes or remarks..."
                                            />
                                        </div>

                                        {/* Total Summary */}
                                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Payment Amount:</span>
                                                <span className="font-medium text-gray-900">₹{paymentAmount || 0}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Late Fee:</span>
                                                <span className="font-medium text-gray-900">₹0</span>
                                            </div>
                                            <div className="border-t border-gray-200 pt-2 flex justify-between">
                                                <span className="font-medium text-gray-900">Total Amount:</span>
                                                <span className="font-bold text-xl text-gray-900">₹{paymentAmount || 0}</span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center space-x-3">
                                            <Button variant="success" className="flex-1" onClick={handlePayment}>
                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                Collect Payment
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setSelectedStudent(null)
                                                    setPaymentAmount('')
                                                    setTransactionId('')
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Payment History with Filters */}
                            <Card className="mt-6">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Payment History</CardTitle>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setShowFilters(!showFilters)}
                                        >
                                            <Filter className="w-4 h-4 mr-2" />
                                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {/* Filter Panel */}
                                    {showFilters && (
                                        <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4 border border-gray-200">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                {/* Date From */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        From Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={filterDateFrom}
                                                        onChange={(e) => setFilterDateFrom(e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                </div>

                                                {/* Date To */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        To Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={filterDateTo}
                                                        onChange={(e) => setFilterDateTo(e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                </div>

                                                {/* Payment Mode */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Payment Mode
                                                    </label>
                                                    <select
                                                        value={filterMode}
                                                        onChange={(e) => setFilterMode(e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    >
                                                        <option value="All">All Modes</option>
                                                        <option value="Cash">Cash</option>
                                                        <option value="UPI">UPI</option>
                                                        <option value="Card">Card</option>
                                                        <option value="Bank Transfer">Bank Transfer</option>
                                                        <option value="Wallet">Wallet</option>
                                                    </select>
                                                </div>

                                                {/* Student Search */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Student Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={filterStudent}
                                                        onChange={(e) => setFilterStudent(e.target.value)}
                                                        placeholder="Search by name..."
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                </div>
                                            </div>

                                            {/* Filter Actions */}
                                            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                                                <div className="text-sm text-gray-600">
                                                    {(filterMode !== 'All' || filterDateFrom || filterDateTo || filterStudent) && (
                                                        <span className="font-medium">
                                                            Filters applied
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            setFilterMode('All')
                                                            setFilterDateFrom('')
                                                            setFilterDateTo('')
                                                            setFilterStudent('')
                                                        }}
                                                    >
                                                        <CloseIcon className="w-4 h-4 mr-1" />
                                                        Clear Filters
                                                    </Button>
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        onClick={() => {
                                                            alert('Exporting payment history...')
                                                            // TODO: Implement CSV export
                                                        }}
                                                    >
                                                        <Download className="w-4 h-4 mr-1" />
                                                        Export
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Payment List */}
                                    <div className="space-y-3">
                                        {[
                                            { date: '2025-03-15', student: 'Rahul Kumar', amount: 2000, mode: 'UPI', receipt: 'RCP-20250315-0123' },
                                            { date: '2025-02-15', student: 'Priya Sharma', amount: 2000, mode: 'Cash', receipt: 'RCP-20250215-0098' },
                                            { date: '2025-01-15', student: 'Amit Singh', amount: 2000, mode: 'Card', receipt: 'RCP-20250115-0045' },
                                            { date: '2025-03-10', student: 'Neha Gupta', amount: 3000, mode: 'UPI', receipt: 'RCP-20250310-0089' },
                                            { date: '2025-02-28', student: 'Vikash Yadav', amount: 1500, mode: 'Bank Transfer', receipt: 'RCP-20250228-0067' },
                                        ]
                                            .filter(payment => {
                                                // Filter by mode
                                                if (filterMode !== 'All' && payment.mode !== filterMode) return false

                                                // Filter by date range
                                                if (filterDateFrom && payment.date < filterDateFrom) return false
                                                if (filterDateTo && payment.date > filterDateTo) return false

                                                // Filter by student name
                                                if (filterStudent && !payment.student.toLowerCase().includes(filterStudent.toLowerCase())) return false

                                                return true
                                            })
                                            .map((payment, index) => (
                                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <p className="text-sm font-medium text-gray-900">{payment.student}</p>
                                                            <p className="text-sm font-bold text-gray-900">{formatCurrency(payment.amount)}</p>
                                                        </div>
                                                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                            <span className="flex items-center">
                                                                <Calendar className="w-3 h-3 mr-1" />
                                                                {formatDate(payment.date)}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <CreditCard className="w-3 h-3 mr-1" />
                                                                {payment.mode}
                                                            </span>
                                                            <span className="text-gray-400">
                                                                {payment.receipt}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2 ml-4">
                                                        <button
                                                            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
                                                            title="Print Receipt"
                                                            onClick={() => alert(`Printing receipt ${payment.receipt}`)}
                                                        >
                                                            <Printer className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
                                                            title="Download Receipt"
                                                            onClick={() => alert(`Downloading receipt ${payment.receipt}`)}
                                                        >
                                                            <Download className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
                                                            title="Send Receipt"
                                                            onClick={() => alert(`Sending receipt ${payment.receipt} to ${payment.student}`)}
                                                        >
                                                            <Send className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}

                                        {/* Empty State */}
                                        {[
                                            { date: '2025-03-15', student: 'Rahul Kumar', amount: 2000, mode: 'UPI', receipt: 'RCP-20250315-0123' },
                                            { date: '2025-02-15', student: 'Priya Sharma', amount: 2000, mode: 'Cash', receipt: 'RCP-20250215-0098' },
                                            { date: '2025-01-15', student: 'Amit Singh', amount: 2000, mode: 'Card', receipt: 'RCP-20250115-0045' },
                                            { date: '2025-03-10', student: 'Neha Gupta', amount: 3000, mode: 'UPI', receipt: 'RCP-20250310-0089' },
                                            { date: '2025-02-28', student: 'Vikash Yadav', amount: 1500, mode: 'Bank Transfer', receipt: 'RCP-20250228-0067' },
                                        ]
                                            .filter(payment => {
                                                if (filterMode !== 'All' && payment.mode !== filterMode) return false
                                                if (filterDateFrom && payment.date < filterDateFrom) return false
                                                if (filterDateTo && payment.date > filterDateTo) return false
                                                if (filterStudent && !payment.student.toLowerCase().includes(filterStudent.toLowerCase())) return false
                                                return true
                                            }).length === 0 && (
                                                <div className="text-center py-12">
                                                    <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                                    <p className="text-gray-500 font-medium">No payments found</p>
                                                    <p className="text-sm text-gray-400 mt-1">
                                                        Try adjusting your filters
                                                    </p>
                                                </div>
                                            )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}
