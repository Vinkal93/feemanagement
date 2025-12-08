'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
    ArrowLeft,
    Users,
    DollarSign,
    TrendingUp,
    AlertCircle,
    Download,
    Eye,
    Calendar,
    Clock
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

export default function BatchDetailPage() {
    const params = useParams()
    const [batch, setBatch] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (params.id) {
            fetchBatchDetails()
        }
    }, [params.id])

    const fetchBatchDetails = async () => {
        try {
            const response = await fetch(`/api/batches/${params.id}`)
            const data = await response.json()
            setBatch(data)
        } catch (error) {
            console.error('Error fetching batch details:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-gray-500">Loading batch details...</p>
                </div>
            </DashboardLayout>
        )
    }

    if (!batch) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-gray-500">Batch not found</p>
                </div>
            </DashboardLayout>
        )
    }

    const stats = batch.statistics || {}

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/dashboard/batches">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{batch.name}</h1>
                            <p className="text-sm text-gray-500 mt-1">{batch.course?.name}</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                    </Button>
                </div>

                {/* Batch Info Card */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Timing</p>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                    <p className="font-medium text-gray-900">{batch.timing}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Start Date</p>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                    <p className="font-medium text-gray-900">
                                        {new Date(batch.startDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Faculty</p>
                                <p className="font-medium text-gray-900">{batch.facultyName || 'Not assigned'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Status</p>
                                <Badge variant={batch.isActive ? 'success' : 'default'}>
                                    {batch.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalStudents || 0}</p>
                                    <p className="text-xs text-gray-500 mt-1">Max: {batch.maxStudents}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Fee</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">
                                        {formatCurrency(stats.totalFee || 0)}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-indigo-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Collected</p>
                                    <p className="text-3xl font-bold text-green-600 mt-2">
                                        {formatCurrency(stats.totalCollected || 0)}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {stats.collectionRate?.toFixed(1) || 0}% collected
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Outstanding</p>
                                    <p className="text-3xl font-bold text-orange-600 mt-2">
                                        {formatCurrency(stats.totalOutstanding || 0)}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <AlertCircle className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Students List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Students in this Batch</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!batch.admissions || batch.admissions.length === 0 ? (
                            <div className="text-center py-12">
                                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-gray-500">No students in this batch yet</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Student Name</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Mobile</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Admission No.</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Total Fee</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Paid</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Balance</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {batch.admissions.map((admission: any) => {
                                            const totalPaid = admission.payments?.reduce((sum: number, p: any) => sum + p.totalAmount, 0) || 0
                                            const balance = admission.totalFee - totalPaid

                                            return (
                                                <tr key={admission.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                    <td className="py-3 px-4 text-sm text-gray-900">{admission.student?.name}</td>
                                                    <td className="py-3 px-4 text-sm text-gray-600">{admission.student?.mobile}</td>
                                                    <td className="py-3 px-4 text-sm text-gray-600">{admission.admissionNumber}</td>
                                                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                                                        {formatCurrency(admission.totalFee)}
                                                    </td>
                                                    <td className="py-3 px-4 text-sm text-green-600">
                                                        {formatCurrency(totalPaid)}
                                                    </td>
                                                    <td className="py-3 px-4 text-sm font-medium">
                                                        <span className={balance > 0 ? 'text-red-600' : 'text-green-600'}>
                                                            {formatCurrency(balance)}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <Badge variant={
                                                            admission.status === 'ACTIVE' ? 'success' :
                                                                admission.status === 'COMPLETED' ? 'info' : 'danger'
                                                        }>
                                                            {admission.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <Link href={`/dashboard/students/${admission.student?.id}`}>
                                                            <button className="p-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded">
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
