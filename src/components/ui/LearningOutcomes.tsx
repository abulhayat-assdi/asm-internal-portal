"use client";

import { cn } from "@/lib/utils";

interface LearningOutcomesProps {
    title: string;
    subtitle: string;
    outcomes: string[];
    className?: string;
}

export default function LearningOutcomes({
    title,
    subtitle,
    outcomes,
    className = "",
}: LearningOutcomesProps) {
    return (
        <section
            className={cn(
                "w-full bg-[#f9fafb] py-16 md:py-24",
                className
            )}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="flex flex-col space-y-6">
                        {/* Section Header */}
                        <div className="space-y-3">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1f2937]">
                                {title}
                            </h2>
                            <p className="text-base md:text-lg text-[#6b7280] leading-relaxed max-w-lg">
                                {subtitle}
                            </p>
                        </div>

                        {/* Outcomes List */}
                        <ul className="space-y-4 pt-2">
                            {outcomes.map((outcome, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    {/* Checkmark Icon */}
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#059669] flex items-center justify-center mt-0.5">
                                        <svg
                                            className="w-3.5 h-3.5 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            viewBox="0 0 24 24"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M5 12l5 5L20 7" />
                                        </svg>
                                    </div>
                                    <span className="text-[#1f2937] text-base leading-relaxed">
                                        {outcome}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Visual - Abstract Illustration */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-sm lg:max-w-md">
                            {/* Soft Container */}
                            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-[#e5e7eb]">
                                {/* Abstract Growth/Learning Visual */}
                                <svg
                                    viewBox="0 0 300 280"
                                    className="w-full h-auto"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* Background Circles */}
                                    <circle cx="250" cy="40" r="30" fill="#f0fdf4" />
                                    <circle cx="50" cy="240" r="25" fill="#dcfce7" />
                                    <circle cx="270" cy="200" r="18" fill="#f0fdf4" />

                                    {/* Steps / Growth Path */}
                                    <g>
                                        {/* Step 1 */}
                                        <rect x="30" y="200" width="50" height="50" rx="8" fill="#dcfce7" />
                                        <text x="55" y="230" textAnchor="middle" fill="#059669" fontSize="18" fontWeight="bold" fontFamily="Arial">1</text>

                                        {/* Step 2 */}
                                        <rect x="95" y="160" width="50" height="50" rx="8" fill="#bbf7d0" />
                                        <text x="120" y="190" textAnchor="middle" fill="#059669" fontSize="18" fontWeight="bold" fontFamily="Arial">2</text>

                                        {/* Step 3 */}
                                        <rect x="160" y="120" width="50" height="50" rx="8" fill="#86efac" />
                                        <text x="185" y="150" textAnchor="middle" fill="#059669" fontSize="18" fontWeight="bold" fontFamily="Arial">3</text>

                                        {/* Step 4 */}
                                        <rect x="225" y="80" width="50" height="50" rx="8" fill="#22c55e" />
                                        <text x="250" y="110" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial">4</text>

                                        {/* Connecting Lines */}
                                        <path d="M80 200L95 185" stroke="#bbf7d0" strokeWidth="3" strokeLinecap="round" />
                                        <path d="M145 160L160 145" stroke="#86efac" strokeWidth="3" strokeLinecap="round" />
                                        <path d="M210 120L225 105" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                                    </g>

                                    {/* Person/Avatar at top */}
                                    <g>
                                        <circle cx="250" cy="45" r="18" fill="#059669" />
                                        <circle cx="250" cy="40" r="8" fill="white" />
                                        <path d="M238 55C238 55 244 62 250 62C256 62 262 55 262 55" stroke="white" strokeWidth="3" strokeLinecap="round" />
                                    </g>

                                    {/* Achievement Badge */}
                                    <g>
                                        <circle cx="60" cy="80" r="35" fill="white" stroke="#e5e7eb" strokeWidth="2" />
                                        <circle cx="60" cy="80" r="25" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
                                        <path d="M50 80L57 87L72 72" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>

                                    {/* Light Bulb - Learning */}
                                    <g>
                                        <ellipse cx="150" cy="55" rx="22" ry="26" fill="#fef3c7" stroke="#fbbf24" strokeWidth="2" />
                                        <rect x="140" y="78" width="20" height="10" rx="3" fill="#fbbf24" />
                                        <path d="M143 50C143 50 148 42 150 42C152 42 157 50 157 50" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                                    </g>

                                    {/* Stars */}
                                    <path d="M120 240L122 246L128 246L123 250L125 256L120 252L115 256L117 250L112 246L118 246Z" fill="#fbbf24" />
                                    <path d="M200 230L201 234L205 234L202 237L203 241L200 238L197 241L198 237L195 234L199 234Z" fill="#bbf7d0" />

                                    {/* Floating Dots */}
                                    <circle cx="180" cy="250" r="6" fill="#dcfce7" />
                                    <circle cx="240" cy="170" r="5" fill="#bbf7d0" />
                                    <circle cx="30" cy="140" r="4" fill="#dcfce7" />
                                </svg>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#dcfce7] rounded-full" />
                            <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-[#bbf7d0] rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
