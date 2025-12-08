'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewBatchPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [courses, setCourses] = useState<any[]>([])
    const [formData, setFormData] = useState({
        courseId: '',
        name: '',
        timing: '',
        facultyName: '',
        maxStudents: '30',
        startDate: '',
        endDate: '',
        isActive: true
    })

    useEffect(() => {
        fetchCourses()
    }, [])

    const fetchCourses = async () => {
        try {
            const response = await fetch('/api/courses')
            const data = await response.json()
            setCourses(data.courses || [])
        } catch (error) {
            console.error('Error fetching courses:', error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.courseId || !formData.name || !formData.timing || !formData.startDate) {
            alert('Please fill all required fields')
            return
        }

        setLoading(true)
        try {
            const response = await fetch('/api/batches', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    maxStudents: parseInt(formData.maxStudents)
                })
            })

            if (response.ok) {
                alert('Batch created successfully!')
                router.push('/dashboard/batches')
            } else {
                throw new Error('Failed to create batch')
            }
        } catch (error) {
            console.error('Error creating batch:', error)
            alert('Failed to create batch. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <DashboardLayout>
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <Link href="/dashboard/batches">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Create New Batch</h1>
                        <p className="text-sm text-gray-500 mt-1">Add a new batch for students</p>
                    </div>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Batch Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Course Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Course *
                                </label>
                                <select
                                    value={formData.courseId}
                                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">-- Select Course --</option>
                                    {courses.map((course) => (
                                        <option key={course.id} value={course.id}>
                                            {course.name} ({course.code})
                                        </option>
                                    ))}
                                </select>
                                <p className="text-xs text-gray-500 mt-1">
                                    Don't see your course? <Link href="/dashboard/courses" className="text-indigo-600 hover:underline">Add a new course</Link>
                                </p>
                            </div>

                            {/* Batch Name */}
                            <Input
                                type="text"
                                label="Batch Name *"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g., Morning Batch, Evening Batch"
                                required
                            />

                            {/* Timing */}
                            <Input
                                type="text"
                                label="Timing *"
                                value={formData.timing}
                                onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                                placeholder="e.g., 9:00 AM - 11:00 AM"
                                required
                            />

                            {/* Faculty Name */}
                            <Input
                                type="text"
                                label="Faculty Name"
                                value={formData.facultyName}
                                onChange={(e) => setFormData({ ...formData, facultyName: e.target.value })}
                                placeholder="Enter faculty name"
                            />

                            {/* Max Students */}
                            <Input
                                type="number"
                                label="Maximum Students *"
                                value={formData.maxStudents}
                                onChange={(e) => setFormData({ ...formData, maxStudents: e.target.value })}
                                placeholder="30"
                                required
                            />

                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    type="date"
                                    label="Start Date *"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    required
                                />
                                <Input
                                    type="date"
                                    label="End Date (Optional)"
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                />
                            </div>

                            {/* Active Status */}
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                                    Active Batch
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                                <Link href="/dashboard/batches">
                                    <Button type="button" variant="outline" disabled={loading}>
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" variant="primary" disabled={loading}>
                                    {loading ? 'Creating...' : 'Create Batch'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
