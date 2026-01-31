"use client";

import { cn } from "@/lib/utils";

interface FooterLinkGroup {
    title: string;
    links: { label: string; href: string }[];
}

interface FooterProps {
    brandName?: string;
    brandDescription?: string;
    linkGroups: FooterLinkGroup[];
    copyrightText: string;
    className?: string;
}

export default function Footer({
    brandName = "Sales & Marketing",
    brandDescription = "A professional learning platform focused on practical sales, marketing, and ethical growth.",
    linkGroups,
    copyrightText,
    className = "",
}: FooterProps) {
    return (
        <footer
            className={cn(
                "w-full bg-[#f9fafb] border-t border-[#e5e7eb]",
                className
            )}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Top Section */}
                <div className="py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
                        {/* Brand Block */}
                        <div className="lg:col-span-5">
                            <div className="flex items-center gap-2 mb-4">
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
                                    {brandName}
                                </span>
                            </div>
                            <p className="text-sm text-[#6b7280] leading-relaxed max-w-sm">
                                {brandDescription}
                            </p>
                        </div>

                        {/* Link Groups */}
                        <div className="lg:col-span-7">
                            <div className="grid grid-cols-2 gap-8">
                                {linkGroups.map((group, index) => (
                                    <div key={index}>
                                        <h4 className="text-sm font-semibold text-[#1f2937] mb-4">
                                            {group.title}
                                        </h4>
                                        <ul className="space-y-3">
                                            {group.links.map((link, linkIndex) => (
                                                <li key={linkIndex}>
                                                    <a
                                                        href={link.href}
                                                        className="text-sm text-[#6b7280] hover:text-[#059669] transition-colors"
                                                    >
                                                        {link.label}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="py-6 border-t border-[#e5e7eb]">
                    <p className="text-sm text-[#9ca3af] text-center">
                        {copyrightText}
                    </p>
                </div>
            </div>
        </footer>
    );
}
