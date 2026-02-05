"use client";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import AIFAQSection from "@/components/ui/AIFAQSection";

export default function ContactPage() {

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Module", href: "/modules" },
        { label: "Instructors", href: "/instructors" },
        { label: "Success Stories", href: "/feedback" },
        { label: "Contact & Q&A", href: "/contact", isActive: true },
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

    const contactInfo = [
        {
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            ),
            label: "Email",
            value: "abul.hayat@skill.assunnahfoundation.org",
            description: "For inquiries and course information",
        },
        {
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
            ),
            label: "Phone",
            value: "01862534626",
            description: "Available at 9 am to 5 pm",
        },
        {
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
            ),
            label: "Training Location",
            value: "আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট",
            description: "আলি নগর গেটের বিপরীত পাশের বিল্ডিং, সাতারকুল রোড, উত্তর বাড্ডা, ঢাকা।",
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


                {/* 2. Contact Information Section */}
                <section className="w-full bg-[#f9fafb] py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#1f2937] mb-4">
                                Get in Touch
                            </h2>
                            <p className="text-[#6b7280] leading-relaxed">
                                Choose the most convenient way to reach us.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {contactInfo.map((info, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-sm text-center"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-[#f0fdf4] flex items-center justify-center mx-auto mb-4 text-[#059669]">
                                        {info.icon}
                                    </div>
                                    <h3 className="text-sm font-medium text-[#6b7280] mb-1">
                                        {info.label}
                                    </h3>
                                    <p className="text-lg font-semibold text-[#1f2937] mb-2">
                                        {info.value}
                                    </p>
                                    <p className="text-base font-bold italic text-[#6b7280]">
                                        {info.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. AI Powered FAQ Section (Replaces Inquiry Form) */}
                <AIFAQSection />


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
