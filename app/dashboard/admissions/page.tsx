'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdmissionsPage() {
    const router = useRouter()

    useEffect(() => {
        // Redirect to new admission page
        router.push('/dashboard/students/new')
    }, [router])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-500">Redirecting to new admission...</p>
        </div>
    )
}
