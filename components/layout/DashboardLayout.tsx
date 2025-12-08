'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    DollarSign,
    AlertCircle,
    FileText,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronLeft,
    ChevronRight
} from 'lucide-react'
import { useState } from 'react'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Students', href: '/dashboard/students', icon: Users },
    { name: 'Admissions', href: '/dashboard/admissions', icon: GraduationCap },
    { name: 'Fee Collection', href: '/dashboard/fee-collection', icon: DollarSign },
    { name: 'Dues', href: '/dashboard/dues', icon: AlertCircle },
    { name: 'Reports', href: '/dashboard/reports', icon: FileText },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transform transition-all duration-300 ease-in-out lg:translate-x-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full",
                    sidebarCollapsed ? "w-16" : "w-64"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-5 h-5 text-white" />
                            </div>
                            {!sidebarCollapsed && (
                                <span className="text-lg font-bold text-gray-900">SBCI FMS</span>
                            )}
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-indigo-50 text-indigo-600"
                                            : "text-gray-700 hover:bg-gray-100",
                                        sidebarCollapsed && "justify-center"
                                    )}
                                    onClick={() => setSidebarOpen(false)}
                                    title={sidebarCollapsed ? item.name : ''}
                                >
                                    <item.icon className="w-5 h-5 flex-shrink-0" />
                                    {!sidebarCollapsed && <span>{item.name}</span>}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* User section */}
                    <div className="border-t border-gray-200">
                        <div className={cn(
                            "flex items-center space-x-3 px-3 py-2 m-4",
                            sidebarCollapsed && "justify-center"
                        )}>
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-medium text-indigo-600">A</span>
                            </div>
                            {!sidebarCollapsed && (
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
                                    <p className="text-xs text-gray-500 truncate">admin@sbci.com</p>
                                </div>
                            )}
                        </div>
                        <button
                            className={cn(
                                "flex items-center space-x-3 px-3 py-2 mx-4 mb-4 w-auto rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors",
                                sidebarCollapsed ? "justify-center w-10" : "w-full"
                            )}
                            title={sidebarCollapsed ? "Logout" : ""}
                            onClick={() => {
                                if (confirm('Are you sure you want to logout?')) {
                                    // TODO: Clear session/auth token
                                    alert('Logging out...')
                                    window.location.href = '/'
                                }
                            }}
                        >
                            <LogOut className="w-5 h-5 flex-shrink-0" />
                            {!sidebarCollapsed && <span>Logout</span>}
                        </button>

                        {/* Collapse Toggle Button */}
                        <div className="flex justify-center pb-4 hidden lg:flex">
                            <button
                                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
                                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                            >
                                {sidebarCollapsed ? (
                                    <ChevronRight className="w-5 h-5" />
                                ) : (
                                    <ChevronLeft className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className={cn(
                "transition-all duration-300",
                sidebarCollapsed ? "lg:pl-16" : "lg:pl-64"
            )}>
                {/* Top navbar */}
                <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-500 hover:text-gray-700"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <div className="flex-1 flex items-center justify-between lg:justify-end">
                            <div className="flex-1 max-w-lg lg:max-w-xs">
                                <input
                                    type="search"
                                    placeholder="Search students, receipts..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="ml-4 flex items-center space-x-4">
                                <button className="relative p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                                    <AlertCircle className="w-5 h-5" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
