"use client";

import { cn } from "@/lib/utils";

interface HeroSectionProps {
    badge?: string;
    heading: string;
    subheading: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    onPrimaryClick?: () => void;
    onSecondaryClick?: () => void;
    className?: string;
}

export default function HeroSection({
    badge,
    heading,
    subheading,
    primaryButtonText,
    secondaryButtonText,
    onPrimaryClick,
    onSecondaryClick,
    className = "",
}: HeroSectionProps) {
    return (
        <section
            className={cn(
                "w-full bg-white py-16 md:py-24",
                className
            )}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="flex flex-col space-y-6">
                        {/* Optional Badge */}
                        {badge && (
                            <div className="inline-flex">
                                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#f0fdf4] text-[#059669] border border-[#dcfce7]">
                                    {badge}
                                </span>
                            </div>
                        )}

                        {/* Heading */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1f2937] leading-tight">
                            {heading}
                        </h1>

                        {/* Subheading */}
                        <p className="text-base md:text-lg text-[#6b7280] leading-relaxed max-w-xl">
                            {subheading}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            <button
                                onClick={onPrimaryClick}
                                className="px-6 py-3 bg-[#059669] text-white font-semibold rounded-full 
                                    transition-all duration-200 ease-out
                                    hover:bg-[#10b981] hover:shadow-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#059669] focus:ring-offset-2"
                            >
                                {primaryButtonText}
                            </button>
                            <button
                                onClick={onSecondaryClick}
                                className="px-6 py-3 bg-white text-[#059669] font-semibold rounded-full 
                                    border-2 border-[#059669]
                                    transition-all duration-200 ease-out
                                    hover:bg-[#f0fdf4]
                                    focus:outline-none focus:ring-2 focus:ring-[#059669] focus:ring-offset-2"
                            >
                                {secondaryButtonText}
                            </button>
                        </div>
                    </div>

                    {/* Right Visual - Sales & Marketing Illustration */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-md lg:max-w-lg">
                            {/* Soft Container */}
                            <div className="bg-[#f0fdf4] rounded-3xl p-8 md:p-10 shadow-sm">
                                {/* Sales & Marketing Themed Visual */}
                                <svg
                                    viewBox="0 0 400 320"
                                    className="w-full h-auto"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* Background Circles */}
                                    <circle cx="340" cy="50" r="35" fill="#dcfce7" />
                                    <circle cx="60" cy="280" r="25" fill="#bbf7d0" />
                                    <circle cx="370" cy="250" r="18" fill="#dcfce7" />

                                    {/* Growth Chart */}
                                    <g>
                                        <rect x="40" y="100" width="140" height="120" rx="12" fill="white" stroke="#e5e7eb" strokeWidth="2" />
                                        <rect x="55" y="180" width="20" height="25" rx="4" fill="#bbf7d0" />
                                        <rect x="85" y="160" width="20" height="45" rx="4" fill="#86efac" />
                                        <rect x="115" y="140" width="20" height="65" rx="4" fill="#22c55e" />
                                        <rect x="145" y="115" width="20" height="90" rx="4" fill="#059669" />
                                        {/* Arrow up */}
                                        <path d="M160 95L170 110L150 110Z" fill="#059669" />
                                        <rect x="157" y="110" width="6" height="15" fill="#059669" />
                                    </g>

                                    {/* Target/Bullseye */}
                                    <g>
                                        <circle cx="280" cy="100" r="50" fill="white" stroke="#e5e7eb" strokeWidth="2" />
                                        <circle cx="280" cy="100" r="38" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="2" />
                                        <circle cx="280" cy="100" r="26" fill="#dcfce7" stroke="#86efac" strokeWidth="2" />
                                        <circle cx="280" cy="100" r="14" fill="#22c55e" />
                                        <circle cx="280" cy="100" r="6" fill="#059669" />
                                        {/* Arrow hitting target */}
                                        <g transform="rotate(-45, 280, 100)">
                                            <rect x="280" y="70" width="60" height="6" rx="2" fill="#fbbf24" />
                                            <polygon points="280,65 280,81 270,73" fill="#fbbf24" />
                                        </g>
                                    </g>

                                    {/* Handshake / Partnership */}
                                    <g>
                                        <ellipse cx="120" cy="280" rx="55" ry="35" fill="white" stroke="#e5e7eb" strokeWidth="2" />
                                        <path d="M90 275C90 275 100 265 115 270C130 275 135 265 145 270" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
                                        <path d="M85 285C85 285 95 275 110 280C125 285 130 275 140 280" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
                                    </g>

                                    {/* Megaphone / Marketing */}
                                    <g>
                                        <path d="M230 200L290 170L290 250L230 220Z" fill="#059669" />
                                        <ellipse cx="225" cy="210" rx="15" ry="20" fill="#10b981" />
                                        <rect x="290" y="195" width="25" height="30" rx="6" fill="#22c55e" />
                                        {/* Sound waves */}
                                        <path d="M320 195C330 200 330 220 320 225" stroke="#bbf7d0" strokeWidth="3" strokeLinecap="round" />
                                        <path d="M335 185C350 195 350 225 335 235" stroke="#dcfce7" strokeWidth="3" strokeLinecap="round" />
                                    </g>

                                    {/* Light bulb - Ideas */}
                                    <g>
                                        <ellipse cx="320" cy="180" rx="22" ry="26" fill="#fef3c7" stroke="#fbbf24" strokeWidth="2" />
                                        <rect x="310" y="203" width="20" height="10" rx="3" fill="#fbbf24" />
                                        <path d="M312 175C312 175 318 165 320 165C322 165 328 175 328 175" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                                    </g>

                                    {/* Dollar signs / Revenue */}
                                    <g>
                                        <circle cx="200" cy="280" r="28" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
                                        <text x="200" y="290" textAnchor="middle" fill="#059669" fontSize="28" fontWeight="bold" fontFamily="Arial">$</text>
                                    </g>

                                    {/* Floating elements */}
                                    <circle cx="50" cy="60" r="8" fill="#bbf7d0" />
                                    <circle cx="180" cy="50" r="6" fill="#dcfce7" />
                                    <circle cx="350" cy="150" r="5" fill="#86efac" />

                                    {/* Sparkles */}
                                    <path d="M100 50L102 56L108 56L103 60L105 66L100 62L95 66L97 60L92 56L98 56Z" fill="#fbbf24" />
                                    <path d="M300 290L302 294L306 294L303 297L304 301L300 298L296 301L297 297L294 294L298 294Z" fill="#fbbf24" />
                                </svg>
                            </div>

                            {/* Decorative Dots */}
                            <div className="absolute -top-3 -right-3 w-7 h-7 bg-[#dcfce7] rounded-full" />
                            <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-[#bbf7d0] rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
