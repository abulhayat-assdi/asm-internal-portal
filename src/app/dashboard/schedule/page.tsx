"use client";

import { useState } from "react";
import Card, { CardBody } from "@/components/ui/Card";
import { formatDateShort } from "@/lib/utils";

// Full month of class schedule data (January 2026)
const initialScheduleData = [
    { id: "CS001", date: "2026-01-02", day: "Thursday", batch: "HSC 2026 - Science A", subject: "Physics", time: "10:00 AM - 11:30 AM", status: "Completed" as const },
    { id: "CS002", date: "2026-01-02", day: "Thursday", batch: "SSC 2026 - A", subject: "Mathematics", time: "12:00 PM - 01:30 PM", status: "Completed" as const },
    { id: "CS003", date: "2026-01-03", day: "Friday", batch: "HSC 2026 - Commerce", subject: "Accounting", time: "02:00 PM - 03:30 PM", status: "Completed" as const },
    { id: "CS004", date: "2026-01-05", day: "Sunday", batch: "HSC 2026 - Science B", subject: "Chemistry", time: "10:00 AM - 11:30 AM", status: "Completed" as const },
    { id: "CS005", date: "2026-01-20", day: "Monday", batch: "SSC 2026 - B", subject: "English", time: "09:00 AM - 10:30 AM", status: "Completed" as const },
    { id: "CS006", date: "2026-01-21", day: "Tuesday", batch: "HSC 2026 - Science A", subject: "Biology", time: "11:00 AM - 12:30 PM", status: "Completed" as const },
    { id: "CS021", date: "2026-01-23", day: "Thursday", batch: "SSC 2026 - B", subject: "English", time: "09:00 AM - 10:30 AM", status: "Today" as const },
    { id: "CS022", date: "2026-01-23", day: "Thursday", batch: "HSC 2026 - Science B", subject: "Chemistry", time: "11:00 AM - 12:30 PM", status: "Today" as const },
    { id: "CS023", date: "2026-01-23", day: "Thursday", batch: "HSC 2026 - Commerce", subject: "Economics", time: "01:00 PM - 02:30 PM", status: "Today" as const },
    { id: "CS024", date: "2026-01-24", day: "Friday", batch: "SSC 2026 - A", subject: "Mathematics", time: "10:00 AM - 11:30 AM", status: "Upcoming" as const },
    { id: "CS025", date: "2026-01-26", day: "Sunday", batch: "HSC 2026 - Science A", subject: "Biology", time: "09:00 AM - 10:30 AM", status: "Upcoming" as const },
    { id: "CS026", date: "2026-01-27", day: "Monday", batch: "SSC 2026 - B", subject: "Science", time: "11:00 AM - 12:30 PM", status: "Upcoming" as const },
    { id: "CS027", date: "2026-01-28", day: "Tuesday", batch: "HSC 2026 - Science A", subject: "Physics", time: "02:00 PM - 03:30 PM", status: "Upcoming" as const },
    { id: "CS028", date: "2026-01-29", day: "Wednesday", batch: "HSC 2026 - Commerce", subject: "Accounting", time: "10:00 AM - 11:30 AM", status: "Upcoming" as const },
    { id: "CS029", date: "2026-01-30", day: "Thursday", batch: "SSC 2026 - A", subject: "English", time: "09:00 AM - 10:30 AM", status: "Upcoming" as const },
    { id: "CS030", date: "2026-01-31", day: "Friday", batch: "HSC 2026 - Science B", subject: "Chemistry", time: "11:00 AM - 12:30 PM", status: "Upcoming" as const },
    { id: "CS031", date: "2026-01-22", day: "Wednesday", batch: "SSC 2026 - A", subject: "ICT", time: "02:00 PM - 03:30 PM", status: "Pending" as const },
];

type ScheduleStatus = "Completed" | "Today" | "Upcoming" | "Pending" | "RequestToComplete";

