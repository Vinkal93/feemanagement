'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
    Users,
    Calendar,
    Clock,
    GraduationCap,
    Plus,
    Eye,
    Edit,
    Trash2,
    Download
} from 'lucide-react'
import Link from 'next/link'

export default function BatchesPage() {
    const [batches, setBatches] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [courseFilter, setCourseFilter] = useState('')

    useEffect(() => {
        fetchBatches()
    }, [courseFilter])

    const fetchBatches = async () => {
        try {
            const params = new URLSearchParams()
            if (courseFilter) params.append('course', courseFilter)

            const response = await fetch(`/api/batches?${params}`)
            const data = await response.json()
            setBatches(data.batches || [])
        } catch (error) {
            console.error('Error fetching batches:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Batch Management</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage all batches and view batch-wise statistics</p>
                    </div>
                    <Link href="/dashboard/batches/new">
                        <Button variant="primary">
                            <Plus className="w-4 h-4 mr-2" />
                            New Batch
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm font-medium text-gray-600">Total Batches</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{batches.length}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm font-medium text-gray-600">Active Batches</p>
                            <p className="text-3xl font-bold text-green-600 mt-2">
                                {batches.filter(b => b.isActive).length}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm font-medium text-gray-600">Total Students</p>
                            <p className="text-3xl font-bold text-blue-600 mt-2">
                                {batches.reduce((sum, b) => sum + (b._count?.admissions || 0), 0)}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm font-medium text-gray-600">Avg Students/Batch</p>
                            <p className="text-3xl font-bold text-indigo-600 mt-2">
                                {batches.length > 0
                                    ? Math.round(batches.reduce((sum, b) => sum + (b._count?.admissions || 0), 0) / batches.length)
                                    : 0
                                }
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Batches List */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>All Batches</CardTitle>
                            <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500">Loading batches...</p>
                            </div>
                        ) : batches.length === 0 ? (
                            <div className="text-center py-12">
                                <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-gray-500">No batches found</p>
                                <p className="text-sm text-gray-400 mt-1">Create your first batch to get started</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {batches.map((batch) => (
                                    <Card key={batch.id} className="hover:shadow-lg transition-shadow">
                                        <CardContent className="pt-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900">{batch.name}</h3>
                                                    <p className="text-sm text-gray-600 mt-1">{batch.course?.name}</p>
                                                </div>
                                                <Badge variant={batch.isActive ? 'success' : 'default'}>
                                                    {batch.isActive ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </div>

                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Clock className="w-4 h-4 mr-2" />
                                                    {batch.timing}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Users className="w-4 h-4 mr-2" />
                                                    {batch._count?.admissions || 0} / {batch.maxStudents} students
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    {new Date(batch.startDate).toLocaleDateString()}
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <Link href={`/dashboard/batches/${batch.id}`} className="flex-1">
                                                    <Button variant="outline" size="sm" className="w-full">
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        View Details
                                                    </Button>
                                                </Link>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
