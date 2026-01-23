"use client";

import Card, { CardBody } from "@/components/ui/Card";
import NoticeCard from "@/components/ui/NoticeCard";
import Badge from "@/components/ui/Badge";
import { mockNotices, mockSchedule } from "@/lib/mockData";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Calculate statistics based on current date
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Count today's classes
    const todayClasses = mockSchedule.filter(schedule => schedule.date === todayStr).length;

    // Count completed classes this month
    const completedThisMonth = mockSchedule.filter(schedule => {
        const scheduleDate = new Date(schedule.date);
        return schedule.status === "Completed" &&
            scheduleDate.getMonth() === currentMonth &&
            scheduleDate.getFullYear() === currentYear;
    }).length;

    // Count pending classes this month
    const pendingThisMonth = mockSchedule.filter(schedule => {
        const scheduleDate = new Date(schedule.date);
        return schedule.status === "Pending" &&
            scheduleDate.getMonth() === currentMonth &&
            scheduleDate.getFullYear() === currentYear;
    }).length;

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
                            Abul Hayat
                        </h1>
                        <p className="text-white/90 mb-8 text-lg font-normal max-w-2xl mx-auto">
                            Comprehensive Portal for the Art of Sales & Marketing Course
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="glassmorphic-pill">
                                📅 {formatDateTime(currentTime)}
                            </div>
                            <div className="glassmorphic-pill">
                                🕐 {formatTime(currentTime)}
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
                                <p className="text-2xl font-bold text-[#1f2937]">{todayClasses}</p>
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
                                <p className="text-2xl font-bold text-[#1f2937]">{completedThisMonth}</p>
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
                                <p className="text-2xl font-bold text-[#1f2937]">{pendingThisMonth}</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Notice Board */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-[#1f2937] border-l-4 border-[#22c55e] pl-3">
                        Notice Board
                    </h2>
                    <Badge variant="default">
                        {mockNotices.length} Notices
                    </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockNotices.map((notice) => (
                        <NoticeCard key={notice.id} notice={notice} />
                    ))}
                </div>
            </div>

            <style jsx>{`
                .glassmorphic-pill {
                    background: rgba(255, 255, 255, 0.18);
                    backdrop-filter: blur(6px);
                    -webkit-backdrop-filter: blur(6px);
                    border-radius: 999px;
                    padding: 8px 14px;
                    font-size: 13px;
                    display: inline-block;
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
