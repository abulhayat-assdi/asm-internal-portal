"use client";

import { useState } from "react";
import Card, { CardBody } from "@/components/ui/Card";

// Feedback interface
interface Feedback {
    id: string;
    batchName: string;
    message: string;
    submittedDate: string;
    status: "Approved" | "Pending";
}

// Mock feedback data
const initialFeedback: Feedback[] = [
    {
        id: "F001",
        batchName: "Batch_06",
        message: "The teaching quality is excellent. Teachers are very supportive and explain concepts clearly. Would love to see more practical examples in class.",
        submittedDate: "2026-01-23 14:30",
        status: "Approved",
    },
    {
        id: "F002",
        batchName: "Batch_07",
        message: "Great learning environment. The class schedule is well organized. Suggestion: Add more interactive sessions and group discussions.",
        submittedDate: "2026-01-22 10:15",
        status: "Approved",
    },
    {
        id: "F003",
        batchName: "Batch_08",
        message: "Really enjoying the course content. Teachers are knowledgeable and approachable. Could we have more practice assignments?",
        submittedDate: "2026-01-21 16:45",
        status: "Pending",
    },
    {
        id: "F004",
        batchName: "Batch_06",
        message: "The facilities are good but could be improved. More study materials would be helpful. Overall satisfied with the teaching.",
        submittedDate: "2026-01-20 09:20",
        status: "Approved",
    },
    {
        id: "F005",
        batchName: "Batch_07",
        message: "Excellent course structure. Would appreciate if we could have weekend doubt-clearing sessions. Teachers are doing a great job!",
        submittedDate: "2026-01-19 11:30",
        status: "Pending",
    },
];

export default function FeedbackPage() {
    const [feedbackList, setFeedbackList] = useState<Feedback[]>(initialFeedback);
    const [isAdmin] = useState(true); // In real app, this would come from auth context

    // Filter feedback based on role
    const visibleFeedback = isAdmin
        ? feedbackList
        : feedbackList.filter(f => f.status === "Approved");

    const handleApprove = (id: string) => {
        setFeedbackList(prev =>
            prev.map(f => f.id === id ? { ...f, status: "Approved" as const } : f)
        );
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this feedback?")) {
            setFeedbackList(prev => prev.filter(f => f.id !== id));
        }
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-center gap-3">
                <div className="w-1 h-10 bg-[#059669] rounded-full"></div>
                <div>
                    <h1 className="text-3xl font-bold text-[#1f2937]">
                        Feedback & Suggestions
                    </h1>
                    <p className="text-[#6b7280] mt-1">
                        View student feedback and suggestions
                    </p>
                </div>
            </div>

            {/* Student Feedback Form Link (Info Box) */}
            <div className="bg-[#d1fae5] border-l-4 border-[#059669] p-4 rounded-lg">
                <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#059669] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                        <p className="text-[#059669] font-semibold mb-1">
                            Student Feedback Form Link:
                        </p>
                        <p className="text-[#047857] text-sm mb-2">
                            Share this link with students to collect feedback
                        </p>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                readOnly
                                value="https://portal.google.com/feedback"
                                className="flex-1 px-3 py-2 bg-white border border-[#059669] rounded text-sm text-[#1f2937]"
                            />
                            <button className="px-4 py-2 bg-[#059669] text-white text-sm font-medium rounded hover:bg-[#10b981] transition-colors">
                                📋 Copy
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-[#1f2937]">
                        {isAdmin ? "All Feedback" : "Approved Feedback"}
                    </h2>
                    <span className="text-sm text-[#6b7280]">
                        {visibleFeedback.length} feedback{visibleFeedback.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {visibleFeedback.length > 0 ? (
                    <div className="space-y-4">
                        {visibleFeedback.map((feedback) => (
                            <Card key={feedback.id} className="hover:shadow-lg transition-shadow">
                                <CardBody className="p-6">
                                    <div className="flex items-start gap-4">
                                        {/* Quote Icon */}
                                        <div className="flex-shrink-0">
                                            <svg className="w-8 h-8 text-[#d1d5db]" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                            </svg>
                                        </div>

                                        {/* Feedback Content */}
                                        <div className="flex-1">
                                            {/* Header with Batch and Date */}
                                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                                                <span className="px-3 py-1 bg-[#059669] text-white text-sm font-semibold rounded-full">
                                                    {feedback.batchName}
                                                </span>
                                                <span className="text-sm text-[#6b7280]">
                                                    📅 {feedback.submittedDate}
                                                </span>
                                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${feedback.status === "Approved"
                                                        ? "bg-[#d1fae5] text-[#059669]"
                                                        : "bg-[#fed7aa] text-[#c2410c]"
                                                    }`}>
                                                    {feedback.status}
                                                </span>
                                            </div>

                                            {/* Feedback Message */}
                                            <p className="text-[#1f2937] leading-relaxed mb-4">
                                                {feedback.message}
                                            </p>

                                            {/* Admin Controls */}
                                            {isAdmin && (
                                                <div className="flex items-center gap-3">
                                                    {feedback.status === "Pending" && (
                                                        <button
                                                            onClick={() => handleApprove(feedback.id)}
                                                            className="px-4 py-2 bg-[#059669] text-white text-sm font-semibold rounded-lg hover:bg-[#10b981] transition-colors"
                                                        >
                                                            ✓ Approve
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(feedback.id)}
                                                        className="px-4 py-2 bg-red-50 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-100 transition-colors"
                                                    >
                                                        🗑️ Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <svg className="w-16 h-16 mx-auto text-[#d1d5db] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <p className="text-[#6b7280] text-lg">
                            No feedback available yet
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
