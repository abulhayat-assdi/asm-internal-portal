import HeroSection from "@/components/ui/HeroSection";
import CourseOverview, { defaultIcons } from "@/components/ui/CourseOverview";
import LearningOutcomes from "@/components/ui/LearningOutcomes";
import TargetAudience, { defaultAudienceIcons } from "@/components/ui/TargetAudience";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function HomePage() {
    const navLinks = [
        { label: "Home", href: "/home", isActive: true },
        { label: "About the Course", href: "/about" },
        { label: "Course Modules", href: "/modules" },
        { label: "Instructors", href: "/instructors" },
        { label: "Student Feedback", href: "/feedback" },
        { label: "Contact", href: "/contact" },
        { label: "Blog", href: "/blog" },
    ];

    const highlights = [
        {
            icon: defaultIcons.sales,
            title: "Practical Sales Skills",
            description: "Learn proven sales techniques that work in real business and professional environments.",
        },
        {
            icon: defaultIcons.marketing,
            title: "Modern Marketing Foundations",
            description: "Understand branding, digital marketing, and customer psychology in today's market.",
        },
        {
            icon: defaultIcons.career,
            title: "Career-Focused Learning",
            description: "Develop skills that support job readiness, entrepreneurship, and long-term growth.",
        },
        {
            icon: defaultIcons.ethics,
            title: "Ethics & Responsibility",
            description: "Apply ethical principles and responsible practices in sales, marketing, and communication.",
        },
    ];

    const learningOutcomes = [
        "Build a strong foundation in sales and marketing principles",
        "Communicate ideas, value, and solutions with confidence",
        "Understand customer behavior and decision-making processes",
        "Apply ethical thinking in professional and business contexts",
        "Develop a structured approach to career and skill growth",
    ];

    const audiences = [
        {
            icon: defaultAudienceIcons.students,
            title: "Students",
            description: "Ideal for learners who want to build strong foundations before entering professional life.",
        },
        {
            icon: defaultAudienceIcons.jobSeekers,
            title: "Job Seekers",
            description: "For individuals preparing for careers that require communication, persuasion, and market understanding.",
        },
        {
            icon: defaultAudienceIcons.entrepreneurs,
            title: "Entrepreneurs",
            description: "For those who want to sell ideas, products, or services with confidence and structure.",
        },
        {
            icon: defaultAudienceIcons.ethicalLearners,
            title: "Ethical & Purpose-Driven Learners",
            description: "For people who value responsibility, integrity, and ethical practice in business and communication.",
        },
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
                <HeroSection
                    heading="The Art of Sales & Marketing"
                    subheading="A comprehensive training program combining practical sales skills, modern marketing strategies, and ethical principles."
                    primaryButtonText="Learn About the Course"
                    secondaryButtonText="View Modules"
                />

                <CourseOverview
                    title="What Is This Course About?"
                    subtitle="A structured learning program designed to build real-world sales and marketing skills with clarity, purpose, and ethical responsibility."
                    highlights={highlights}
                />

                <LearningOutcomes
                    title="What You Will Gain"
                    subtitle="Clear, practical outcomes that support skill development, confidence, and long-term professional growth."
                    outcomes={learningOutcomes}
                />

                <TargetAudience
                    title="Who This Course Is For"
                    subtitle="Designed for learners who want practical skills, clarity, and professional growth in sales and marketing."
                    audiences={audiences}
                />
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
