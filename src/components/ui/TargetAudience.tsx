"use client";

import { cn } from "@/lib/utils";

interface AudienceCard {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface TargetAudienceProps {
    title: string;
    subtitle: string;
    audiences: AudienceCard[];
    className?: string;
}

// Default icons for audience cards
const defaultAudienceIcons = {
    students: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10V6C22 4.89543 21.1046 4 20 4H4C2.89543 4 2 4.89543 2 6V10" />
            <path d="M12 12L22 6" />
            <path d="M12 12L2 6" />
            <path d="M12 12V21" />
            <path d="M8 21H16" />
        </svg>
    ),
    jobSeekers: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7" />
            <path d="M12 12V14" />
            <circle cx="12" cy="14" r="2" />
        </svg>
    ),
    entrepreneurs: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
    ),
    ethicalLearners: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
            <path d="M12 6V12L16 14" />
        </svg>
    ),
};

export default function TargetAudience({
    title,
    subtitle,
    audiences,
    className = "",
}: TargetAudienceProps) {
    return (
        <section
            className={cn(
                "w-full bg-white py-16 md:py-24",
                className
            )}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1f2937] mb-4">
                        {title}
                    </h2>
                    <p className="text-base md:text-lg text-[#6b7280] leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                {/* Audience Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {audiences.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-sm
                                transition-all duration-200 ease-out
                                hover:shadow-md"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-[#f0fdf4] flex items-center justify-center text-[#059669] mb-4">
                                {card.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold text-[#1f2937] mb-2">
                                {card.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-[#6b7280] leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Export default icons for easy usage
export { defaultAudienceIcons };
