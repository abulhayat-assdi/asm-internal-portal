import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Link from "next/link";

export default function BlogPostPage() {
    const navLinks = [
        { label: "Home", href: "/home" },
        { label: "About the Course", href: "/about" },
        { label: "Course Modules", href: "/modules" },
        { label: "Instructors", href: "/instructors" },
        { label: "Student Feedback", href: "/feedback" },
        { label: "Contact", href: "/contact" },
        { label: "Blog", href: "/blog", isActive: true },
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

    return (
        <>
            <Header
                brandText="Sales & Marketing"
                navLinks={navLinks}
                ctaText="Enroll"
            />

            <main className="min-h-screen bg-white">
                {/* 1. Article Header Section */}
                <section className="w-full bg-white pt-16 md:pt-20 pb-8">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                        <div className="mb-4">
                            <span className="text-sm font-medium text-[#059669] uppercase tracking-wide">
                                Sales Skills
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1f2937] mb-4 leading-tight">
                            Sales Is Not Manipulation — It Is Responsibility
                        </h1>
                        <p className="text-lg md:text-xl text-[#6b7280] leading-relaxed mb-6">
                            Understanding ethical sales as trust, service, and honest communication.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                            <span>Sales Skills</span>
                            <span>·</span>
                            <span>6 min read</span>
                        </div>
                    </div>
                </section>

                {/* 2. Featured Image Section */}
                <section className="w-full bg-white py-8">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                        <div className="w-full h-64 md:h-80 bg-[#f0fdf4] rounded-2xl flex items-center justify-center shadow-sm">
                            <svg
                                className="w-16 h-16 text-[#059669] opacity-40"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                        </div>
                    </div>
                </section>

                {/* 3. Article Content Section */}
                <section className="w-full bg-white py-8 md:py-12">
                    <article className="max-w-3xl mx-auto px-6 lg:px-8">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-[#4b5563] leading-relaxed text-lg mb-6">
                                Sales is often misunderstood. Many people associate it with pressure tactics, manipulation,
                                or convincing someone to buy something they do not need. This perception has damaged the
                                reputation of sales as a profession and discouraged many honest people from entering the field.
                            </p>
                            <p className="text-[#4b5563] leading-relaxed text-lg mb-8">
                                But the truth is different. At its core, ethical sales is about understanding real needs,
                                offering honest solutions, and taking responsibility for the trust a customer places in you.
                                It is not about winning at any cost—it is about serving with integrity.
                            </p>

                            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 mt-10">
                                The Problem with Manipulation
                            </h2>
                            <p className="text-[#4b5563] leading-relaxed text-lg mb-6">
                                Manipulation in sales may produce short-term results, but it always fails in the long run.
                                Customers eventually realize when they have been misled. They lose trust, spread negative
                                feedback, and never return. The short-term gain becomes a long-term loss—for the salesperson,
                                the business, and the industry as a whole.
                            </p>
                            <p className="text-[#4b5563] leading-relaxed text-lg mb-8">
                                More importantly, manipulation harms the salesperson internally. When you build a career
                                on dishonesty, you cannot take pride in your work. You become disconnected from your
                                purpose and lose the motivation that comes from genuine service.
                            </p>

                            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 mt-10">
                                What Ethical Selling Looks Like
                            </h2>
                            <p className="text-[#4b5563] leading-relaxed text-lg mb-6">
                                Ethical selling begins with listening. Before offering any solution, a responsible
                                salesperson seeks to understand the customer's actual situation, challenges, and goals.
                                This requires patience, genuine curiosity, and the humility to admit when your product
                                is not the right fit.
                            </p>
                            <ul className="list-disc list-inside text-[#4b5563] leading-relaxed text-lg mb-8 space-y-3">
                                <li>Ask questions to understand the customer's real needs</li>
                                <li>Be honest about what your product or service can and cannot do</li>
                                <li>Never pressure someone into a decision they are not ready for</li>
                                <li>Follow up with genuine care, not just to close the sale</li>
                                <li>Accept "no" with grace and professionalism</li>
                            </ul>

                            {/* 4. Article Emphasis Block */}
                            <div className="bg-[#f0fdf4] border-l-4 border-[#059669] rounded-r-xl p-6 my-10">
                                <p className="text-[#1f2937] leading-relaxed text-lg italic">
                                    "Ethical sales is not about convincing people to buy. It is about helping people decide with clarity and trust."
                                </p>
                            </div>

                            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 mt-10">
                                Responsibility as the Foundation
                            </h2>
                            <p className="text-[#4b5563] leading-relaxed text-lg mb-6">
                                When you approach sales as a responsibility rather than a competition, everything changes.
                                You stop seeing customers as targets and start seeing them as people who deserve your
                                honesty. You stop measuring success by revenue alone and start measuring it by trust
                                and long-term relationships.
                            </p>
                            <p className="text-[#4b5563] leading-relaxed text-lg mb-6">
                                This mindset does not make you less effective—it makes you more sustainable. Businesses
                                built on trust grow slowly but steadily. They survive difficult times because their
                                customers remain loyal. And the professionals who practice ethical sales build
                                reputations that open doors throughout their careers.
                            </p>

                            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 mt-10">
                                Conclusion
                            </h2>
                            <p className="text-[#4b5563] leading-relaxed text-lg mb-6">
                                Sales is not manipulation. It is responsibility. The sooner we embrace this truth,
                                the sooner we can build a professional culture where honest work is valued, customers
                                are respected, and success is measured by the right standards.
                            </p>
                            <p className="text-[#4b5563] leading-relaxed text-lg">
                                If you are considering a career in sales or marketing, start with this foundation.
                                Learn the skills, but never lose sight of the ethics. The market rewards integrity
                                more than any shortcut ever could.
                            </p>
                        </div>
                    </article>
                </section>

                {/* 5. Author / Context Note */}
                <section className="w-full bg-[#f9fafb] py-10">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                        <div className="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-sm">
                            <p className="text-sm text-[#6b7280] leading-relaxed">
                                <span className="font-semibold text-[#1f2937]">About this article:</span> This article is part of an educational initiative focused on ethical sales, responsible marketing, and real-world professional skill development.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 6. Article Footer Navigation */}
                <section className="w-full bg-white py-12 md:py-16">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                        <div className="border-t border-[#e5e7eb] pt-8">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/blog"
                                    className="px-6 py-3 border-2 border-[#059669] text-[#059669] font-semibold rounded-full
                                        transition-all duration-200 ease-out
                                        hover:bg-[#f0fdf4]
                                        focus:outline-none focus:ring-2 focus:ring-[#059669] focus:ring-offset-2"
                                >
                                    ← Back to Blog
                                </Link>
                                <Link
                                    href="/modules"
                                    className="px-6 py-3 bg-[#059669] text-white font-semibold rounded-full
                                        transition-all duration-200 ease-out
                                        hover:bg-[#10b981] hover:shadow-lg
                                        focus:outline-none focus:ring-2 focus:ring-[#059669] focus:ring-offset-2"
                                >
                                    View Course Modules
                                </Link>
                            </div>
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