interface Schedule {
    id: string;
    date: string;
    day: string;
    batch: string;
    subject: string;
    time: string;
    status: ScheduleStatus;
}

export default function SchedulePage() {
    const [scheduleData, setScheduleData] = useState<Schedule[]>(initialScheduleData);
    const [showAll, setShowAll] = useState(false);
    const [expandedPending, setExpandedPending] = useState<string | null>(null);

    const today = "2026-01-23"; // Current date

    // Filter out completed classes (past dates that are completed)
    const visibleSchedule = scheduleData.filter(schedule => {
        if (schedule.status === "Completed" && schedule.date < today) {
            return false; // Hide old completed classes
        }
        return true;
    });

    const displayedSchedule = showAll ? visibleSchedule : visibleSchedule.slice(0, 5);

    const handleDoneClick = (id: string) => {
        setScheduleData(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, status: "Completed" as const } : item
            )
        );
    };

    const handleRequestToComplete = (id: string) => {
        setScheduleData(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, status: "RequestToComplete" as const } : item
            )
        );
        setExpandedPending(null);
        // In real app, this would send request to backend/admin
    };

    const getStatusBadge = (schedule: Schedule) => {
        if (schedule.status === "Today") {
            return (
                <button
                    onClick={() => handleDoneClick(schedule.id)}
                    className="px-4 py-1.5 bg-[#059669] text-white text-sm font-medium rounded-full hover:bg-[#10b981] transition-colors"
                >
                    Done
                </button>
            );
        }

        if (schedule.status === "Pending") {
            return (
                <div className="inline-block relative">
                    {/* Show Request Button Above when expanded */}
                    {expandedPending === schedule.id && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 animate-fadeIn">
                            <button
                                onClick={() => handleRequestToComplete(schedule.id)}
                                className="px-4 py-2 bg-[#059669] text-white text-sm font-semibold rounded-lg hover:bg-[#10b981] transition-colors whitespace-nowrap shadow-md"
                            >
                                Request to Complete
                            </button>
                        </div>
                    )}

                    {/* Pending Pill with Arrow */}
                    <button
                        onClick={() => setExpandedPending(expandedPending === schedule.id ? null : schedule.id)}
                        className="px-4 py-1.5 bg-[#f59e0b] text-white text-sm font-medium rounded-full hover:bg-[#fb923c] transition-colors inline-flex items-center gap-2"
                    >
                        Pending
                        <svg
                            className={`w-3 h-3 transition-transform ${expandedPending === schedule.id ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            );
        }

        if (schedule.status === "RequestToComplete") {
            return (
                <span className="px-4 py-1.5 bg-[#3b82f6] text-white text-sm font-medium rounded-full inline-flex items-center gap-1">
                    Request to Complete
                    <svg className="w-3 h-3 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                </span>
            );
        }

        if (schedule.status === "Completed") {
            return (
                <span className="px-4 py-1.5 bg-[#10b981] text-white text-sm font-medium rounded-full">
                    Completed
                </span>
            );
        }

        // Upcoming
        return (
            <span className="px-4 py-1.5 bg-[#6b7280] text-white text-sm font-medium rounded-full">
                Upcoming
            </span>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header with Green Accent */}
            <div className="flex items-center gap-3">
                <div className="w-1 h-10 bg-[#059669] rounded-full"></div>
                <div>
                    <h1 className="text-3xl font-bold text-[#1f2937]">
                        Class Schedule
                    </h1>
                    <p className="text-[#6b7280] mt-1">
                        Manage your monthly class schedule
                    </p>
                </div>
            </div>

            {/* Schedule Table */}
            <Card>
                <CardBody className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#1e3a5f]">
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278]">
                                        Date
                                    </th>
                                    <th className="hidden md:table-cell px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278]">
                                        Day
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278]">
                                        Batch
                                    </th>
                                    <th className="hidden md:table-cell px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278]">
                                        Subject
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278]">
                                        Time
                                    </th>
                                    <th className="hidden md:table-cell px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278]">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedSchedule.map((schedule, index) => (
                                    <tr
                                        key={schedule.id}
                                        className={schedule.status === "Today" ? "bg-[#d1fae5]/30" : index % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}
                                    >
                                        <td className="px-6 py-4 text-sm text-[#1f2937] font-medium border border-[#e5e7eb] text-center">
                                            {formatDateShort(schedule.date)}
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4 text-sm text-[#1f2937] border border-[#e5e7eb] text-center">
                                            {schedule.day}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#1f2937] font-medium border border-[#e5e7eb] text-center">
                                            {schedule.batch}
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4 text-sm text-[#1f2937] border border-[#e5e7eb] text-center">
                                            {schedule.subject}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#374151] border border-[#e5e7eb] text-center">
                                            {schedule.time}
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4 border border-[#e5e7eb] text-center">
                                            {getStatusBadge(schedule)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>

            {/* See More / See Less Button */}
            {visibleSchedule.length > 5 && (
                <div className="flex justify-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-8 py-3 bg-[#059669] text-white font-semibold rounded-lg hover:bg-[#10b981] transition-colors text-base shadow-sm"
                    >
                        {showAll ? "See Less ↑" : `See More (${visibleSchedule.length - 5} more classes) →`}
                    </button>
                </div>
            )}

            {/* Class Routine Section */}
            <div className="mt-12">
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-10 bg-[#059669] rounded-full"></div>
                    <div>
                        <h2 className="text-3xl font-bold text-[#1f2937]">
                            Class Routine
                        </h2>
                        <p className="text-[#6b7280] mt-1">
                            View full class routine
                        </p>
                    </div>
                </div>

                {/* Routine Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Routine Card 1 */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardBody className="p-6">
                            {/* Title */}
                            <h3 className="text-base font-semibold text-[#1f2937] mb-3">
                                Batch 07 – Full Class Routine
                            </h3>

                            {/* Meta Information */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    <span>Uploaded by: Abul Hayat</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    <span>Date: 15/01/2026</span>
                                </div>
                            </div>

                            {/* View Button */}
                            <button className="w-full px-4 py-3 bg-[#059669] text-white font-semibold rounded-lg hover:bg-[#10b981] transition-colors">
                                View / Download
                            </button>
                        </CardBody>
                    </Card>

                    {/* Routine Card 2 */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardBody className="p-6">
                            {/* Title */}
                            <h3 className="text-base font-semibold text-[#1f2937] mb-3">
                                Batch 08 – Weekly Schedule
                            </h3>

                            {/* Meta Information */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    <span>Uploaded by: Karim Uddin</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    <span>Date: 10/01/2026</span>
                                </div>
                            </div>

                            {/* View Button */}
                            <button className="w-full px-4 py-3 bg-[#059669] text-white font-semibold rounded-lg hover:bg-[#10b981] transition-colors">
                                View / Download
                            </button>
                        </CardBody>
                    </Card>

                    {/* Routine Card 3 */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardBody className="p-6">
                            {/* Title */}
                            <h3 className="text-base font-semibold text-[#1f2937] mb-3">
                                January 2026 - Monthly Routine
                            </h3>

                            {/* Meta Information */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    <span>Uploaded by: Admin</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    <span>Date: 01/01/2026</span>
                                </div>
                            </div>

                            {/* View Button */}
                            <button className="w-full px-4 py-3 bg-[#059669] text-white font-semibold rounded-lg hover:bg-[#10b981] transition-colors">
                                View / Download
                            </button>
                        </CardBody>
                    </Card>
                </div>
            </div>

            {/* Subject-wise Class Count Section */}
            <div className="mt-12">
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-10 bg-[#059669] rounded-full"></div>
                    <div>
                        <h2 className="text-3xl font-bold text-[#1f2937]">
                            Subject-wise Class Count
                        </h2>
                        <p className="text-[#6b7280] mt-1">
                            Track classes taken per subject for each batch
                        </p>
                    </div>
                </div>

                {/* Batch 06 Table */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-[#1f2937] mb-3">Batch 06</h3>
                    <Card>
                        <CardBody className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-[#1e3a5f]">
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278] w-20">
                                                #
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278]">
                                                Subject Name
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278] w-48">
                                                Classes Taken
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white">
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-medium border border-[#e5e7eb] text-center">1</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] border border-[#e5e7eb]">Physics</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-semibold border border-[#e5e7eb] text-center">24</td>
                                        </tr>
                                        <tr className="bg-[#f9fafb]">
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-medium border border-[#e5e7eb] text-center">2</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] border border-[#e5e7eb]">Chemistry</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-semibold border border-[#e5e7eb] text-center">22</td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-medium border border-[#e5e7eb] text-center">3</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] border border-[#e5e7eb]">Mathematics</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-semibold border border-[#e5e7eb] text-center">26</td>
                                        </tr>
                                        <tr className="bg-[#f9fafb]">
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-medium border border-[#e5e7eb] text-center">4</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] border border-[#e5e7eb]">Biology</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-semibold border border-[#e5e7eb] text-center">20</td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-medium border border-[#e5e7eb] text-center">5</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] border border-[#e5e7eb]">English</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-semibold border border-[#e5e7eb] text-center">18</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Batch 07 Table */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-[#1f2937] mb-3">Batch 07</h3>
                    <Card>
                        <CardBody className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-[#1e3a5f]">
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278] w-20">
                                                #
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278]">
                                                Subject Name
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278] w-48">
                                                Classes Taken
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white">
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-medium border border-[#e5e7eb] text-center">1</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] border border-[#e5e7eb]">Accounting</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-semibold border border-[#e5e7eb] text-center">28</td>
                                        </tr>
                                        <tr className="bg-[#f9fafb]">
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-medium border border-[#e5e7eb] text-center">2</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] border border-[#e5e7eb]">Economics</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-semibold border border-[#e5e7eb] text-center">25</td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-medium border border-[#e5e7eb] text-center">3</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] border border-[#e5e7eb]">Business Studies</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-semibold border border-[#e5e7eb] text-center">23</td>
                                        </tr>
                                        <tr className="bg-[#f9fafb]">
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-medium border border-[#e5e7eb] text-center">4</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] border border-[#e5e7eb]">Mathematics</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-semibold border border-[#e5e7eb] text-center">22</td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-medium border border-[#e5e7eb] text-center">5</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] border border-[#e5e7eb]">English</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-semibold border border-[#e5e7eb] text-center">20</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Batch 08 Table */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-[#1f2937] mb-3">Batch 08</h3>
                    <Card>
                        <CardBody className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-[#1e3a5f]">
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278] w-20">
                                                #
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278]">
                                                Subject Name
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278] w-48">
                                                Classes Taken
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white">
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-medium border border-[#e5e7eb] text-center">1</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] border border-[#e5e7eb]">Bangla</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-semibold border border-[#e5e7eb] text-center">30</td>
                                        </tr>
                                        <tr className="bg-[#f9fafb]">
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-medium border border-[#e5e7eb] text-center">2</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] border border-[#e5e7eb]">History</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-semibold border border-[#e5e7eb] text-center">27</td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-medium border border-[#e5e7eb] text-center">3</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] border border-[#e5e7eb]">Islamic Studies</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-semibold border border-[#e5e7eb] text-center">24</td>
                                        </tr>
                                        <tr className="bg-[#f9fafb]">
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-medium border border-[#e5e7eb] text-center">4</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] border border-[#e5e7eb]">Social Science</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-semibold border border-[#e5e7eb] text-center">21</td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-medium border border-[#e5e7eb] text-center">5</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] border border-[#e5e7eb]">English</td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-semibold border border-[#e5e7eb] text-center">19</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>

            {/* Animation Styles */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-5px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
            `}</style>
        </div>
    );
}
