"use client";

import { useState } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        subject: "",
        message: "",
    });

    const navLinks = [
        { label: "Home", href: "/home" },
        { label: "About the Course", href: "/about" },
        { label: "Course Modules", href: "/modules" },
        { label: "Instructors", href: "/instructors" },
        { label: "Student Feedback", href: "/feedback" },
        { label: "Contact", href: "/contact", isActive: true },
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

    const contactInfo = [
        {
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            ),
            label: "Email",
            value: "contact@salesandmarketingcourse.com",
            description: "For inquiries and course information",
        },
        {
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
            ),
            label: "Phone",
            value: "+880 1XXXXXXXXX",
            description: "Available during office hours",
        },
        {
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
            ),
            label: "Training Location",
            value: "In-person residential training",
            description: "Location shared after enrollment",
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission logic would go here
        console.log("Form submitted:", formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

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
                            Contact
                        </h1>
                        <p className="text-lg md:text-xl text-[#6b7280] max-w-2xl mx-auto">
                            Get in touch with us for questions, inquiries, or further information about the course.
                        </p>
                    </div>
                </section>

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
                                    <p className="text-sm text-[#6b7280]">
                                        {info.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. Inquiry Form Section */}
                <section className="w-full bg-white py-16 md:py-20">
                    <div className="max-w-2xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#1f2937] mb-4">
                                Send Us a Message
                            </h2>
                            <p className="text-[#6b7280] leading-relaxed">
                                Have a question or need clarification? Send us a message and we'll get back to you.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 border border-[#e5e7eb] shadow-sm">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-semibold text-[#1f2937] mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className="w-full px-4 py-3 border-2 border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent text-[#1f2937]"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-[#1f2937] mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email address"
                                        className="w-full px-4 py-3 border-2 border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent text-[#1f2937]"
                                        required
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-semibold text-[#1f2937] mb-2">
                                        Subject
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent text-[#1f2937] bg-white"
                                        required
                                    >
                                        <option value="" disabled>Select a subject</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="enrollment">Enrollment Question</option>
                                        <option value="course">Course Information</option>
                                        <option value="partnership">Partnership / Collaboration</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-[#1f2937] mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Write your message here..."
                                        rows={5}
                                        className="w-full px-4 py-3 border-2 border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent text-[#1f2937] resize-none"
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 bg-[#059669] text-white font-semibold rounded-xl
                                        transition-all duration-200 ease-out
                                        hover:bg-[#10b981] hover:shadow-lg
                                        focus:outline-none focus:ring-2 focus:ring-[#059669] focus:ring-offset-2"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        <p className="text-center text-[#6b7280] mt-6 text-sm">
                            We aim to respond to all inquiries within a reasonable time. Your information will be handled respectfully and will not be shared.
                        </p>
                    </div>
                </section>

                {/* 5. Call To Action Section */}
                <section className="w-full bg-[#f0fdf4] py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                        <p className="text-lg md:text-xl text-[#1f2937] mb-6 max-w-2xl mx-auto">
                            Explore the course structure, learning approach, and modules to see if this program is right for you.
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
