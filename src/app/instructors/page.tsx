import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function InstructorsPage() {
    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Module", href: "/modules" },
        { label: "Instructors", href: "/instructors", isActive: true },
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

    const instructors = [
        {
            name: "Full Name",
            role: "Sales & Marketing Mentor",
            description: "A professional trainer with hands-on experience in sales execution, communication skills, and ethical business practices.",
        },
        {
            name: "Full Name",
            role: "Field Sales & Communication Instructor",
            description: "A professional trainer with hands-on experience in sales execution, communication skills, and ethical business practices.",
        },
        {
            name: "Full Name",
            role: "Digital Marketing & Tools Mentor",
            description: "A professional trainer with hands-on experience in sales execution, communication skills, and ethical business practices.",
        },
        {
            name: "Full Name",
            role: "Professional Development & Ethics Mentor",
            description: "A professional trainer with hands-on experience in sales execution, communication skills, and ethical business practices.",
        },
        {
            name: "Full Name",
            role: "Sales & Marketing Mentor",
            description: "A professional trainer with hands-on experience in sales execution, communication skills, and ethical business practices.",
        },
        {
            name: "Full Name",
            role: "Field Sales & Communication Instructor",
            description: "A professional trainer with hands-on experience in sales execution, communication skills, and ethical business practices.",
        },
    ];

    const approachPoints = [
        {
            title: "Field Guidance",
            description: "Guiding students during fieldwork and real customer interactions.",
        },
        {
            title: "Continuous Feedback",
            description: "Providing continuous feedback and practical correction.",
        },
        {
            title: "Ethical Accountability",
            description: "Emphasizing ethical behavior, discipline, and professional accountability.",
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
                {/* 3. Instructors Grid Section */}
                <section className="w-full bg-white py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#1f2937] mb-4">
                                Meet Our Team
                            </h2>
                            <p className="text-[#6b7280] leading-relaxed">
                                Dedicated professionals committed to helping you grow with practical skills and ethical values.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {instructors.map((instructor, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow duration-200"
                                >
                                    {/* Profile Photo Placeholder */}
                                    <div className="w-20 h-20 rounded-full bg-[#f0fdf4] border-2 border-[#dcfce7] mx-auto mb-4 flex items-center justify-center">
                                        <svg
                                            className="w-10 h-10 text-[#059669]"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-lg font-semibold text-[#1f2937] mb-1">
                                            {instructor.name}
                                        </h3>
                                        <p className="text-sm font-medium text-[#059669] mb-3">
                                            {instructor.role}
                                        </p>
                                        <p className="text-sm text-[#6b7280] leading-relaxed">
                                            {instructor.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Teaching & Mentorship Approach */}
                <section className="w-full bg-[#f9fafb] py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#1f2937] mb-4">
                                Our Teaching Approach
                            </h2>
                            <p className="text-[#6b7280] leading-relaxed">
                                Instructors and mentors follow a hands-on, responsibility-driven approach to learning:
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {approachPoints.map((point, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-sm"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#f0fdf4] flex items-center justify-center mb-4">
                                        <div className="w-3 h-3 rounded-full bg-[#059669]"></div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#1f2937] mb-2">
                                        {point.title}
                                    </h3>
                                    <p className="text-sm text-[#6b7280] leading-relaxed">
                                        {point.description}
                                    </p>
                                </div>
                            ))}
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
