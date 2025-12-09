'use client'

import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'

export function UserMenu() {
    const { data: session } = useSession()
    const router = useRouter()

    if (!session) return null

    const handleLogout = async () => {
        await signOut({ redirect: false })
        router.push('/login')
    }

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4" />
                <div>
                    <p className="font-medium">{session.user?.name}</p>
                    <p className="text-xs text-gray-500">{session.user?.role}</p>
                </div>
            </div>
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
            >
                <LogOut className="w-4 h-4" />
                Logout
            </button>
        </div>
    )
}
