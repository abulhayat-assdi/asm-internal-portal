import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function ModulesPage() {
    const navLinks = [
        { label: "Home", href: "/home" },
        { label: "About the Course", href: "/about" },
        { label: "Course Modules", href: "/modules", isActive: true },
        { label: "Instructors", href: "/instructors" },
        { label: "Student Feedback", href: "/feedback" },
        { label: "Contact", href: "/contact" },
        { label: "Blog", href: "/blog" },
    ];

    const footerLinkGroups = [
        {
            title: "Navigation",
            links: [
                { label: "Home", href: "/home" },
                { label: "About the Course", href: "/about" },
                { label: "Course Modules", href: "/modules" },
                { label: "Instructors", href: "/instructors" },
            ],
        },
        {
            title: "Support",
            links: [
                { label: "Student Feedback", href: "/feedback" },
                { label: "Contact", href: "/contact" },
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
                {/* 1. Page Header Section */}
                <section className="w-full bg-white py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1f2937] mb-4">
                            Course Modules
                        </h1>
                        <p className="text-lg md:text-xl text-[#6b7280] max-w-2xl mx-auto">
                            An overview of the core learning modules that shape the structure and depth of the training program.
                        </p>
                    </div>
                </section>

                {/* 2. Course Structure Overview */}
                <section className="w-full bg-[#f9fafb] py-16 md:py-20">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1f2937] mb-6">
                            Program Structure
                        </h2>
                        <div className="space-y-6 text-[#4b5563] leading-relaxed">
                            <p>
                                This course is designed as a structured professional training program that combines real-world sales practice, communication skills, modern marketing tools, and ethical responsibility.
                            </p>
                            <p>
                                The modules are delivered through field execution, guided practice, and applied learning—ensuring that students do not only understand concepts, but can apply them confidently in real professional and business environments.
                            </p>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <div className="bg-white rounded-xl px-5 py-3 border border-[#e5e7eb] shadow-sm">
                                <span className="text-sm text-[#6b7280]">Duration</span>
                                <p className="text-lg font-semibold text-[#059669]">90 Days</p>
                            </div>
                            <div className="bg-white rounded-xl px-5 py-3 border border-[#e5e7eb] shadow-sm">
                                <span className="text-sm text-[#6b7280]">Focus</span>
                                <p className="text-lg font-semibold text-[#059669]">Practical Skills</p>
                            </div>
                            <div className="bg-white rounded-xl px-5 py-3 border border-[#e5e7eb] shadow-sm">
                                <span className="text-sm text-[#6b7280]">Approach</span>
                                <p className="text-lg font-semibold text-[#059669]">Learn by Doing</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Core Modules Section */}
                <section className="w-full bg-white py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#1f2937] mb-4">
                                Core Learning Modules
                            </h2>
                            <p className="text-[#6b7280] leading-relaxed">
                                Each module covers essential skills and knowledge areas that prepare you for real-world success.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {coreModules.map((module, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow duration-200"
                                >
                                    <div className="w-full h-1 bg-[#059669] rounded-full mb-4"></div>
                                    <h3 className="text-lg font-semibold text-[#1f2937] mb-2">
                                        {module.title}
                                    </h3>
                                    <p className="text-sm text-[#6b7280] leading-relaxed">
                                        {module.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Learning Approach Note */}
                <section className="w-full bg-[#f9fafb] py-16 md:py-20">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-1 bg-[#059669] rounded-full"></div>
                            <h2 className="text-2xl md:text-3xl font-bold text-[#1f2937]">
                                How We Teach
                            </h2>
                        </div>
                        <div className="text-[#4b5563] leading-relaxed">
                            <p>
                                All modules are taught through practical execution rather than theory alone. Students learn by doing—interacting with real customers, solving real problems, and applying skills in real contexts under guidance and supervision.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 5. Call To Action Section */}
                <section className="w-full bg-[#f0fdf4] py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                        <p className="text-lg md:text-xl text-[#1f2937] mb-6 max-w-2xl mx-auto">
                            Explore how these modules come together to build real skills, confidence, and ethical professionalism.
                        </p>
                        <button className="px-6 py-3 bg-[#059669] text-white font-semibold rounded-full
                            transition-all duration-200 ease-out
                            hover:bg-[#10b981] hover:shadow-lg
                            focus:outline-none focus:ring-2 focus:ring-[#059669] focus:ring-offset-2">
                            View Enrollment Details
                        </button>
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
