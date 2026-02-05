import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { blogPosts } from "@/data/blogData";
import BlogList from "@/components/blog/BlogList";

export default function BlogPage() {
    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Module", href: "/modules" },
        { label: "Instructors", href: "/instructors" },
        { label: "Success Stories", href: "/feedback" },
        { label: "Contact & Q&A", href: "/contact" },
        { label: "Blog", href: "/blog", isActive: true },
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

    return (
        <>
            <Header
                brandText="Sales & Marketing"
                navLinks={navLinks}
                ctaText="Enroll"
            />

            <main className="min-h-screen bg-white">
                {/* 1. Page Header Section */}
                <section className="w-full bg-white py-10 md:py-12">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1f2937] mb-4">
                            Blog
                        </h1>
                        <p className="text-lg md:text-xl text-[#6b7280] max-w-2xl mx-auto">
                            Thoughtful articles on sales, marketing, ethics, and professional growth—focused on real-world learning and responsible practice.
                        </p>
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

                        <BlogList posts={blogPosts} />
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
