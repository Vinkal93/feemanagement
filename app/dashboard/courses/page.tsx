'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
    Plus,
    BookOpen,
    Users,
    Calendar,
    Edit,
    Trash2
} from 'lucide-react'

export default function CoursesPage() {
    const [courses, setCourses] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showAddForm, setShowAddForm] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: '',
        duration: '',
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
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name || !formData.code || !formData.duration) {
            alert('Please fill all required fields')
            return
        }

        try {
            const response = await fetch('/api/courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    duration: parseInt(formData.duration)
                })
            })

            if (response.ok) {
                alert('Course added successfully!')
                setShowAddForm(false)
                setFormData({ name: '', code: '', description: '', duration: '', isActive: true })
                fetchCourses()
            } else {
                throw new Error('Failed to add course')
            }
        } catch (error) {
            console.error('Error adding course:', error)
            alert('Failed to add course. Please try again.')
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage all courses offered by your institute</p>
                    </div>
                    <Button variant="primary" onClick={() => setShowAddForm(!showAddForm)}>
                        <Plus className="w-4 h-4 mr-2" />
                        {showAddForm ? 'Cancel' : 'Add Course'}
                    </Button>
                </div>

                {/* Add Course Form */}
                {showAddForm && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Add New Course</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        type="text"
                                        label="Course Name *"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g., ADCA, DCA, Tally"
                                        required
                                    />
                                    <Input
                                        type="text"
                                        label="Course Code *"
                                        value={formData.code}
                                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                        placeholder="e.g., ADCA-001"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Course description..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        type="number"
                                        label="Duration (Months) *"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        placeholder="6"
                                        required
                                    />
                                    <div className="flex items-center space-x-3 pt-6">
                                        <input
                                            type="checkbox"
                                            id="courseActive"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                        <label htmlFor="courseActive" className="text-sm font-medium text-gray-700">
                                            Active Course
                                        </label>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                                    <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="primary">
                                        Add Course
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm font-medium text-gray-600">Total Courses</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{courses.length}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm font-medium text-gray-600">Active Courses</p>
                            <p className="text-3xl font-bold text-green-600 mt-2">
                                {courses.filter(c => c.isActive).length}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm font-medium text-gray-600">Total Batches</p>
                            <p className="text-3xl font-bold text-blue-600 mt-2">
                                {courses.reduce((sum, c) => sum + (c._count?.batches || 0), 0)}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm font-medium text-gray-600">Total Students</p>
                            <p className="text-3xl font-bold text-indigo-600 mt-2">
                                {courses.reduce((sum, c) => sum + (c._count?.admissions || 0), 0)}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Courses List */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500">Loading courses...</p>
                            </div>
                        ) : courses.length === 0 ? (
                            <div className="text-center py-12">
                                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-gray-500">No courses found</p>
                                <p className="text-sm text-gray-400 mt-1">Add your first course to get started</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {courses.map((course) => (
                                    <Card key={course.id} className="hover:shadow-lg transition-shadow">
                                        <CardContent className="pt-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900">{course.name}</h3>
                                                    <p className="text-sm text-gray-600 mt-1">{course.code}</p>
                                                </div>
                                                <Badge variant={course.isActive ? 'success' : 'default'}>
                                                    {course.isActive ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </div>

                                            {course.description && (
                                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                                    {course.description}
                                                </p>
                                            )}

                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    {course.duration} months
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Users className="w-4 h-4 mr-2" />
                                                    {course._count?.admissions || 0} students
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <BookOpen className="w-4 h-4 mr-2" />
                                                    {course._count?.batches || 0} batches
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <Button variant="outline" size="sm" className="flex-1">
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Trash2 className="w-4 h-4 text-red-600" />
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
