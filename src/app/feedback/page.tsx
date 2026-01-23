"use client";

import { useState } from "react";

export default function PublicFeedbackPage() {
    const [batchName, setBatchName] = useState("");
    const [feedback, setFeedback] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // In real implementation, this would send to backend
        console.log("Feedback submitted:", { batchName, feedback, status: "Pending" });

        setIsSubmitted(true);
        setBatchName("");
        setFeedback("");

        // Reset success message after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#d1fae5] to-[#a7f3d0] flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {/* Card Container */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Green Header */}
                    <div className="bg-gradient-to-r from-[#059669] to-[#10b981] px-8 py-12 text-center">
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Student Feedback Portal
                        </h1>
                        <p className="text-xl text-white/90">
                            The Art of Sales & Marketing
                        </p>
                    </div>

                    {/* White Content Area */}
                    <div className="p-8">
                        {/* Anonymous Info Box */}
                        <div className="bg-[#dbeafe] border-l-4 border-[#3b82f6] p-4 mb-6 rounded">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-[#3b82f6] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <p className="text-[#1e40af] font-semibold">
                                        Anonymous Feedback: <span className="font-normal">Your identity will remain confidential.</span>
                                    </p>
                                    <p className="text-[#1e40af] text-sm mt-1">
                                        Share your honest thoughts!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Success Message */}
                        {isSubmitted && (
                            <div className="bg-[#d1fae5] border-l-4 border-[#059669] p-4 mb-6 rounded">
                                <p className="text-[#059669] font-semibold">
                                    ✓ Feedback submitted successfully! It will be reviewed by admin.
                                </p>
                            </div>
                        )}

                        {/* Feedback Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Batch Name Field */}
                            <div>
                                <label className="flex items-center gap-2 text-[#1f2937] font-semibold mb-3">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                    </svg>
                                    Your Batch Name
                                </label>
                                <select
                                    required
                                    value={batchName}
                                    onChange={(e) => setBatchName(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent text-[#1f2937] bg-white"
                                >
                                    <option value="" disabled>Select your batch...</option>
                                    <option value="Batch_01">Batch_01</option>
                                    <option value="Batch_02">Batch_02</option>
                                    <option value="Batch_03">Batch_03</option>
                                    <option value="Batch_04">Batch_04</option>
                                    <option value="Batch_05">Batch_05</option>
                                    <option value="Batch_06">Batch_06</option>
                                    <option value="Batch_07">Batch_07</option>
                                    <option value="Batch_08">Batch_08</option>
                                    <option value="Batch_09">Batch_09</option>
                                    <option value="Batch_10">Batch_10</option>
                                </select>
                                <p className="text-sm text-[#6b7280] mt-2">
                                    Select your batch from the list
                                </p>
                            </div>

                            {/* Feedback Textarea */}
                            <div>
                                <label className="flex items-center gap-2 text-[#1f2937] font-semibold mb-3">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    Your Feedback / Suggestion
                                </label>
                                <textarea
                                    required
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Share your thoughts about classes, teachers, facilities, or any suggestions..."
                                    rows={6}
                                    className="w-full px-4 py-3 border-2 border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent text-[#1f2937] resize-none"
                                />
                                <p className="text-sm text-[#6b7280] mt-2 text-right">
                                    {feedback.length} characters
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#059669] to-[#10b981] text-white font-bold py-4 px-6 rounded-xl hover:from-[#047857] hover:to-[#059669] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                                Submit Feedback
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="text-center text-[#059669] mt-6 text-sm">
                    Your feedback helps us improve. Thank you for sharing!
                </p>
            </div>
        </div>
    );
}
