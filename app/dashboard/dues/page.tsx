'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
    Filter,
    Download,
    Send,
    AlertTriangle,
    Calendar,
    DollarSign
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useState } from 'react'

// Sample data
const duesData = [
    {
        id: '1',
        student: 'Rajesh Verma',
        mobile: '9876543210',
        course: 'ADCA',
        batch: 'Morning',
        totalFee: 12000,
        paid: 4000,
        balance: 8000,
        lastPayment: '2025-02-15',
        daysOverdue: 45,
        nextDue: '2025-03-15'
    },
    {
        id: '2',
        student: 'Sunita Devi',
        mobile: '9876543211',
        course: 'Tally',
        batch: 'Evening',
        totalFee: 9000,
        paid: 3000,
        balance: 6000,
        lastPayment: '2025-03-01',
        daysOverdue: 30,
        nextDue: '2025-04-01'
    },
    {
        id: '3',
        student: 'Anil Kumar',
        mobile: '9876543212',
        course: 'CCC',
        batch: 'Morning',
        totalFee: 6000,
        paid: 1500,
        balance: 4500,
        lastPayment: '2025-03-10',
        daysOverdue: 25,
        nextDue: '2025-04-10'
    },
    {
        id: '4',
        student: 'Geeta Sharma',
        mobile: '9876543213',
        course: 'ADCA',
        batch: 'Evening',
        totalFee: 12000,
        paid: 6000,
        balance: 6000,
        lastPayment: '2025-03-20',
        daysOverdue: 15,
        nextDue: '2025-04-20'
    },
    {
        id: '5',
        student: 'Ramesh Yadav',
        mobile: '9876543214',
        course: 'Tally',
        batch: 'Morning',
        totalFee: 9000,
        paid: 4500,
        balance: 4500,
        lastPayment: '2025-03-25',
        daysOverdue: 10,
        nextDue: '2025-04-25'
    },
]

export default function DuesPage() {
    const [selectedStudents, setSelectedStudents] = useState<string[]>([])
    const [filterCourse, setFilterCourse] = useState('')
    const [filterOverdue, setFilterOverdue] = useState('')

    const toggleStudent = (id: string) => {
        setSelectedStudents(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        )
    }

    const toggleAll = () => {
        setSelectedStudents(
            selectedStudents.length === duesData.length ? [] : duesData.map(d => d.id)
        )
    }

    const getOverdueBadge = (days: number) => {
        if (days > 30) return <Badge variant="danger">{days} days</Badge>
        if (days > 7) return <Badge variant="warning">{days} days</Badge>
        return <Badge variant="info">{days} days</Badge>
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dues Management</h1>
                        <p className="text-sm text-gray-500 mt-1">Track and manage pending fee payments</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                        <Button variant="primary" disabled={selectedStudents.length === 0}>
                            <Send className="w-4 h-4 mr-2" />
                            Send Reminders ({selectedStudents.length})
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Outstanding</p>
                                    <p className="text-2xl font-bold text-red-600 mt-2">{formatCurrency(280000)}</p>
                                </div>
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-red-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Students with Dues</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-2">125</p>
                                </div>
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Overdue (30+ days)</p>
                                    <p className="text-2xl font-bold text-red-600 mt-2">45</p>
                                </div>
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-red-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Due This Week</p>
                                    <p className="text-2xl font-bold text-orange-600 mt-2">28</p>
                                </div>
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <select
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={filterCourse}
                                onChange={(e) => setFilterCourse(e.target.value)}
                            >
                                <option value="">All Courses</option>
                                <option value="ADCA">ADCA</option>
                                <option value="CCC">CCC</option>
                                <option value="Tally">Tally</option>
                            </select>

                            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option value="">All Batches</option>
                                <option value="Morning">Morning Batch</option>
                                <option value="Evening">Evening Batch</option>
                            </select>

                            <select
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={filterOverdue}
                                onChange={(e) => setFilterOverdue(e.target.value)}
                            >
                                <option value="">All Overdue</option>
                                <option value="7">7+ days</option>
                                <option value="30">30+ days</option>
                                <option value="60">60+ days</option>
                            </select>

                            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option value="">Sort by: Overdue Days</option>
                                <option value="balance">Balance Amount</option>
                                <option value="name">Student Name</option>
                                <option value="lastPayment">Last Payment</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* Dues Table */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>All Dues ({duesData.length})</CardTitle>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedStudents.length === duesData.length}
                                    onChange={toggleAll}
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <span className="text-sm text-gray-600">Select All</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                                            <input
                                                type="checkbox"
                                                checked={selectedStudents.length === duesData.length}
                                                onChange={toggleAll}
                                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                            />
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Student</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Mobile</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Course</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Total Fee</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Paid</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Balance</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Last Payment</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Overdue</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {duesData.map((due) => (
                                        <tr
                                            key={due.id}
                                            className={`border-b border-gray-100 hover:bg-gray-50 ${due.daysOverdue > 30 ? 'bg-red-50' : due.daysOverdue > 7 ? 'bg-orange-50' : ''
                                                }`}
                                        >
                                            <td className="py-3 px-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStudents.includes(due.id)}
                                                    onChange={() => toggleStudent(due.id)}
                                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                />
                                            </td>
                                            <td className="py-3 px-4">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{due.student}</p>
                                                    <p className="text-xs text-gray-500">{due.batch} Batch</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-900">{due.mobile}</td>
                                            <td className="py-3 px-4 text-sm text-gray-900">{due.course}</td>
                                            <td className="py-3 px-4 text-sm text-gray-900">{formatCurrency(due.totalFee)}</td>
                                            <td className="py-3 px-4 text-sm text-green-600">{formatCurrency(due.paid)}</td>
                                            <td className="py-3 px-4 text-sm font-bold text-red-600">
                                                {formatCurrency(due.balance)}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-600">{formatDate(due.lastPayment)}</td>
                                            <td className="py-3 px-4">{getOverdueBadge(due.daysOverdue)}</td>
                                            <td className="py-3 px-4">
                                                <Button variant="outline" size="sm">
                                                    <Send className="w-3 h-3 mr-1" />
                                                    Remind
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                                <span className="font-medium">125</span> results
                            </p>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm" disabled>
                                    Previous
                                </Button>
                                <Button variant="primary" size="sm">1</Button>
                                <Button variant="outline" size="sm">2</Button>
                                <Button variant="outline" size="sm">3</Button>
                                <Button variant="outline" size="sm">
                                    Next
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Reminder Preview Modal (would be a separate component) */}
                {selectedStudents.length > 0 && (
                    <Card className="border-2 border-indigo-500">
                        <CardHeader>
                            <CardTitle>Reminder Message Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-900 whitespace-pre-line">
                                    Dear [Student Name],{'\n\n'}
                                    This is a friendly reminder that your fee payment of ₹[Amount] for [Course] is overdue by [Days] days.{'\n\n'}
                                    Please make the payment at your earliest convenience.{'\n\n'}
                                    Thank you,{'\n'}
                                    SBCI Computer Institute
                                </p>
                            </div>
                            <div className="mt-4 flex items-center justify-end space-x-3">
                                <Button variant="outline" onClick={() => setSelectedStudents([])}>
                                    Cancel
                                </Button>
                                <Button variant="primary">
                                    <Send className="w-4 h-4 mr-2" />
                                    Send to {selectedStudents.length} Student(s)
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    )
}
