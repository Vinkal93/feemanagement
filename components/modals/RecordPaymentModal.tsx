'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { X } from 'lucide-react'

interface RecordPaymentModalProps {
    isOpen: boolean
    onClose: () => void
    student: any
    onSuccess: () => void
}

export default function RecordPaymentModal({ isOpen, onClose, student, onSuccess }: RecordPaymentModalProps) {
    const [amount, setAmount] = useState('')
    const [paymentMode, setPaymentMode] = useState('CASH')
    const [transactionId, setTransactionId] = useState('')
    const [installmentId, setInstallmentId] = useState('')
    const [lateFee, setLateFee] = useState('0')
    const [remarks, setRemarks] = useState('')
    const [loading, setLoading] = useState(false)

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!amount || parseFloat(amount) <= 0) {
            alert('Please enter a valid amount')
            return
        }

        if (paymentMode !== 'CASH' && !transactionId) {
            alert('Please enter transaction ID for digital payments')
            return
        }

        setLoading(true)
        try {
            const response = await fetch('/api/payments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    admissionId: student.admission.id,
                    installmentId: installmentId || null,
                    amount: parseFloat(amount),
                    lateFee: parseFloat(lateFee),
                    paymentMode,
                    transactionId: transactionId || null,
                    remarks: remarks || null,
                    collectedById: 'default-user-id' // TODO: Get from session
                })
            })

            if (response.ok) {
                alert('Payment recorded successfully!')
                onSuccess()
                onClose()
                // Reset form
                setAmount('')
                setPaymentMode('CASH')
                setTransactionId('')
                setInstallmentId('')
                setLateFee('0')
                setRemarks('')
            } else {
                throw new Error('Failed to record payment')
            }
        } catch (error) {
            console.error('Error recording payment:', error)
            alert('Failed to record payment. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const totalAmount = parseFloat(amount || '0') + parseFloat(lateFee || '0')

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Record Payment</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Student: {student.name} | Admission: {student.admission?.admissionNumber}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Student Info */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-600">Course</p>
                                <p className="font-medium text-gray-900">{student.admission?.course?.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Batch</p>
                                <p className="font-medium text-gray-900">{student.admission?.batch?.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Total Fee</p>
                                <p className="font-medium text-gray-900">₹{student.admission?.totalFee?.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Balance</p>
                                <p className="font-medium text-red-600">₹{student.admission?.balance?.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Installment Selection */}
                    {student.admission?.installments && student.admission.installments.length > 0 && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Installment (Optional)
                            </label>
                            <select
                                value={installmentId}
                                onChange={(e) => {
                                    setInstallmentId(e.target.value)
                                    const inst = student.admission.installments.find((i: any) => i.id === e.target.value)
                                    if (inst) {
                                        setAmount((inst.amount - inst.paidAmount).toString())
                                    }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="">-- Select Installment --</option>
                                {student.admission.installments.map((inst: any) => (
                                    <option key={inst.id} value={inst.id}>
                                        Installment {inst.installmentNumber} - Due: {new Date(inst.dueDate).toLocaleDateString()} -
                                        Pending: ₹{(inst.amount - inst.paidAmount).toLocaleString()}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Payment Amount */}
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            type="number"
                            label="Payment Amount *"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            required
                        />
                        <Input
                            type="number"
                            label="Late Fee"
                            value={lateFee}
                            onChange={(e) => setLateFee(e.target.value)}
                            placeholder="0.00"
                        />
                    </div>

                    {/* Payment Mode */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Payment Mode *
                        </label>
                        <select
                            value={paymentMode}
                            onChange={(e) => setPaymentMode(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                        >
                            <option value="CASH">Cash</option>
                            <option value="UPI">UPI</option>
                            <option value="CARD">Card</option>
                            <option value="BANK_TRANSFER">Bank Transfer</option>
                            <option value="WALLET">Wallet</option>
                            <option value="CHEQUE">Cheque</option>
                        </select>
                    </div>

                    {/* Transaction ID */}
                    {paymentMode !== 'CASH' && (
                        <Input
                            type="text"
                            label="Transaction ID *"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="Enter transaction ID"
                            required
                        />
                    )}

                    {/* Remarks */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Remarks
                        </label>
                        <textarea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Add any notes..."
                        />
                    </div>

                    {/* Total Amount */}
                    <div className="bg-indigo-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-medium text-gray-900">Total Amount</span>
                            <span className="text-2xl font-bold text-indigo-600">
                                ₹{totalAmount.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="success"
                            disabled={loading}
                        >
                            {loading ? 'Recording...' : 'Record Payment'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
