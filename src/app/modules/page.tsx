import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function ModulesPage() {
    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Module", href: "/modules", isActive: true },
        { label: "Instructors", href: "/instructors" },
        { label: "Success Stories", href: "/feedback" },
        { label: "Contact & Q&A", href: "/contact" },
        { label: "Blog", href: "/blog" },
    ];

    const footerLinkGroups = [
        {
            title: "Navigation",
            links: [
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Module", href: "/modules" },
                { label: "Instructors", href: "/instructors" },
            ],
        },
        {
            title: "Support",
            links: [
                { label: "Success Stories", href: "/feedback" },
                { label: "Contact & Q&A", href: "/contact" },
                { label: "Enroll / Learn More", href: "/enroll" },
            ],
        },
    ];

    const coreModules = [
        {
            title: "Sales Mindset & Field Execution",
            description: "Develop confidence, patience, and responsibility through real customer interactions. This module focuses on building the right mindset for ethical and effective selling in real-world environments.",
        },
        {
            title: "Effective Communication & Objection Handling",
            description: "Learn how to communicate clearly, listen with empathy, and handle objections respectfully—without pressure or manipulation.",
        },
        {
            title: "Street Selling & In-Store Experience",
            description: "Gain hands-on experience through face-to-face selling in streets, shops, and retail environments while maintaining honesty, transparency, and fairness.",
        },
        {
            title: "Social Media Marketing & Referral Sales",
            description: "Understand how to promote products and services ethically through social platforms, trust-based referrals, and value-driven communication.",
        },
        {
            title: "Office Sales (B2B) & CRM Strategy",
            description: "Learn professional conduct, relationship management, and long-term client trust building in office-based and B2B sales environments.",
        },
        {
            title: "Copywriting, Branding & Personal CV Writing",
            description: "Develop clear messaging, personal branding, and professional CV writing skills—focused on clarity, honesty, and self-representation without exaggeration.",
        },
        {
            title: "AI in Marketing, Canva & Meta Ads",
            description: "Learn how to use AI tools, design platforms, and advertising systems responsibly—avoiding misleading claims and unethical promotion.",
        },
        {
            title: "English for Business, MS Office & Ethics",
            description: "Build professional communication skills, workplace competence, and ethical awareness required for modern business and organizational environments.",
        },
    ];

    return (
        <>
            <Header
                brandText="Sales & Marketing"
                navLinks={navLinks}
                ctaText="Enroll"
            />

            <main className="min-h-screen bg-white">


                {/* 3. Core Modules Section */}
                <section className="w-full bg-white py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#1f2937] mb-4">
                                Core Learning Modules
                            </h2>
                            <p className="text-[#6b7280] leading-relaxed">
                                A step-by-step journey designed to build your skills from the ground up.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {coreModules.map((module, index) => (
                                <div
                                    key={index}
                                    className={`
                                        group relative bg-white rounded-2xl p-8 border hover:shadow-lg transition-all duration-300
                                        ${index === 0 ? 'border-[#059669]/30 shadow-md ring-1 ring-[#059669]/10' : 'border-[#e5e7eb] shadow-sm'}
                                    `}
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <span className={`
                                            text-sm font-bold tracking-widest uppercase
                                            ${index === 0 ? 'text-[#059669]' : 'text-[#9ca3af]'}
                                        `}>
                                            Module {String(index + 1).padStart(2, '0')}
                                        </span>
                                        {index === 0 && (
                                            <span className="bg-[#ecfdf5] text-[#059669] text-xs font-semibold px-2.5 py-1 rounded-full">
                                                Foundation
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-[#1f2937] mb-3 group-hover:text-[#059669] transition-colors duration-200">
                                        {module.title}
                                    </h3>

                                    <p className="text-[#6b7280] leading-relaxed text-sm">
                                        {module.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Learning Approach & CTA (Merged) */}
                <section className="w-full bg-[#f9fafb] py-8 md:py-12 border-t border-[#f3f4f6]">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-16 h-1 bg-[#059669] rounded-full mb-6"></div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1f2937] mb-6">
                                How We Teach
                            </h2>
                            <p className="text-[#4b5563] text-lg leading-relaxed max-w-2xl mx-auto">
                                All modules are taught through practical execution rather than theory alone. Students learn by doing—interacting with real customers, solving real problems, and applying skills in real contexts under guidance and supervision.
                            </p>
                        </div>


                    </div>
                </section>
            </main>

            <Footer
                brandName="Sales & Marketing"
                brandDescription="A professional learning platform focused on practical sales, marketing, and ethical growth."
                linkGroups={footerLinkGroups}
                copyrightText="© 2026 Sales & Marketing. All rights reserved."
            />
        </>
    );
}
