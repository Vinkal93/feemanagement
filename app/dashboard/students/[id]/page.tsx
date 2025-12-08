'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
    ArrowLeft,
    User,
    Phone,
    Mail,
    MapPin,
    Calendar,
    DollarSign,
    Download,
    Edit,
    CreditCard
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function StudentDetailPage() {
    const params = useParams()
    const [student, setStudent] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (params.id) {
            fetchStudentDetails()
        }
    }, [params.id])

    const fetchStudentDetails = async () => {
        try {
            const response = await fetch(`/api/students/${params.id}`)
            const data = await response.json()
            setStudent(data)
        } catch (error) {
            console.error('Error fetching student details:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-gray-500">Loading student details...</p>
                </div>
            </DashboardLayout>
        )
    }

    if (!student) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-gray-500">Student not found</p>
                </div>
            </DashboardLayout>
        )
    }

    const admission = student.admission

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/dashboard/students">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
                            <p className="text-sm text-gray-500 mt-1">
                                {admission ? `Admission No: ${admission.admissionNumber}` : 'No active admission'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Link href={`/dashboard/students/${student.id}/edit`}>
                            <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </Button>
                        </Link>
                        {admission && (
                            <Link href={`/dashboard/fee-collection?student=${student.id}`}>
                                <Button variant="success" size="sm">
                                    <DollarSign className="w-4 h-4 mr-2" />
                                    Collect Fee
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Personal Information */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                                            <User className="w-8 h-8 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{student.name}</p>
                                            <p className="text-sm text-gray-500">Father: {student.fatherName}</p>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4 space-y-3">
                                        <div className="flex items-center text-sm">
                                            <Phone className="w-4 h-4 mr-3 text-gray-400" />
                                            <span className="text-gray-900">{student.mobile}</span>
                                        </div>
                                        {student.email && (
                                            <div className="flex items-center text-sm">
                                                <Mail className="w-4 h-4 mr-3 text-gray-400" />
                                                <span className="text-gray-900">{student.email}</span>
                                            </div>
                                        )}
                                        <div className="flex items-start text-sm">
                                            <MapPin className="w-4 h-4 mr-3 text-gray-400 mt-0.5" />
                                            <span className="text-gray-900">
                                                {student.address}, {student.city}, {student.state} - {student.pincode}
                                            </span>
                                        </div>
                                        {student.dob && (
                                            <div className="flex items-center text-sm">
                                                <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                                                <span className="text-gray-900">
                                                    DOB: {formatDate(student.dob)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Course Information */}
                        {admission && (
                            <Card className="mt-6">
                                <CardHeader>
                                    <CardTitle>Course Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-600">Course</p>
                                            <p className="font-medium text-gray-900">{admission.course?.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Batch</p>
                                            <p className="font-medium text-gray-900">{admission.batch?.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Admission Date</p>
                                            <p className="font-medium text-gray-900">
                                                {formatDate(admission.admissionDate)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Status</p>
                                            <Badge variant={
                                                admission.status === 'ACTIVE' ? 'success' :
                                                    admission.status === 'COMPLETED' ? 'info' : 'danger'
                                            }>
                                                {admission.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Fee Details & Payment History */}
                    <div className="lg:col-span-2">
                        {admission && (
                            <>
                                {/* Fee Summary */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Fee Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                                <p className="text-sm text-gray-600">Total Fee</p>
                                                <p className="text-2xl font-bold text-gray-900 mt-1">
                                                    {formatCurrency(admission.totalFee)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Paid</p>
                                                <p className="text-2xl font-bold text-green-600 mt-1">
                                                    {formatCurrency(admission.totalPaid || 0)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Balance</p>
                                                <p className="text-2xl font-bold text-red-600 mt-1">
                                                    {formatCurrency(admission.balance || 0)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <div className="w-full bg-gray-200 rounded-full h-3">
                                                <div
                                                    className="bg-green-600 h-3 rounded-full"
                                                    style={{
                                                        width: `${admission.totalFee > 0 ? ((admission.totalPaid || 0) / admission.totalFee) * 100 : 0}%`
                                                    }}
                                                ></div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 text-center">
                                                {admission.totalFee > 0 ? Math.round(((admission.totalPaid || 0) / admission.totalFee) * 100) : 0}% Paid
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Installment Schedule */}
                                <Card className="mt-6">
                                    <CardHeader>
                                        <CardTitle>Installment Schedule</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {admission.installments && admission.installments.length > 0 ? (
                                            <div className="space-y-3">
                                                {admission.installments.map((inst: any) => (
                                                    <div
                                                        key={inst.id}
                                                        className={`p-4 rounded-lg border-2 ${inst.status === 'FULLY_PAID'
                                                                ? 'border-green-200 bg-green-50'
                                                                : inst.status === 'OVERDUE'
                                                                    ? 'border-red-200 bg-red-50'
                                                                    : 'border-gray-200 bg-white'
                                                            }`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <p className="font-medium text-gray-900">
                                                                    Installment {inst.installmentNumber}
                                                                </p>
                                                                <p className="text-sm text-gray-600 mt-1">
                                                                    Due: {formatDate(inst.dueDate)}
                                                                </p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="font-medium text-gray-900">
                                                                    {formatCurrency(inst.amount)}
                                                                </p>
                                                                <Badge variant={
                                                                    inst.status === 'FULLY_PAID' ? 'success' :
                                                                        inst.status === 'PARTIALLY_PAID' ? 'warning' :
                                                                            inst.status === 'OVERDUE' ? 'danger' : 'default'
                                                                }>
                                                                    {inst.status.replace('_', ' ')}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-center text-gray-500 py-6">No installments scheduled</p>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Payment History */}
                                <Card className="mt-6">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>Payment History</CardTitle>
                                            <Button variant="outline" size="sm">
                                                <Download className="w-4 h-4 mr-2" />
                                                Export
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {admission.payments && admission.payments.length > 0 ? (
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead>
                                                        <tr className="border-b border-gray-200">
                                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Mode</th>
                                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Receipt</th>
                                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Collected By</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {admission.payments.map((payment: any) => (
                                                            <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                                <td className="py-3 px-4 text-sm text-gray-900">
                                                                    {formatDate(payment.paymentDate)}
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
                                                                    {payment.receipt?.receiptNumber || '-'}
                                                                </td>
                                                                <td className="py-3 px-4 text-sm text-gray-600">
                                                                    {payment.collectedBy?.name || '-'}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <div className="text-center py-12">
                                                <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                                <p className="text-gray-500">No payments recorded yet</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
