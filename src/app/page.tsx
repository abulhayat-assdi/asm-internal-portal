"use client";

import HeroSection from "@/components/ui/HeroSection";

import LearningOutcomes from "@/components/ui/LearningOutcomes";
import TargetAudience, { defaultAudienceIcons } from "@/components/ui/TargetAudience";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    const navLinks = [
        { label: "Home", href: "/", isActive: true },
        { label: "About", href: "/about" },
        { label: "Module", href: "/modules" },
        { label: "Instructors", href: "/instructors" },
        { label: "Success Stories", href: "/feedback" },
        { label: "Contact & Q&A", href: "/contact" },
        { label: "Blog", href: "/blog" },
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
                onCtaClick={() => router.push('/enroll')}
                onBrandClick={() => router.push('/')}
                transparent={true}
            />
            <main className="min-h-screen bg-white">
                <HeroSection
                    heading="The Art of Sales & Marketing"
                    subheading="A comprehensive training program combining practical sales skills, modern marketing strategies, and ethical principles."
                    primaryButtonText="Learn About the Course"
                    secondaryButtonText="View Modules"
                    onPrimaryClick={() => router.push('/about')}
                    onSecondaryClick={() => router.push('/modules')}
                />



                <TargetAudience
                    title="Who This Course Is For"
                    subtitle="Designed for learners who want practical skills, clarity, and professional growth in sales and marketing."
                    audiences={audiences}
                />

                <LearningOutcomes
                    title="What You Will Gain"
                    subtitle="Clear, practical outcomes that support skill development, confidence, and long-term professional growth."
                    outcomes={learningOutcomes}
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
