'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
    FileText,
    Download,
    Calendar,
    TrendingUp,
    Users,
    DollarSign,
    BarChart3,
    PieChart
} from 'lucide-react'
import Link from 'next/link'

const reports = [
    {
        id: 'daily',
        title: 'Daily Collection Report',
        description: 'View daily fee collection with payment mode breakdown',
        icon: Calendar,
        color: 'bg-blue-100 text-blue-600',
        href: '/dashboard/reports/daily'
    },
    {
        id: 'monthly',
        title: 'Monthly Collection Report',
        description: 'Monthly collection trends and comparisons',
        icon: TrendingUp,
        color: 'bg-green-100 text-green-600',
        href: '/dashboard/reports/monthly'
    },
    {
        id: 'course-wise',
        title: 'Course-wise Revenue',
        description: 'Revenue analysis by course with student count',
        icon: PieChart,
        color: 'bg-purple-100 text-purple-600',
        href: '/dashboard/reports/course-wise'
    },
    {
        id: 'defaulters',
        title: 'Defaulter Report',
        description: 'Students with pending dues and overdue payments',
        icon: Users,
        color: 'bg-red-100 text-red-600',
        href: '/dashboard/reports/defaulters'
    },
    {
        id: 'user-wise',
        title: 'User-wise Collection',
        description: 'Staff performance and collection tracking',
        icon: BarChart3,
        color: 'bg-orange-100 text-orange-600',
        href: '/dashboard/reports/user-wise'
    },
    {
        id: 'admissions',
        title: 'Admission Report',
        description: 'New admissions with course-wise breakdown',
        icon: FileText,
        color: 'bg-indigo-100 text-indigo-600',
        href: '/dashboard/reports/admissions'
    },
]

export default function ReportsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                    <p className="text-sm text-gray-500 mt-1">Generate and download various reports</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Today's Collection</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-2">₹18,500</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">This Month</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-2">₹1,25,000</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">New Admissions</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-2">23</p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Users className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Reports Generated</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-2">156</p>
                                </div>
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Reports Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports.map((report) => (
                        <Card key={report.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="pt-6">
                                <div className="flex items-start space-x-4">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${report.color}`}>
                                        <report.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{report.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                                        <div className="mt-4 flex items-center space-x-2">
                                            <Link href={report.href}>
                                                <Button variant="outline" size="sm">
                                                    <FileText className="w-3 h-3 mr-1" />
                                                    View
                                                </Button>
                                            </Link>
                                            <Button variant="outline" size="sm">
                                                <Download className="w-3 h-3 mr-1" />
                                                Export
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Recent Reports */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                { name: 'Daily Collection - Dec 08, 2025', date: '2025-12-08 10:30 AM', type: 'Daily', size: '245 KB' },
                                { name: 'Monthly Collection - November 2025', date: '2025-12-01 09:15 AM', type: 'Monthly', size: '512 KB' },
                                { name: 'Defaulter Report - Q4 2025', date: '2025-11-28 02:45 PM', type: 'Defaulters', size: '189 KB' },
                                { name: 'Course-wise Revenue - November', date: '2025-11-25 11:20 AM', type: 'Course-wise', size: '324 KB' },
                            ].map((report, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{report.name}</p>
                                            <p className="text-xs text-gray-500">{report.date} • {report.size}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
