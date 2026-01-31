import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function BlogPage() {
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

    const categories = [
        "Sales Skills",
        "Marketing Fundamentals",
        "Ethical Business Practices",
        "Career Development",
        "Digital Tools & AI",
        "Communication Skills",
    ];

    const blogPosts = [
        {
            title: "Sales Is Not Manipulation — It Is Responsibility",
            excerpt: "Sales is often misunderstood as pressure or persuasion. In reality, ethical sales is about understanding real needs, offering honest solutions, and taking responsibility for the customer's trust.",
            category: "Sales Skills",
        },
        {
            title: "Why Practical Skills Matter More Than Theory in Marketing",
            excerpt: "Marketing is learned in the field, not only in classrooms. Real customers, real conversations, and real feedback shape skills that books alone cannot teach.",
            category: "Marketing Fundamentals",
        },
        {
            title: "Building a Career Through Skills, Not Shortcuts",
            excerpt: "Quick promises and shortcuts often fail in real life. Sustainable careers are built through patience, practice, and responsibility—especially in sales and marketing roles.",
            category: "Career Development",
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
                            Blog
                        </h1>
                        <p className="text-lg md:text-xl text-[#6b7280] max-w-2xl mx-auto">
                            Thoughtful articles on sales, marketing, ethics, and professional growth—focused on real-world learning and responsible practice.
                        </p>
                    </div>
                </section>

                {/* 2. Blog Introduction Section */}
                <section className="w-full bg-[#f9fafb] py-16 md:py-20">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1f2937] mb-6">
                            Learning Beyond the Classroom
                        </h2>
                        <div className="space-y-6 text-[#4b5563] leading-relaxed">
                            <p>
                                This blog shares practical insights on sales, marketing, communication, and career development—grounded in ethical responsibility and real-world experience.
                            </p>
                            <p>
                                Articles are written to help learners think clearly, act responsibly, and build skills that matter in professional and business life, without shortcuts or exaggerated promises.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3. Blog Categories / Topics Section */}
                <section className="w-full bg-white py-12 md:py-16">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-8">
                            <h2 className="text-xl md:text-2xl font-bold text-[#1f2937] mb-4">
                                Topics We Cover
                            </h2>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            {categories.map((category, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-[#f0fdf4] text-[#059669] text-sm font-medium rounded-full border border-[#dcfce7]"
                                >
                                    {category}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Blog Posts Grid Section */}
                <section className="w-full bg-[#f9fafb] py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#1f2937] mb-4">
                                Recent Articles
                            </h2>
                            <p className="text-[#6b7280] leading-relaxed">
                                Explore our latest posts on sales, marketing, and professional growth.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogPosts.map((post, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl overflow-hidden border border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow duration-200"
                                >
                                    {/* Image Placeholder */}
                                    <div className="w-full h-48 bg-[#f0fdf4] flex items-center justify-center">
                                        <svg
                                            className="w-12 h-12 text-[#059669] opacity-40"
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
                                    <div className="p-6">
                                        <span className="text-xs font-medium text-[#059669] uppercase tracking-wide">
                                            {post.category}
                                        </span>
                                        <h3 className="text-lg font-semibold text-[#1f2937] mt-2 mb-3 line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-[#6b7280] leading-relaxed line-clamp-3 mb-4">
                                            {post.excerpt}
                                        </p>
                                        <span className="text-sm font-medium text-[#059669]">
                                            Read Article →
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. Educational Note Section */}
                <section className="w-full bg-white py-12 md:py-16">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
                        <p className="text-[#6b7280] leading-relaxed">
                            This blog is part of an educational effort to promote honest communication, ethical earning, and responsible professional growth in sales and marketing.
                        </p>
                    </div>
                </section>

                {/* 6. Call To Action Section */}
                <section className="w-full bg-[#f0fdf4] py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                        <p className="text-lg md:text-xl text-[#1f2937] mb-6 max-w-2xl mx-auto">
                            Interested in structured learning beyond articles? Explore the full course and its practical modules.
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
