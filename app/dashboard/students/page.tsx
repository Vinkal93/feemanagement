'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
    Search,
    Filter,
    Download,
    Eye,
    Edit,
    DollarSign,
    UserPlus
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'

// Sample data
const students = [
    {
        id: '1',
        name: 'Rahul Kumar',
        mobile: '9876543210',
        course: 'ADCA',
        batch: 'Morning Batch',
        totalFee: 12000,
        paid: 8000,
        balance: 4000,
        status: 'Active',
        admissionDate: '2025-01-15'
    },
    {
        id: '2',
        name: 'Priya Sharma',
        mobile: '9876543211',
        course: 'CCC',
        batch: 'Evening Batch',
        totalFee: 6000,
        paid: 6000,
        balance: 0,
        status: 'Active',
        admissionDate: '2025-02-10'
    },
    {
        id: '3',
        name: 'Amit Singh',
        mobile: '9876543212',
        course: 'Tally',
        batch: 'Morning Batch',
        totalFee: 9000,
        paid: 3000,
        balance: 6000,
        status: 'Active',
        admissionDate: '2025-03-05'
    },
    {
        id: '4',
        name: 'Neha Verma',
        mobile: '9876543213',
        course: 'ADCA',
        batch: 'Evening Batch',
        totalFee: 12000,
        paid: 12000,
        balance: 0,
        status: 'Completed',
        admissionDate: '2024-09-01'
    },
    {
        id: '5',
        name: 'Vikash Yadav',
        mobile: '9876543214',
        course: 'CCC',
        batch: 'Morning Batch',
        totalFee: 6000,
        paid: 1500,
        balance: 4500,
        status: 'Active',
        admissionDate: '2025-04-20'
    },
]

export default function StudentsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage all student records and admissions</p>
                    </div>
                    <Link href="/dashboard/students/new">
                        <Button variant="primary">
                            <UserPlus className="w-4 h-4 mr-2" />
                            New Admission
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm font-medium text-gray-600">Total Students</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">248</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm font-medium text-gray-600">Active</p>
                            <p className="text-3xl font-bold text-green-600 mt-2">235</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm font-medium text-gray-600">Completed</p>
                            <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm font-medium text-gray-600">Dropped</p>
                            <p className="text-3xl font-bold text-red-600 mt-2">1</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search by name, mobile, or ID..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900">
                                <option value="">All Courses</option>
                                <option value="ADCA">ADCA</option>
                                <option value="CCC">CCC</option>
                                <option value="Tally">Tally</option>
                            </select>
                            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900">
                                <option value="">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Completed">Completed</option>
                                <option value="Dropped">Dropped</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* Students Table */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>All Students ({students.length})</CardTitle>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    alert('Exporting student data...')
                                    // TODO: Implement actual CSV export
                                }}
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Student Name</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Mobile</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Course</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Batch</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Total Fee</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Paid</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Balance</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student) => (
                                        <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{student.name}</p>
                                                    <p className="text-xs text-gray-500">ID: {student.id}</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-900">{student.mobile}</td>
                                            <td className="py-3 px-4 text-sm text-gray-900">{student.course}</td>
                                            <td className="py-3 px-4 text-sm text-gray-600">{student.batch}</td>
                                            <td className="py-3 px-4 text-sm font-medium text-gray-900">
                                                {formatCurrency(student.totalFee)}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-green-600">
                                                {formatCurrency(student.paid)}
                                            </td>
                                            <td className="py-3 px-4 text-sm font-medium">
                                                <span className={student.balance > 0 ? 'text-red-600' : 'text-green-600'}>
                                                    {formatCurrency(student.balance)}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <Badge
                                                    variant={
                                                        student.status === 'Active' ? 'success' :
                                                            student.status === 'Completed' ? 'info' : 'danger'
                                                    }
                                                >
                                                    {student.status}
                                                </Badge>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <Link href={`/dashboard/students/${student.id}`}>
                                                        <button className="p-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded">
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                    </Link>
                                                    <Link href={`/dashboard/students/${student.id}/edit`}>
                                                        <button className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                    </Link>
                                                    <Link href={`/dashboard/fee-collection?student=${student.id}`}>
                                                        <button className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded">
                                                            <DollarSign className="w-4 h-4" />
                                                        </button>
                                                    </Link>
                                                </div>
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
                                <span className="font-medium">248</span> results
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
            </div>
        </DashboardLayout>
    )
}
