'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
    Users,
    DollarSign,
    TrendingUp,
    AlertCircle,
    AlertTriangle,
    UserPlus,
    ArrowUp,
    ArrowDown,
    Eye,
    Send
} from 'lucide-react'
import { formatCurrency, formatDate, formatDateTime } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'

// Sample data - will be replaced with real API data
const monthlyCollectionData = [
    { month: 'Jan', collection: 80000, admissions: 15 },
    { month: 'Feb', collection: 95000, admissions: 18 },
    { month: 'Mar', collection: 110000, admissions: 23 },
    { month: 'Apr', collection: 88000, admissions: 12 },
    { month: 'May', collection: 125000, admissions: 28 },
    { month: 'Jun', collection: 105000, admissions: 20 },
]

const courseRevenueData = [
    { name: 'ADCA', value: 450000, percentage: 40 },
    { name: 'CCC', value: 280000, percentage: 25 },
    { name: 'Tally', value: 225000, percentage: 20 },
    { name: 'Others', value: 170000, percentage: 15 },
]

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444']

const todayCollections = [
    { time: '09:30 AM', student: 'Rahul Kumar', course: 'ADCA', amount: 2000, mode: 'UPI', collector: 'Cashier 1' },
    { time: '10:15 AM', student: 'Priya Sharma', course: 'CCC', amount: 1500, mode: 'Cash', collector: 'Cashier 1' },
    { time: '11:00 AM', student: 'Amit Singh', course: 'Tally', amount: 3000, mode: 'Card', collector: 'Cashier 2' },
    { time: '02:30 PM', student: 'Neha Verma', course: 'ADCA', amount: 2000, mode: 'UPI', collector: 'Cashier 1' },
    { time: '04:00 PM', student: 'Vikash Yadav', course: 'CCC', amount: 1500, mode: 'Cash', collector: 'Cashier 2' },
]

const upcomingDues = [
    { dueDate: '2025-12-10', student: 'Rohit Gupta', course: 'ADCA', amount: 2000, mobile: '9876543210' },
    { dueDate: '2025-12-11', student: 'Anjali Mishra', course: 'Tally', amount: 3000, mobile: '9876543211' },
    { dueDate: '2025-12-12', student: 'Suresh Kumar', course: 'CCC', amount: 1500, mobile: '9876543212' },
    { dueDate: '2025-12-13', student: 'Pooja Singh', course: 'ADCA', amount: 2000, mobile: '9876543213' },
    { dueDate: '2025-12-14', student: 'Manish Tiwari', course: 'Tally', amount: 3000, mobile: '9876543214' },
]

