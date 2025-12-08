'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
    Building2,
    CreditCard,
    Receipt,
    Percent,
    Clock,
    Save,
    Plus,
    Trash2,
    Edit
} from 'lucide-react'

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('institute')
    const [lateFeeRules, setLateFeeRules] = useState([
        { id: 1, name: 'Per Day Late Fee', type: 'PER_DAY', amount: 10 },
        { id: 2, name: 'Weekly Late Fee', type: 'PER_WEEK', amount: 50 },
        { id: 3, name: 'Fixed Late Fee', type: 'FIXED', amount: 100 },
    ])

    const tabs = [
        { id: 'institute', name: 'Institute Info', icon: Building2 },
        { id: 'bank', name: 'Bank Details', icon: CreditCard },
        { id: 'receipt', name: 'Receipt Settings', icon: Receipt },
        { id: 'gst', name: 'GST Settings', icon: Percent },
        { id: 'latefee', name: 'Late Fee Rules', icon: Clock },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage institute settings and configurations</p>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 overflow-x-auto">
                        {tabs.map((tab) => {
                            const Icon = tab.icon
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === tab.id
                                        ? 'border-indigo-600 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{tab.name}</span>
                                </button>
                            )
                        })}
                    </nav>
                </div>

                {/* Institute Information */}
                {activeTab === 'institute' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Institute Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Input
                                    label="Institute Name"
                                    defaultValue="SBCI Computer Institute"
                                    required
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Phone Number"
                                        type="tel"
                                        defaultValue="+91 9876543210"
                                        required
                                    />
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        defaultValue="admin@sbci.com"
                                        required
                                    />
                                </div>

                                <Input
                                    label="Address"
                                    defaultValue="123 Main Street"
                                    required
                                />

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Input
                                        label="City"
                                        defaultValue="Mumbai"
                                        required
                                    />
                                    <Input
                                        label="State"
                                        defaultValue="Maharashtra"
                                        required
                                    />
                                    <Input
                                        label="PIN Code"
                                        defaultValue="400001"
                                        required
                                    />
                                </div>

                                <Input
                                    label="Website"
                                    type="url"
                                    defaultValue="https://sbci.com"
                                />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Institute Logo
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Recommended size: 200x200 pixels</p>
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        variant="primary"
                                        onClick={() => {
                                            alert('Institute information saved successfully!')
                                            // TODO: Implement API call to save institute info
                                        }}
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Bank Details */}
                {activeTab === 'bank' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Bank Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Input
                                    label="Bank Name"
                                    defaultValue="State Bank of India"
                                />

                                <Input
                                    label="Account Number"
                                    defaultValue="1234567890"
                                />

                                <Input
                                    label="IFSC Code"
                                    defaultValue="SBIN0001234"
                                />

                                <Input
                                    label="Account Holder Name"
                                    defaultValue="SBCI Computer Institute"
                                />

                                <Input
                                    label="UPI ID"
                                    defaultValue="sbci@upi"
                                    helperText="For QR code generation on receipts"
                                />

                                <div className="flex justify-end">
                                    <Button
                                        variant="primary"
                                        onClick={() => {
                                            alert('Bank details saved successfully!')
                                            // TODO: Implement API call to save bank details
                                        }}
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Receipt Settings */}
                {activeTab === 'receipt' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Receipt Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Input
                                    label="Receipt Prefix"
                                    defaultValue="RCP"
                                    helperText="Prefix for receipt numbers (e.g., RCP-20250101-0001)"
                                />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Receipt Header
                                    </label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        defaultValue="Thank you for your payment"
                                        placeholder="Header text to display on receipts"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Receipt Footer
                                    </label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        defaultValue="This is a computer-generated receipt and does not require a signature."
                                        placeholder="Footer text to display on receipts"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Terms & Conditions
                                    </label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        defaultValue="1. Fees once paid are non-refundable.&#10;2. Late fee will be charged after due date.&#10;3. Students must carry their ID card."
                                        placeholder="Terms and conditions to display on receipts"
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        variant="primary"
                                        onClick={() => {
                                            alert('Receipt settings saved successfully!')
                                            // TODO: Implement API call to save receipt settings
                                        }}
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* GST Settings */}
                {activeTab === 'gst' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>GST Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Input
                                    label="GST Number"
                                    defaultValue="27AAAAA0000A1Z5"
                                    helperText="15-digit GST identification number"
                                />

                                <Input
                                    label="GST Percentage"
                                    type="number"
                                    defaultValue="18"
                                    helperText="GST percentage to apply on fees"
                                />

                                <div>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                            defaultChecked
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                            Enable GST on receipts
                                        </span>
                                    </label>
                                    <p className="text-xs text-gray-500 mt-1 ml-6">
                                        Show GST breakdown on payment receipts
                                    </p>
                                </div>

                                <div>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                            Include GST in total fee
                                        </span>
                                    </label>
                                    <p className="text-xs text-gray-500 mt-1 ml-6">
                                        Add GST amount to the course fee
                                    </p>
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        variant="primary"
                                        onClick={() => {
                                            alert('GST settings saved successfully!')
                                            // TODO: Implement API call to save GST settings
                                        }}
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Late Fee Rules */}
                {activeTab === 'latefee' && (
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Late Fee Rules</CardTitle>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => {
                                        alert('Opening form to add new late fee rule...')
                                        // TODO: Open modal/form to add new rule
                                    }}
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Rule
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {lateFeeRules.map((rule) => (
                                    <div
                                        key={rule.id}
                                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{rule.name}</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {rule.type === 'PER_DAY' && `₹${rule.amount} per day`}
                                                {rule.type === 'PER_WEEK' && `₹${rule.amount} per week`}
                                                {rule.type === 'FIXED' && `₹${rule.amount} fixed amount`}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    alert(`Editing rule: ${rule.name}`)
                                                    // TODO: Open modal/form to edit rule
                                                }}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    if (confirm(`Delete rule: ${rule.name}?`)) {
                                                        alert('Rule deleted')
                                                        // TODO: Implement delete functionality
                                                    }
                                                }}
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                                {lateFeeRules.length === 0 && (
                                    <div className="text-center py-12">
                                        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-500">No late fee rules configured</p>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Click "Add Rule" to create a new late fee rule
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    )
}
