"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "🏠", adminOnly: false },
    { href: "/dashboard/teachers", label: "Teacher Directory", icon: "👥", adminOnly: false },
    { href: "/dashboard/schedule", label: "Class Schedule", icon: "📅", adminOnly: false },
    { href: "/dashboard/resources", label: "Resource Library", icon: "📚", adminOnly: false },
    { href: "/dashboard/policies", label: "Policy & Minutes", icon: "📋", adminOnly: false },
    { href: "/dashboard/feedback", label: "Feedback", icon: "💬", adminOnly: false },
    { href: "/dashboard/admin", label: "Admin Panel", icon: "⚙️", adminOnly: true },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { userProfile, logout, loading } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Debug: Log user role
    useEffect(() => {
        if (!loading && userProfile) {
            console.log("🔍 User Role:", userProfile.role);
            console.log("🔍 Is Admin:", userProfile.role === "admin");
        }
    }, [loading, userProfile]);

    // Filter nav items based on user role
    // Show all items while loading, then filter based on role
    const filteredNavItems = navItems.filter(item => {
        if (item.adminOnly) {
            // Only show admin items if user is loaded and is admin
            return !loading && userProfile?.role === "admin";
        }
        return true;
    });

    // Handle logout: clear Firebase session and redirect to login
    const handleLogout = async () => {
        try {
            await logout();
            router.push('/login');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-[#e5e7eb]"
                aria-label="Toggle menu"
            >
                <svg className="w-6 h-6 text-[#1f2937]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "w-64 bg-white border-r border-[#e5e7eb] text-[#1f2937] min-h-screen fixed left-0 top-0 flex flex-col z-40 transition-transform duration-300",
                // Mobile: slide in/out
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
                // Desktop: always visible
                "lg:translate-x-0"
            )}>
                {/* Logo/Brand */}
                <div className="p-6 border-b border-[#e5e7eb] flex items-center justify-center">
                    <Link
                        href="/dashboard"
                        className="cursor-pointer group"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <div className="bg-[#059669] rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm transition-all duration-300 ease-in-out group-hover:bg-[#d1fae5] group-hover:shadow-md group-hover:-translate-y-0.5">
                            {/* Graph/Chart Icon */}
                            <svg
                                className="w-6 h-6 text-white group-hover:text-[#059669]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                                />
                                <polyline points="22,12 18,8 13,13 9,9" />
                            </svg>

                            {/* Text */}
                            <div className="text-white font-bold text-sm leading-tight tracking-wide group-hover:text-[#1f2937]">
                                SALES &<br />MARKETING
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {filteredNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200",
                                            isActive
                                                ? "bg-[#059669] text-white font-medium rounded-full"
                                                : "text-[#6b7280] hover:bg-[#d1fae5] hover:text-[#1f2937] rounded-full"
                                        )}
                                    >
                                        <span className="text-xl">{item.icon}</span>
                                        <span className="text-sm">{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-[#e5e7eb]">
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#fee2e2] text-[#dc2626] rounded-lg hover:bg-[#fecaca] transition-all duration-200 cursor-pointer"
                    >
                        {/* Logout Arrow Icon */}
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        <span className="text-sm font-bold">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