const topDefaulters = [
    { student: 'Rajesh Verma', course: 'ADCA', pending: 12000, daysOverdue: 45 },
    { student: 'Sunita Devi', course: 'Tally', pending: 9000, daysOverdue: 30 },
    { student: 'Anil Kumar', course: 'CCC', pending: 7500, daysOverdue: 25 },
    { student: 'Geeta Sharma', course: 'ADCA', pending: 6000, daysOverdue: 20 },
    { student: 'Ramesh Yadav', course: 'Tally', pending: 4500, daysOverdue: 15 },
]

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>This Month</option>
                            <option>This Week</option>
                            <option>Today</option>
                            <option>Custom Range</option>
                        </select>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Total Active Students */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Active Students</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">248</p>
                                    <div className="flex items-center mt-2">
                                        <Badge variant="success" className="flex items-center">
                                            <ArrowUp className="w-3 h-3 mr-1" />
                                            12 this month
                                        </Badge>
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Today's Collection */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Today's Collection</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(18500)}</p>
                                    <p className="text-xs text-gray-500 mt-2">Last Monday: {formatCurrency(16200)}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* This Month Collection */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">This Month Collection</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(125000)}</p>
                                    <div className="mt-2">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-500">Target: {formatCurrency(150000)}</span>
                                            <span className="font-medium text-green-600">83%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '83%' }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Total Outstanding */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Outstanding</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(280000)}</p>
                                    <p className="text-xs text-gray-500 mt-2">125 students pending</p>
                                </div>
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <AlertCircle className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Overdue Installments */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Overdue Installments</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(95000)}</p>
                                    <p className="text-xs text-gray-500 mt-2">45 students</p>
                                </div>
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                    <AlertTriangle className="w-6 h-6 text-red-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* New Admissions */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">New Admissions</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">23</p>
                                    <p className="text-xs text-gray-500 mt-2">This month</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <UserPlus className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Monthly Collection Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Collection Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={monthlyCollectionData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                                    <Legend />
                                    <Bar dataKey="collection" fill="#4F46E5" name="Collection" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Course-wise Revenue */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Course-wise Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={courseRevenueData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percentage }) => `${name} (${percentage}%)`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {courseRevenueData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Data Tables */}
                <div className="grid grid-cols-1 gap-6">
                    {/* Today's Fee Collection */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Today's Fee Collection</CardTitle>
                                <Link href="/dashboard/fee-collection">
                                    <Button variant="outline" size="sm">View All</Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Time</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Student</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Course</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Mode</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Collected By</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {todayCollections.map((item, index) => (
                                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="py-3 px-4 text-sm text-gray-900">{item.time}</td>
                                                <td className="py-3 px-4 text-sm text-gray-900">{item.student}</td>
                                                <td className="py-3 px-4 text-sm text-gray-600">{item.course}</td>
                                                <td className="py-3 px-4 text-sm font-medium text-gray-900">{formatCurrency(item.amount)}</td>
                                                <td className="py-3 px-4">
                                                    <Badge variant={item.mode === 'Cash' ? 'warning' : 'success'}>{item.mode}</Badge>
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-600">{item.collector}</td>
                                                <td className="py-3 px-4">
                                                    <button className="text-indigo-600 hover:text-indigo-800">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upcoming Dues */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Upcoming Dues (Next 7 Days)</CardTitle>
                                <Link href="/dashboard/dues">
                                    <Button variant="outline" size="sm">View All</Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Due Date</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Student</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Course</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Mobile</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {upcomingDues.map((item, index) => (
                                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="py-3 px-4 text-sm text-gray-900">{formatDate(item.dueDate)}</td>
                                                <td className="py-3 px-4 text-sm text-gray-900">{item.student}</td>
                                                <td className="py-3 px-4 text-sm text-gray-600">{item.course}</td>
                                                <td className="py-3 px-4 text-sm font-medium text-gray-900">{formatCurrency(item.amount)}</td>
                                                <td className="py-3 px-4 text-sm text-gray-600">{item.mobile}</td>
                                                <td className="py-3 px-4">
                                                    <button
                                                        className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm"
                                                        onClick={() => alert(`Sending reminder to ${item.student} at ${item.mobile}`)}
                                                    >
                                                        <Send className="w-4 h-4 mr-1" />
                                                        Remind
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top Defaulters */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Top Defaulters</CardTitle>
                                <Link href="/dashboard/dues">
                                    <Button variant="outline" size="sm">View All</Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Student</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Course</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Pending Amount</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Days Overdue</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topDefaulters.map((item, index) => (
                                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="py-3 px-4 text-sm text-gray-900">{item.student}</td>
                                                <td className="py-3 px-4 text-sm text-gray-600">{item.course}</td>
                                                <td className="py-3 px-4 text-sm font-medium text-red-600">{formatCurrency(item.pending)}</td>
                                                <td className="py-3 px-4">
                                                    <Badge variant={item.daysOverdue > 30 ? 'danger' : 'warning'}>
                                                        {item.daysOverdue} days
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link href="/dashboard/students/new">
                                <Button variant="primary" className="w-full">
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    New Admission
                                </Button>
                            </Link>
                            <Link href="/dashboard/fee-collection">
                                <Button variant="success" className="w-full">
                                    <DollarSign className="w-4 h-4 mr-2" />
                                    Collect Fee
                                </Button>
                            </Link>
                            <Link href="/dashboard/students">
                                <Button variant="outline" className="w-full">
                                    <Users className="w-4 h-4 mr-2" />
                                    View Students
                                </Button>
                            </Link>
                            <Link href="/dashboard/dues">
                                <Button variant="outline" className="w-full">
                                    <AlertCircle className="w-4 h-4 mr-2" />
                                    View Dues
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
