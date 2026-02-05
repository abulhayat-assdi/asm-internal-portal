/**
 * Mock AI Service
 * Simulates an AI backend for the FAQ section.
 * Returns realistic-sounding responses based on keyword matching.
 */

export async function generateAIResponse(query: string): Promise<string> {
    const lowerQuery = query.toLowerCase();

    // Simulate network delay (1-2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Keyword-based responses
    if (lowerQuery.includes("price") || lowerQuery.includes("cost") || lowerQuery.includes("fee")) {
        return "The full Sales & Marketing course is currently priced at 5,000 BDT. We also offer scholarship opportunities for eligible students. The fee includes lifetime access to all course materials and community support.";
    }

    if (lowerQuery.includes("duration") || lowerQuery.includes("long") || lowerQuery.includes("time")) {
        return "The course is designed to be completed in 12 weeks. It features 24 modules, with 2 classes per week. However, since you get lifetime access, you can also learn at your own pace.";
    }

    if (lowerQuery.includes("beginner") || lowerQuery.includes("start") || lowerQuery.includes("experience")) {
        return "Yes! This course is suitable for beginners. We start from the absolute fundamentals of sales and marketing and gradually build up to advanced strategies. No prior experience is required.";
    }

    if (lowerQuery.includes("certificate") || lowerQuery.includes("certification")) {
        return "Upon successful completion of the course and final project, you will receive an official certification from the As-Sunnah Skill Development Institute, which you can showcase on your CV and LinkedIn profile.";
    }

    if (lowerQuery.includes("refund") || lowerQuery.includes("money back")) {
        return "We have a 7-day refund policy. If you find the course isn't the right fit for you within the first week of enrollment, you can request a full refund, no questions asked.";
    }

    if (lowerQuery.includes("who") && lowerQuery.includes("instructor")) {
        return "The course is led by industry experts with over 10 years of experience in Sales & Marketing. Our lead instructor has worked with top multinational companies and has trained over 500+ professionals.";
    }

    // Generic fallback response
    return "That's a great question! This course covers a comprehensive curriculum including lead generation, digital marketing strategies, sales psychology, and CRM tools. For more specific details, I recommend checking our 'Modules' page or downloading the course brochure.";
}

/**
 * ==============================================================================
 * 👇 আপনার আসল API কানেক্ট করতে চাইলে নিচের কোডটুকু ব্যবহার করুন (বাংলা গাইড) 👇
 * ==============================================================================
 * 
 * ১. উপরের `generateAIResponse` ফাংশনটি পুরোটা মুছে ফেলুন বা কমেন্ট করে দিন।
 * ২. নিচের ফাংশনটির কমেন্ট (//) তুলে দিন।
 * ৩. `API_URL` এর জায়গায় আপনার ব্যাকএন্ডের লিংক বসান।
 */

/*
export async function generateAIResponse(query: string): Promise<string> {
    try {
        // ১. আপনার API লিংক এখানে দিন (অথবা .env.local ফাইলে সেট করুন)
        const API_URL = process.env.NEXT_PUBLIC_AI_API_URL || "https://your-api.com/api/chat";

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${process.env.NEXT_PUBLIC_AI_API_KEY}` // যদি Key লাগে
            },
            body: JSON.stringify({
                message: query // আপনার API যদি অন্য নাম চায় (যেমন prompt), তবে এটি বদলান
            }),
        });

        if (!response.ok) throw new Error("API Error");

        const data = await response.json();
        
        // ২. আপনার API এর উত্তরটি এখান থেকে রিটার্ন করুন
        return data.reply || data.response || "No answer found";

    } catch (error) {
        console.error("Connection Error:", error);
        return "সার্ভারে সমস্যা হচ্ছে, অনুগ্রহ করে পরে আবার চেষ্টা করুন।";
    }
}
*/

