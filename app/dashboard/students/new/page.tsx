'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const steps = [
    { id: 1, name: 'Personal Details' },
    { id: 2, name: 'Course & Batch' },
    { id: 3, name: 'Fee Plan' },
    { id: 4, name: 'Confirmation' },
]

export default function NewAdmissionPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        // Personal Details
        name: '',
        fatherName: '',
        mobile: '',
        alternateMobile: '',
        email: '',
        address: '',
        city: '',
        state: 'India',
        pincode: '',
        dob: '',
        gender: '',
        aadharNumber: '',
        photo: null,

        // Course & Batch
        course: '',
        batch: '',
        admissionDate: new Date().toISOString().split('T')[0],

        // Fee Plan
        feeStructure: '',
        registrationFee: 0,
        firstPayment: 0,
        paymentMode: 'Cash',
    })

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleSubmit = async () => {
        // Validation
        if (!formData.name || !formData.mobile || !formData.course || !formData.batch) {
            alert('Please fill all required fields')
            return
        }

        try {
            console.log('Form submitted:', formData)
            // TODO: Replace with actual API call
            // const response = await fetch('/api/admissions', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // })

            alert('Admission successful! Student has been registered.')

            // Redirect to students page
            router.push('/dashboard/students')
        } catch (error) {
            console.error('Error submitting admission:', error)
            alert('Failed to submit admission. Please try again.')
        }
    }

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Page Header */}
                <div className="flex items-center space-x-4">
                    <Link href="/dashboard/students">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">New Admission</h1>
                        <p className="text-sm text-gray-500 mt-1">Complete the form to admit a new student</p>
                    </div>
                </div>

                {/* Progress Steps */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            {steps.map((step, index) => (
                                <div key={step.id} className="flex items-center flex-1">
                                    <div className="flex flex-col items-center flex-1">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${currentStep > step.id
                                                ? 'bg-green-600 text-white'
                                                : currentStep === step.id
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-gray-200 text-gray-600'
                                                }`}
                                        >
                                            {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                                        </div>
                                        <p
                                            className={`text-xs mt-2 font-medium ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                                                }`}
                                        >
                                            {step.name}
                                        </p>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div
                                            className={`h-1 flex-1 mx-2 rounded ${currentStep > step.id ? 'bg-green-600' : 'bg-gray-200'
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Form Content */}
                <Card>
                    <CardHeader>
                        <CardTitle>{steps[currentStep - 1].name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Step 1: Personal Details */}
                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Student Name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <Input
                                        label="Father's Name"
                                        required
                                        value={formData.fatherName}
                                        onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Mobile Number"
                                        type="tel"
                                        required
                                        value={formData.mobile}
                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                        helperText="10 digit mobile number"
                                    />
                                    <Input
                                        label="Alternate Mobile"
                                        type="tel"
                                        value={formData.alternateMobile}
                                        onChange={(e) => setFormData({ ...formData, alternateMobile: e.target.value })}
                                    />
                                </div>

                                <Input
                                    label="Email Address"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />

                                <Input
                                    label="Address"
                                    required
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Input
                                        label="City"
                                        required
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    />
                                    <Input
                                        label="State"
                                        required
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                    />
                                    <Input
                                        label="PIN Code"
                                        required
                                        value={formData.pincode}
                                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Date of Birth"
                                        type="date"
                                        value={formData.dob}
                                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                    />
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Gender
                                        </label>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            value={formData.gender}
                                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <Input
                                    label="Aadhar Number"
                                    value={formData.aadharNumber}
                                    onChange={(e) => setFormData({ ...formData, aadharNumber: e.target.value })}
                                    helperText="Optional - 12 digit Aadhar number"
                                />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Student Photo
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Course & Batch */}
                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Select Course <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={formData.course}
                                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                    >
                                        <option value="">Choose a course</option>
                                        <option value="ADCA">ADCA - Advanced Diploma in Computer Applications</option>
                                        <option value="CCC">CCC - Course on Computer Concepts</option>
                                        <option value="Tally">Tally with GST</option>
                                        <option value="DCA">DCA - Diploma in Computer Applications</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Select Batch <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={formData.batch}
                                        onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                                    >
                                        <option value="">Choose a batch</option>
                                        <option value="morning">Morning Batch (9:00 AM - 11:00 AM)</option>
                                        <option value="afternoon">Afternoon Batch (2:00 PM - 4:00 PM)</option>
                                        <option value="evening">Evening Batch (6:00 PM - 8:00 PM)</option>
                                    </select>
                                </div>

                                <Input
                                    label="Admission Date"
                                    type="date"
                                    required
                                    value={formData.admissionDate}
                                    onChange={(e) => setFormData({ ...formData, admissionDate: e.target.value })}
                                />
                            </div>
                        )}

                        {/* Step 3: Fee Plan */}
                        {currentStep === 3 && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Fee Structure <span className="text-red-500">*</span>
                                    </label>
                                    <div className="space-y-3">
                                        <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                                            <input
                                                type="radio"
                                                name="feeStructure"
                                                value="lump-sum"
                                                className="mt-1 mr-3"
                                                onChange={(e) => setFormData({ ...formData, feeStructure: e.target.value })}
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">Lump Sum Payment</p>
                                                <p className="text-sm text-gray-600 mt-1">Pay full amount at once - ₹12,000</p>
                                            </div>
                                        </label>

                                        <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                                            <input
                                                type="radio"
                                                name="feeStructure"
                                                value="6-months"
                                                className="mt-1 mr-3"
                                                onChange={(e) => setFormData({ ...formData, feeStructure: e.target.value })}
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">6 Monthly Installments</p>
                                                <p className="text-sm text-gray-600 mt-1">₹2,000 per month for 6 months</p>
                                            </div>
                                        </label>

                                        <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                                            <input
                                                type="radio"
                                                name="feeStructure"
                                                value="3-months"
                                                className="mt-1 mr-3"
                                                onChange={(e) => setFormData({ ...formData, feeStructure: e.target.value })}
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">3 Monthly Installments</p>
                                                <p className="text-sm text-gray-600 mt-1">₹4,000 per month for 3 months</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Registration Fee:</span>
                                        <span className="font-medium text-gray-900">₹500</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Course Fee:</span>
                                        <span className="font-medium text-gray-900">₹12,000</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-2 flex justify-between">
                                        <span className="font-medium text-gray-900">Total Fee:</span>
                                        <span className="font-bold text-lg text-gray-900">₹12,500</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="First Payment Amount"
                                        type="number"
                                        required
                                        value={formData.firstPayment}
                                        onChange={(e) => setFormData({ ...formData, firstPayment: Number(e.target.value) })}
                                        helperText="Minimum: Registration Fee + 1st Installment"
                                    />
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Payment Mode <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            value={formData.paymentMode}
                                            onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                                        >
                                            <option value="Cash">Cash</option>
                                            <option value="UPI">UPI</option>
                                            <option value="Card">Card</option>
                                            <option value="Bank Transfer">Bank Transfer</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Confirmation */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Check className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Review Admission Details</h3>
                                    <p className="text-sm text-gray-600">Please review all information before submitting</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Name:</span>
                                                <span className="font-medium text-gray-900">{formData.name || '-'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Father's Name:</span>
                                                <span className="font-medium text-gray-900">{formData.fatherName || '-'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Mobile:</span>
                                                <span className="font-medium text-gray-900">{formData.mobile || '-'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">City:</span>
                                                <span className="font-medium text-gray-900">{formData.city || '-'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-3">Course Details</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Course:</span>
                                                <span className="font-medium text-gray-900">{formData.course || '-'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Batch:</span>
                                                <span className="font-medium text-gray-900">{formData.batch || '-'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Fee Plan:</span>
                                                <span className="font-medium text-gray-900">{formData.feeStructure || '-'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">First Payment:</span>
                                                <span className="font-medium text-gray-900">₹{formData.firstPayment || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between">
                    <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentStep === 1}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                    </Button>

                    {currentStep < steps.length ? (
                        <Button variant="primary" onClick={handleNext}>
                            Next
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button variant="success" onClick={handleSubmit}>
                            <Check className="w-4 h-4 mr-2" />
                            Submit Admission
                        </Button>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}
