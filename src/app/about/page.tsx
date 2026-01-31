import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function AboutPage() {
    const navLinks = [
        { label: "Home", href: "/home" },
        { label: "About the Course", href: "/about", isActive: true },
        { label: "Course Modules", href: "/modules" },
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

    const whyReasons = [
        {
            title: "Bridging Skill Gaps",
            description: "Many learners complete education without practical selling, communication, or market-ready skills. This course exists to bridge the gap between learning and real employment or business.",
        },
        {
            title: "Reframing Sales & Marketing",
            description: "Sales is often misunderstood as pressure or deception. This program redefines sales as service and trust, and marketing as honest value communication.",
        },
        {
            title: "Preparing Responsible Earners",
            description: "The course is designed for those who want to earn through skill—not shortcuts—while maintaining ethical standards in professional and business life.",
        },
        {
            title: "Responding to Real Market Needs",
            description: "Businesses today need people who can communicate clearly, sell responsibly, and build long-term relationships. This course directly addresses that demand.",
        },
    ];

    const learningPrinciples = [
        {
            title: "Learning by Doing",
            description: "Skills are developed through action. Our program emphasizes practical exercises, real projects, and hands-on experience over passive learning.",
        },
        {
            title: "Building Confidence Through Action",
            description: "True confidence comes from doing, not just knowing. Every module is designed to help learners practice, reflect, and grow.",
        },
        {
            title: "Market-Ready Development",
            description: "We focus on what the market actually needs—clear communication, ethical selling, and professional presentation skills.",
        },
    ];

    const coreValues = [
        "Trust and responsibility",
        "Honesty and transparency",
        "Fairness and accountability",
        "Excellence in skills and character",
        "Service through solving real problems",
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
                            About the Course
                        </h1>
                        <p className="text-lg md:text-xl text-[#6b7280] max-w-2xl mx-auto">
                            Learn the purpose, philosophy, and foundation behind The Art of Sales & Marketing training program.
                        </p>
                    </div>
                </section>

                {/* 2. Course Introduction Section */}
                <section className="w-full bg-[#f9fafb] py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            {/* Left - Content */}
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#1f2937] mb-8">
                                    What Is This Course?
                                </h2>
                                <div className="space-y-6 text-[#4b5563] leading-relaxed">
                                    <p>
                                        The Art of Sales & Marketing is a 90-day professional training program designed to prepare aspiring individuals for real-world careers in sales, marketing, and ethical entrepreneurship.
                                    </p>
                                    <p>
                                        This course treats sales as a responsibility and a trust, and marketing as truthful communication—not manipulation. It combines practical fieldwork, modern digital tools, and strong character development to help learners grow into confident, capable, and ethical professionals.
                                    </p>
                                    <p>
                                        Through real-life projects, on-field experiences, and technology-driven learning, participants are trained to perform effectively in today's competitive business environment while earning with dignity, integrity, and purpose.
                                    </p>
                                </div>
                            </div>
                            {/* Right - Illustration */}
                            <div className="hidden lg:flex justify-center">
                                <div className="bg-white rounded-2xl p-8 border border-[#e5e7eb] shadow-sm">
                                    <svg className="w-72 h-72" viewBox="0 0 300 300" fill="none">
                                        {/* Professional Training Illustration */}
                                        {/* Background Circle */}
                                        <circle cx="150" cy="150" r="120" fill="#f0fdf4" />

                                        {/* Book/Learning */}
                                        <rect x="80" y="120" width="80" height="100" rx="4" fill="#dcfce7" stroke="#059669" strokeWidth="2" />
                                        <line x1="120" y1="120" x2="120" y2="220" stroke="#059669" strokeWidth="2" />
                                        <line x1="90" y1="140" x2="110" y2="140" stroke="#059669" strokeWidth="2" />
                                        <line x1="90" y1="155" x2="110" y2="155" stroke="#059669" strokeWidth="2" />
                                        <line x1="90" y1="170" x2="110" y2="170" stroke="#059669" strokeWidth="2" />
                                        <line x1="130" y1="140" x2="150" y2="140" stroke="#059669" strokeWidth="2" />
                                        <line x1="130" y1="155" x2="150" y2="155" stroke="#059669" strokeWidth="2" />
                                        <line x1="130" y1="170" x2="150" y2="170" stroke="#059669" strokeWidth="2" />

                                        {/* Person/Graduate */}
                                        <circle cx="200" cy="90" r="25" fill="#059669" />
                                        <rect x="175" y="120" width="50" height="70" rx="6" fill="#059669" />

                                        {/* Graduation Cap */}
                                        <polygon points="200,55 230,70 200,85 170,70" fill="#1f2937" />
                                        <rect x="197" y="50" width="6" height="10" fill="#1f2937" />
                                        <circle cx="200" cy="48" r="4" fill="#059669" />

                                        {/* Chart/Growth */}
                                        <rect x="180" y="200" width="60" height="50" rx="4" fill="white" stroke="#059669" strokeWidth="2" />
                                        <polyline points="190,235 205,220 220,230 230,210" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" />

                                        {/* Stars */}
                                        <circle cx="70" cy="80" r="4" fill="#fbbf24" />
                                        <circle cx="250" cy="160" r="3" fill="#fbbf24" />
                                        <circle cx="100" cy="250" r="3" fill="#fbbf24" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Why This Course Exists */}
                <section className="w-full bg-white py-16 md:py-20">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1f2937] mb-10">
                            Why This Course Exists
                        </h2>
                        <div className="space-y-8">
                            {whyReasons.map((reason, index) => (
                                <div key={index} className="border-l-4 border-[#059669] pl-6">
                                    <h3 className="text-lg font-semibold text-[#059669] mb-2">
                                        {reason.title}
                                    </h3>
                                    <p className="text-[#4b5563] leading-relaxed">
                                        {reason.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Learning Philosophy */}
                <section className="w-full bg-[#f9fafb] py-16 md:py-20 relative overflow-hidden">
                    {/* Background Visual Element */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
                        <svg className="w-96 h-96" viewBox="0 0 400 400" fill="none">
                            <circle cx="200" cy="200" r="180" stroke="#059669" strokeWidth="2" strokeDasharray="10 10" />
                            <circle cx="200" cy="200" r="140" stroke="#059669" strokeWidth="2" />
                            <circle cx="200" cy="200" r="100" stroke="#059669" strokeWidth="2" strokeDasharray="5 5" />
                            <path d="M200 60 L200 340" stroke="#059669" strokeWidth="1" />
                            <path d="M60 200 L340 200" stroke="#059669" strokeWidth="1" />
                        </svg>
                    </div>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#1f2937] mb-4">
                                Our Learning Philosophy
                            </h2>
                            <p className="text-[#6b7280] leading-relaxed">
                                This course focuses on practical learning that builds confidence, responsibility, and real-world capability.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {learningPrinciples.map((principle, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-sm"
                                >
                                    <h3 className="text-lg font-semibold text-[#1f2937] mb-3">
                                        {principle.title}
                                    </h3>
                                    <p className="text-sm text-[#6b7280] leading-relaxed">
                                        {principle.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. Ethics & Responsibility */}
                <section className="w-full bg-white py-16 md:py-20">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                        <div className="flex items-start gap-4 mb-6">
                            {/* Small Ethics Icon */}
                            <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-xl bg-[#f0fdf4] items-center justify-center">
                                <svg className="w-6 h-6 text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    <path d="M9 12l2 2 4-4" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#1f2937] mb-2">
                                    Ethics & Responsibility
                                </h2>
                            </div>
                        </div>
                        <p className="text-[#4b5563] leading-relaxed mb-8">
                            At its core, this course is grounded in ethical responsibility and Islamic business values.
                        </p>
                        <div className="bg-[#f0fdf4] rounded-2xl p-6 border border-[#dcfce7]">
                            <h3 className="text-lg font-semibold text-[#059669] mb-4">
                                Core Values
                            </h3>
                            <ul className="space-y-3">
                                {coreValues.map((value, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#059669] flex items-center justify-center mt-0.5">
                                            <svg
                                                className="w-3 h-3 text-white"
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
                                        <span className="text-[#4b5563]">{value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 6. Call To Action Section */}
                <section className="w-full bg-[#f0fdf4] py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                        <p className="text-lg md:text-xl text-[#1f2937] mb-6 max-w-2xl mx-auto">
                            Take the next step toward building real skills, professional confidence, and ethical earning.
                        </p>
                        <button className="px-6 py-3 bg-[#059669] text-white font-semibold rounded-full
                            transition-all duration-200 ease-out
                            hover:bg-[#10b981] hover:shadow-lg
                            focus:outline-none focus:ring-2 focus:ring-[#059669] focus:ring-offset-2">
                            View Course Modules
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
