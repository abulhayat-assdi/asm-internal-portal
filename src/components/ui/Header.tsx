"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavLink {
    label: string;
    href: string;
    isActive?: boolean;
}

interface HeaderProps {
    brandText?: string;
    navLinks: NavLink[];
    ctaText: string;
    onCtaClick?: () => void;
    onBrandClick?: () => void;
    className?: string;
}

export default function Header({
    brandText = "Sales & Marketing",
    navLinks,
    ctaText,
    onCtaClick,
    onBrandClick,
    className = "",
}: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header
            className={cn(
                "w-full bg-white border-b border-[#e5e7eb] sticky top-0 z-50",
                className
            )}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left - Brand */}
                    <button
                        onClick={onBrandClick}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        {/* Logo Icon */}
                        <div className="w-9 h-9 rounded-lg bg-[#059669] flex items-center justify-center">
                            <svg
                                className="w-5 h-5 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                            </svg>
                        </div>
                        <span className="text-lg font-semibold text-[#1f2937]">
                            {brandText}
                        </span>
                    </button>

                    {/* Desktop Navigation - Centered */}
                    <nav className="hidden lg:flex items-center justify-center flex-1 gap-1.5 mx-8">
                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className={cn(
                                    "px-3.5 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ease-out",
                                    link.isActive
                                        ? "text-[#059669] bg-[#f0fdf4] border-[#dcfce7]"
                                        : "text-[#4b5563] bg-white border-[#e5e7eb] hover:text-[#059669] hover:bg-[#f0fdf4] hover:border-[#dcfce7]"
                                )}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <button
                        onClick={onCtaClick}
                        className="hidden lg:block px-4 py-2 bg-[#059669] text-white text-sm font-semibold rounded-full
                            transition-all duration-200 ease-out
                            hover:bg-[#10b981] hover:shadow-md
                            focus:outline-none focus:ring-2 focus:ring-[#059669] focus:ring-offset-2"
                    >
                        {ctaText}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-[#6b7280] hover:text-[#1f2937] hover:bg-[#f3f4f6] rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-[#e5e7eb]">
                        <nav className="flex flex-col gap-2 mb-4">
                            {navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className={cn(
                                        "px-5 py-3 text-base font-semibold rounded-full border transition-all duration-200 ease-out",
                                        link.isActive
                                            ? "text-[#059669] bg-[#f0fdf4] border-[#dcfce7]"
                                            : "text-[#059669] bg-white border-[#e5e7eb] hover:bg-[#f0fdf4] hover:border-[#dcfce7]"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        <button
                            onClick={() => {
                                onCtaClick?.();
                                setIsMobileMenuOpen(false);
                            }}
                            className="w-full px-6 py-3.5 bg-[#059669] text-white text-base font-bold rounded-full
                                transition-all duration-200 ease-out
                                hover:bg-[#10b981]
                                focus:outline-none focus:ring-2 focus:ring-[#059669] focus:ring-offset-2"
                        >
                            {ctaText}
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
