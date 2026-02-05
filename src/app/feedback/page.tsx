"use client";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Card, { CardBody } from "@/components/ui/Card";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

function FeedbackForm() {
    const [formData, setFormData] = useState({
        name: "",
        batch: "",
        message: "",
        isAnonymous: false
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            await addDoc(collection(db, "feedback"), {
                name: formData.isAnonymous ? null : formData.name,
                batch: formData.batch,
                message: formData.message,
                isAnonymous: formData.isAnonymous,
                status: "PENDING",
                createdAt: serverTimestamp()
            });
            setStatus('success');
            setFormData({ name: "", batch: "", message: "", isAnonymous: false });
        } catch (error) {
            console.error("Error submitting feedback:", error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-2">Thank You!</h3>
                <p className="text-green-700">
                    Your feedback has been submitted successfully. It will be reviewed by our team shortly.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-green-700 font-semibold hover:text-green-800 underline"
                >
                    Submit another response
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                    <input
                        type="checkbox"
                        id="isAnonymous"
                        checked={formData.isAnonymous}
                        onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                        className="w-4 h-4 text-[#059669] rounded focus:ring-[#059669]"
                    />
                    <label htmlFor="isAnonymous" className="text-sm font-medium text-gray-700 select-none cursor-pointer">
                        Submit Anonymously
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Name {formData.isAnonymous && <span className="font-normal text-gray-500">(Hidden)</span>}
                        </label>
                        <input
                            type="text"
                            required={!formData.isAnonymous}
                            disabled={formData.isAnonymous}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#059669] focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
                            placeholder={formData.isAnonymous ? "Anonymous User" : "Your Name"}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Batch (Optional)</label>
                        <input
                            type="text"
                            value={formData.batch}
                            onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#059669] focus:outline-none"
                            placeholder="e.g. Batch 05"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Feedback / Story</label>
                    <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#059669] focus:outline-none resize-none"
                        placeholder="Share your experience..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3 px-6 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {status === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
                </button>

                {status === 'error' && (
                    <p className="text-red-600 text-center text-sm">Failed to submit feedback. Please try again.</p>
                )}
            </form>
        </div>
    );
}

export default function PublicSuccessStoriesPage() {
    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Module", href: "/modules" },
        { label: "Instructors", href: "/instructors" },
        { label: "Success Stories", href: "/feedback", isActive: true },
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

    const successStories = [
        {
            id: 1,
            name: "Rahim Ahmed",
            batch: "Batch_02",
            role: "Digital Marketing Specialist",
            company: "TechSolutions BD",
            quote: "This course completely changed my perspective on sales. The practical modules on digital marketing strategies helped me land my first job within 2 months of graduating!",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahim"
        },
        {
            id: 2,
            name: "Fatima Khan",
            batch: "Batch_04",
            role: "Sales Executive",
            company: "Creative Agency",
            quote: "I was struggling to understand the psychology behind sales. The mentorship from the instructors was invaluable. I'm now leading a team of 5 sales reps!",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima"
        },
        {
            id: 3,
            name: "Sajjad Hossain",
            batch: "Batch_01",
            role: "Freelance Copywriter",
            company: "Upwork Top Rated",
            quote: "The modules on copywriting and persuasion were top-notch. I went from zero to becoming a Top Rated freelancer on Upwork. Highly recommended!",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sajjad"
        },
        {
            id: 4,
            name: "Ayesha Siddiqua",
            batch: "Batch_05",
            role: "Marketing Manager",
            company: "StartUp Hub",
            quote: "It's not just a course; it's a career transformation. The community support and the networking opportunities are what set this apart from others.",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayesha"
        },
        {
            id: 5,
            name: "Tanvir Hasan",
            batch: "Batch_03",
            role: "Business Dev. Manager",
            company: "Global Corp",
            quote: "The negotiation skills I learned here have been crucial in closing big deals for my company. Real-world examples made it easy to apply immediately.",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tanvir"
        },
        {
            id: 6,
            name: "Nusrat Jahan",
            batch: "Batch_06",
            role: "Social Media Manager",
            company: "BrandBoost",
            quote: "I loved the hands-on approach. We didn't just learn theory; we implemented it. The live projects gave me the confidence to handle real clients.",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nusrat"
        }
    ];

    return (
        <>
            <Header
                brandText="Sales & Marketing"
                navLinks={navLinks}
                ctaText="Enroll"
            />

            <main className="min-h-screen bg-gray-50">
                {/* 1. Page Header Section */}
                <section className="w-full bg-white py-16 md:py-20 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                        <span className="inline-block py-1 px-3 rounded-full bg-[#ecfdf5] text-[#059669] text-sm font-semibold mb-4 border border-[#d1fae5]">
                            Alumni Success
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1f2937] mb-6">
                            Our Success Stories
                        </h1>
                        <p className="text-lg md:text-xl text-[#6b7280] max-w-2xl mx-auto leading-relaxed">
                            Discover how our students have transformed their careers and achieved their goals through our Sales & Marketing program.
                        </p>
                    </div>
                </section>

                {/* 2. Success Stories Grid */}
                <section className="w-full py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {successStories.map((story) => (
                                <Card key={story.id} hover className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300">
                                    <CardBody className="flex flex-col h-full p-8">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 border-2 border-[#ecfdf5]">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={story.image}
                                                    alt={story.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg">{story.name}</h3>
                                                <p className="text-[#059669] text-sm font-medium">{story.role}</p>
                                                <p className="text-gray-500 text-xs">{story.company}</p>
                                            </div>
                                        </div>

                                        <div className="mb-6 relative">
                                            <svg className="absolute -top-4 -left-2 w-8 h-8 text-[#d1fae5] transform -scale-x-100" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14.017 21L14.017 18C14.017 16.896 14.321 16.068 14.93 15.516C15.539 14.964 16.29 14.326 17.183 13.602C18.076 12.879 18.522 12.189 18.522 11.532C18.522 10.875 18.006 10.323 16.974 9.876V8.16599C18.887 8.35199 20.354 8.78399 21.375 9.46199C22.396 10.14 22.906 11.332 22.906 13.038C22.906 15.657 21.677 18.311 19.22 21H14.017ZM8.61003 21H3.40703L3.40703 18C3.40703 16.896 3.71103 16.068 4.31903 15.516C4.92703 14.964 5.67903 14.326 6.57403 13.602C7.46903 12.879 7.91503 12.189 7.91503 11.532C7.91503 10.875 7.4 10.323 6.37003 9.876V8.16599C8.28103 8.35199 9.74803 8.78399 10.771 9.46199C11.794 10.14 12.305 11.332 12.305 13.038C12.305 15.657 11.077 18.311 8.61003 21Z" />
                                            </svg>
                                            <p className="text-gray-600 italic leading-relaxed relative z-10 pl-2">
                                                &quot;{story.quote}&quot;
                                            </p>
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50 -mx-8 -mb-8 px-8 py-4">
                                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                {story.batch.replace('_', ' ')}
                                            </span>
                                            <div className="flex text-[#fbbf24]">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>

                        {/* Validated Stats or Call to Action could go here */}
                        <div className="mt-16 text-center">
                            <a href="/enroll" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-[#059669] border border-transparent rounded-full hover:bg-[#047857] hover:shadow-lg transform hover:-translate-y-1">
                                Start Your Success Story Today
                                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>
                {/* 3. Feedback Submission Form */}
                <section className="w-full bg-white py-16 md:py-20 border-t border-gray-100">
                    <div className="max-w-2xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#1f2937] mb-4">
                                Share Your Experience
                            </h2>
                            <p className="text-[#6b7280] leading-relaxed">
                                We value your feedback. Share your success story or suggestions to help us improve.
                            </p>
                        </div>

                        <FeedbackForm />
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
