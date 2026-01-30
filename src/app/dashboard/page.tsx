"use client";

import Card, { CardBody } from "@/components/ui/Card";
import NoticeCard from "@/components/ui/NoticeCard";
import Badge from "@/components/ui/Badge";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
    getAllClasses,
    getAllNotices,
    getTodayClassesCount,
    getCompletedClassesThisMonth,
    getPendingClassesThisMonth,
    addNotice,
    Class,
    Notice
} from "@/services/dashboardService";
import Button from "@/components/ui/Button";
import { serverTimestamp } from "firebase/firestore";

export default function DashboardPage() {
    const { userProfile } = useAuth();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [classes, setClasses] = useState<Class[]>([]);
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);

    // Add Notice State
    const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
    const [newNoticeTitle, setNewNoticeTitle] = useState("");
    const [newNoticeDescription, setNewNoticeDescription] = useState("");
    const [newNoticePriority, setNewNoticePriority] = useState<"high" | "medium" | "low">("medium");
    const [isAddingNotice, setIsAddingNotice] = useState(false);

    // Fetch data from Firestore
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [classesData, noticesData] = await Promise.all([
                    getAllClasses(),
                    getAllNotices()
                ]);
                setClasses(classesData);
                setNotices(noticesData);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Calculate statistics from real data
    const todayClasses = getTodayClassesCount(classes);
    const completedThisMonth = getCompletedClassesThisMonth(classes);
    const pendingThisMonth = getPendingClassesThisMonth(classes);

    const formatDateTime = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    };

    const handleAddNotice = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newNoticeTitle.trim() || !newNoticeDescription.trim()) return;

        setIsAddingNotice(true);
        try {
            const newNotice: Omit<Notice, "id"> = {
                title: newNoticeTitle,
                description: newNoticeDescription,
                priority: newNoticePriority,
                date: new Date().toISOString().split('T')[0],
                createdBy: userProfile?.uid,
                createdByName: userProfile?.displayName || "Unknown",
                createdAt: serverTimestamp()
            };

            await addNotice(newNotice);

            // Refresh notices
            const updatedNotices = await getAllNotices();
            setNotices(updatedNotices);

            // Close modal and reset form
            setIsNoticeModalOpen(false);
            setNewNoticeTitle("");
            setNewNoticeDescription("");
            setNewNoticePriority("medium");
        } catch (error) {
            console.error("Error adding notice:", error);
            alert("Failed to add notice. Please try again.");
        } finally {
            setIsAddingNotice(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Animated Hero Card */}
            <div className="relative rounded-[20px] overflow-hidden" style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
            }}>
                {/* Floating Circles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute w-[80px] h-[80px] rounded-full bg-white opacity-10 top-[10%] left-[15%] animate-floatY"></div>
                    <div className="absolute w-[120px] h-[120px] rounded-full bg-white opacity-8 top-[60%] right-[20%] animate-floatY" style={{ animationDelay: "2s" }}></div>
                    <div className="absolute w-[60px] h-[60px] rounded-full bg-white opacity-12 bottom-[20%] left-[70%] animate-floatY" style={{ animationDelay: "4s" }}></div>
                    <div className="absolute w-[40px] h-[40px] rounded-full bg-white opacity-15 top-[30%] right-[10%] animate-floatY" style={{ animationDelay: "1s" }}></div>
                </div>

                <CardBody className="py-16 relative z-10">
                    <div className="text-white text-center">
                        <p className="text-sm font-normal mb-2 opacity-90">Assalamu Alaikum,</p>
                        <h1 className="text-5xl font-bold mb-3">
                            {userProfile?.displayName || "User"}
                        </h1>
                        <p className="text-white/90 mb-8 text-lg font-normal max-w-2xl mx-auto">
                            Comprehensive Portal for the Art of Sales & Marketing Course
                        </p>
                        <div className="flex items-center justify-center gap-6 mt-8">
                            <div className="glassmorphic-pill flex items-center gap-3 px-6 py-3 min-w-[280px] justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 2.25h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V5.25a3 3 0 013-3h.75zM5.25 9h13.5v9.75a1.5 1.5 0 01-1.5 1.5H6.75a1.5 1.5 0 01-1.5-1.5V9zm1.5 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zm3 0a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zm3 0a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zm3 0a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zm-9 3a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zm3 0a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zm3 0a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zm3 0a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" clipRule="evenodd" />
                                </svg>
                                <span className="text-xl font-bold tracking-wide">
                                    {formatDateTime(currentTime)}
                                </span>
                            </div>
                            <div className="glassmorphic-pill flex items-center gap-3 px-6 py-3 min-w-[200px] justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                                </svg>
                                <span className="text-xl font-bold tracking-wide">
                                    {formatTime(currentTime)}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardBody>

                {/* Realistic Animated Wave SVG */}
                <div className="absolute bottom-0 left-0 right-0 w-full">
                    <svg className="w-full h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        {/* Wave Layer 1 - Lightest */}
                        <path
                            className="wave-path wave-1"
                            d="M0,160 C240,200 480,120 720,160 C960,200 1200,120 1440,160 L1440,160 C1680,200 1920,120 2160,160 C2400,200 2640,120 2880,160 L2880,320 L0,320 Z"
                            fill="rgba(248, 249, 250, 0.15)"
                        />

                        {/* Wave Layer 2 - Medium */}
                        <path
                            className="wave-path wave-2"
                            d="M0,180 C240,220 480,140 720,180 C960,220 1200,140 1440,180 L1440,180 C1680,220 1920,140 2160,180 C2400,220 2640,140 2880,180 L2880,320 L0,320 Z"
                            fill="rgba(248, 249, 250, 0.3)"
                        />

                        {/* Wave Layer 3 - Darkest/Solid */}
                        <path
                            className="wave-path wave-3"
                            d="M0,200 C240,240 480,160 720,200 C960,240 1200,160 1440,200 L1440,200 C1680,240 1920,160 2160,200 C2400,240 2640,160 2880,200 L2880,320 L0,320 Z"
                            fill="#f8f9fa"
                        />
                    </svg>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card hover className="shadow-soft">
                    <CardBody>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-[#d1fae5] flex items-center justify-center text-2xl">
                                📅
                            </div>
                            <div>
                                <p className="text-sm text-[#6b7280]">Today's Classes</p>
                                <p className="text-2xl font-bold text-[#1f2937]">
                                    {loading ? "..." : todayClasses}
                                </p>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card hover className="shadow-soft">
                    <CardBody>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-[#d1fae5] flex items-center justify-center text-2xl">
                                ✅
                            </div>
                            <div>
                                <p className="text-sm text-[#6b7280]">Completed Classes (This Month)</p>
                                <p className="text-2xl font-bold text-[#1f2937]">
                                    {loading ? "..." : completedThisMonth}
                                </p>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card hover className="shadow-soft">
                    <CardBody>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-[#d1fae5] flex items-center justify-center text-2xl">
                                📚
                            </div>
                            <div>
                                <p className="text-sm text-[#6b7280]">Pending Classes (This Month)</p>
                                <p className="text-2xl font-bold text-[#1f2937]">
                                    {loading ? "..." : pendingThisMonth}
                                </p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Notice Board */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-semibold text-[#1f2937] border-l-4 border-[#22c55e] pl-3">
                            Notice Board
                        </h2>
                        <Badge variant="default">
                            {loading ? "..." : `${notices.length} Notices`}
                        </Badge>
                    </div>

                    <Button
                        onClick={() => setIsNoticeModalOpen(true)}
                        size="sm"
                        className="bg-[#059669] hover:bg-[#047857] text-white"
                    >
                        + Add Notice
                    </Button>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#059669]"></div>
                        <p className="mt-4 text-[#6b7280]">Loading notices...</p>
                    </div>
                ) : notices.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-soft">
                        <p className="text-[#6b7280]">No notices available</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notices.map((notice) => (
                            <NoticeCard key={notice.id} notice={notice} />
                        ))}
                    </div>
                )}
            </div>

            {/* Add Notice Modal */}
            {isNoticeModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900">Add New Notice</h3>
                            <button
                                onClick={() => setIsNoticeModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleAddNotice} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={newNoticeTitle}
                                    onChange={(e) => setNewNoticeTitle(e.target.value)}
                                    placeholder="Enter notice title"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#059669] focus:border-[#059669] outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={newNoticeDescription}
                                    onChange={(e) => setNewNoticeDescription(e.target.value)}
                                    placeholder="Enter notice details..."
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#059669] focus:border-[#059669] outline-none transition-all resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                <div className="flex gap-4">
                                    {(['low', 'medium', 'high'] as const).map((priority) => (
                                        <label key={priority} className="flex items-center cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="priority"
                                                value={priority}
                                                checked={newNoticePriority === priority}
                                                onChange={() => setNewNoticePriority(priority)}
                                                className="sr-only"
                                            />
                                            <div className={`
                                                px-4 py-2 rounded-lg text-sm font-medium capitalize border transition-all
                                                ${newNoticePriority === priority
                                                    ? priority === 'high' ? 'bg-red-50 border-red-200 text-red-700'
                                                        : priority === 'medium' ? 'bg-yellow-50 border-yellow-200 text-yellow-700'
                                                            : 'bg-green-50 border-green-200 text-green-700'
                                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}
                                            `}>
                                                {priority}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => setIsNoticeModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isAddingNotice}
                                    className="w-full bg-[#059669] hover:bg-[#047857] text-white"
                                >
                                    {isAddingNotice ? "Adding..." : "Post Notice"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
                .glassmorphic-pill {
                    background: rgba(255, 255, 255, 0.18);
                    backdrop-filter: blur(6px);
                    -webkit-backdrop-filter: blur(6px);
                    border-radius: 999px;
                }

                .shadow-soft {
                    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
                }

                @keyframes floatY {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                .animate-floatY {
                    animation: floatY 6s ease-in-out infinite;
                }

                /* Realistic Wave Animation */
                @keyframes wave {
                    0% {
                        transform: translateX(0) translateZ(0) scaleY(1);
                    }
                    50% {
                        transform: translateX(-25%) translateZ(0) scaleY(1.1);
                    }
                    100% {
                        transform: translateX(-50%) translateZ(0) scaleY(1);
                    }
                }

                .wave-path {
                    animation: wave 20s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
                }

                .wave-1 {
                    animation-duration: 25s;
                }

                .wave-2 {
                    animation-duration: 20s;
                    animation-delay: -5s;
                }

                .wave-3 {
                    animation-duration: 15s;
                    animation-delay: -2s;
                }
            `}</style>
        </div>
    );
}
