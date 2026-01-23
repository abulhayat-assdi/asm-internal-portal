"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "🏠" },
    { href: "/dashboard/teachers", label: "Teacher Directory", icon: "👥" },
    { href: "/dashboard/schedule", label: "Class Schedule", icon: "📅" },
    { href: "/dashboard/resources", label: "Resource Library", icon: "📚" },
    { href: "/dashboard/policies", label: "Policy & Minutes", icon: "📋" },
    { href: "/dashboard/feedback", label: "Feedback", icon: "💬" },
    { href: "/dashboard/admin", label: "Admin Panel", icon: "⚙️" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                <div className="p-6 border-b border-[#e5e7eb]">
                    <h1 className="text-xl font-bold text-[#059669]">ASM Portal</h1>
                    <p className="text-xs text-[#6b7280] mt-1">Internal Dashboard</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
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
                    <button className="flex items-center gap-2 w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                        <span>🚪</span>
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
