"use client";

import { useState, useEffect } from "react";
import Card, { CardBody } from "@/components/ui/Card";
import { formatDateShort } from "@/lib/utils";
import { getClassesByTeacherId, requestClassCompletion, ClassSchedule } from "@/services/scheduleService";
import { useAuth } from "@/contexts/AuthContext";
import { getClassRoutines, ClassRoutine } from "@/services/routinesService";

export default function SchedulePage() {
    const [scheduleData, setScheduleData] = useState<ClassSchedule[]>([]);
    const [routines, setRoutines] = useState<ClassRoutine[]>([]);
    // Batch Stats State
    const [batchStats, setBatchStats] = useState<Record<string, { subjectName: string; classCount: number }[]>>({});
    const [batchStatsLoading, setBatchStatsLoading] = useState(true);

    const [loading, setLoading] = useState(true);
    const [routinesLoading, setRoutinesLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);
    const [expandedPending, setExpandedPending] = useState<string | null>(null);
    const { userProfile, loading: authLoading } = useAuth();
    const [processingId, setProcessingId] = useState<string | null>(null);

    // We can rely on service logic for "Today" so no need to calculate date strictly here 
    const today = new Date().toISOString().split('T')[0];

    // Fetch Class Schedule (Google Sheet)
    useEffect(() => {
        const fetchSchedule = async () => {
            if (authLoading) return; // Wait for auth

            if (!userProfile?.teacherId) {
                setLoading(false);
                return;
            }

            setLoading(true);
            const data = await getClassesByTeacherId(userProfile.teacherId);
            setScheduleData(data);
            setLoading(false);
        };
        fetchSchedule();
    }, [userProfile, authLoading]);

    // Fetch Class Routines (Firestore)
    useEffect(() => {
        const fetchRoutines = async () => {
            setRoutinesLoading(true);
            const data = await getClassRoutines();
            setRoutines(data);
            setRoutinesLoading(false);
        };
        fetchRoutines();
    }, []);

    // Fetch Batch Stats (Google Sheet Backend)
    // Mock Batch Stats (Free Plan)
    useEffect(() => {
        const fetchBatchStats = async () => {
            setBatchStatsLoading(true);
            try {
                // Mock Data for faster loading/Free tier
                const mockData = {
                    "Batch_06": [
                        { subjectName: "Sales", classCount: 12 },
                        { subjectName: "Branding", classCount: 8 }
                    ],
                    "Batch_07": [
                        { subjectName: "Digital Marketing", classCount: 5 },
                        { subjectName: "Canva", classCount: 15 }
                    ]
                };

                // Simulate slight network delay for realism if needed, or just set it:
                setBatchStats(mockData);
            } catch (error) {
                console.error("Failed to fetch batch stats", error);
            } finally {
                setBatchStatsLoading(false);
            }
        };
        fetchBatchStats();
    }, []);

    // Filter out completed classes (past dates that are completed)
    // BUT show "Pending" classes (past dates that are NOT completed)
    const visibleSchedule = scheduleData.filter(schedule => {
        // Hide ONLY if status is "Completed" AND date is in the past
        if (schedule.status === "Completed" && schedule.date < today) {
            return false;
        }
        return true;
    });

    const displayedSchedule = showAll ? visibleSchedule : visibleSchedule.slice(0, 5);

    const handleDoneClick = async (index: number) => {
        // Optimistic Update
        const targetSchedule = displayedSchedule[index];
        if (!targetSchedule) return;

        // Visual feedback immediately
        const updatedSchedule = [...scheduleData];
        // Find the correct item in full list (displayedSchedule is a slice)
        const realIndex = scheduleData.findIndex(s =>
            s.date === targetSchedule.date &&
            s.time === targetSchedule.time &&
            s.batch === targetSchedule.batch &&
            s.subject === targetSchedule.subject
        );

        if (realIndex === -1) return;

        // Optimistically set to completed
        const previousStatus = updatedSchedule[realIndex].status;
        updatedSchedule[realIndex] = { ...updatedSchedule[realIndex], status: "Completed" };
        setScheduleData(updatedSchedule);

        try {
            const res = await fetch('/api/schedule', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    teacherId: userProfile?.teacherId,
                    date: targetSchedule.date,
                    time: targetSchedule.time,
                    status: "Completed"
                })
            });

            const json = await res.json();

            if (!res.ok || !json.success) {
                // Revert if failed
                console.error("Failed to mark done:", json.error);
                alert("Failed to update status. Please try again.");
                updatedSchedule[realIndex] = { ...updatedSchedule[realIndex], status: previousStatus };
                setScheduleData([...updatedSchedule]);
            }
        } catch (error) {
            console.error("Network error marking done:", error);
            alert("Network error. Please check your connection.");
            updatedSchedule[realIndex] = { ...updatedSchedule[realIndex], status: previousStatus };
            setScheduleData([...updatedSchedule]);
        }
    };

    const handleRequestToComplete = async (schedule: ClassSchedule) => {
        setExpandedPending(null);
        if (!userProfile?.teacherId) return;

        const uniqueKey = `${schedule.date}-${schedule.time}-${schedule.batch}`;
        setProcessingId(uniqueKey);

        try {
            await requestClassCompletion(
                userProfile.teacherId,
                userProfile.displayName || "Teacher",
                schedule
            );

            // Optimistic update
            setScheduleData(prev => prev.map(s => {
                if (s.date === schedule.date && s.time === schedule.time && s.batch === schedule.batch) {
                    return { ...s, status: "Requested" as any };
                }
                return s;
            }));
        } catch (error) {
            console.error(error);
            alert("Failed to send request.");
        } finally {
            setProcessingId(null);
        }
    };

    const getStatusBadge = (schedule: ClassSchedule, index: number) => {
        if (schedule.status === "Today") {
            return (
                <button
                    onClick={() => handleDoneClick(index)}
                    className="px-4 py-1.5 bg-[#059669] text-white text-sm font-medium rounded-full hover:bg-[#10b981] transition-colors"
                >
                    Done
                </button>
            );
        }

        if (schedule.status === "Pending") {
            const uniqueKey = `${schedule.date}-${schedule.time}-${schedule.batch}`; // Better uniqueness using batch
            const isProcessing = processingId === uniqueKey;

            return (
                <div className="inline-block relative">
                    {/* Show Request Button Above when expanded */}
                    {expandedPending === uniqueKey && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 animate-fadeIn z-10">
                            <button
                                onClick={() => handleRequestToComplete(schedule)}
                                disabled={isProcessing}
                                className="px-4 py-2 bg-[#059669] text-white text-sm font-semibold rounded-lg hover:bg-[#10b981] transition-colors whitespace-nowrap shadow-md"
                            >
                                {isProcessing ? "Sending..." : "Request to Complete"}
                            </button>
                        </div>
                    )}

                    {/* Pending Pill with Arrow */}
                    <button
                        onClick={() => setExpandedPending(expandedPending === uniqueKey ? null : uniqueKey)}
                        className="px-4 py-1.5 bg-[#f59e0b] text-white text-sm font-medium rounded-full hover:bg-[#fb923c] transition-colors inline-flex items-center gap-2"
                    >
                        Pending
                        <svg
                            className={`w-3 h-3 transition-transform ${expandedPending === uniqueKey ? 'rotate-180' : ''}`}
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

        // New 'Requested' State
        if ((schedule.status as any) === "Requested") {
            return (
                <span className="px-4 py-1.5 bg-[#fcd34d] text-yellow-800 text-sm font-medium rounded-full cursor-not-allowed opacity-80">
                    Requested
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

    if (authLoading) {
        return <div className="p-8 text-center text-[#6b7280]">Loading profile...</div>;
    }

    if (!userProfile?.teacherId) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center text-[#6b7280] bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="p-3 bg-yellow-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-[#1f2937] mb-2">Teacher ID Missing</h2>
                <p className="max-w-md mx-auto">Your account is not linked to any Teacher ID. Please ask the administrator to update your profile with your ID.</p>
            </div>
        );
    }

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
                        Viewing schedule for Teacher ID: <span className="font-mono font-medium text-[#111827]">{userProfile.teacherId}</span>
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
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-[#6b7280]">
                                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#059669] mb-2"></div>
                                            <p>Loading schedule from Sheet...</p>
                                        </td>
                                    </tr>
                                ) : displayedSchedule.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-[#6b7280]">
                                            <p className="text-lg font-medium text-gray-900">No classes found</p>
                                            <p className="text-sm mt-1">No scheduled classes found for ID <span className="font-mono">{userProfile.teacherId}</span>.</p>
                                        </td>
                                    </tr>
                                ) : displayedSchedule.map((schedule, index) => (
                                    <tr
                                        key={index}
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
                                            {getStatusBadge(schedule, index)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>

            {/* See More / See Less Button */}
            {!loading && visibleSchedule.length > 5 && (
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
                    {routinesLoading ? (
                        // Skeleton / Loading State
                        [1, 2, 3].map((i) => (
                            <Card key={i} className="animate-pulse">
                                <CardBody className="p-6">
                                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                                </CardBody>
                            </Card>
                        ))
                    ) : routines.length === 0 ? (
                        <div className="col-span-full py-8 text-center text-[#6b7280] bg-white rounded-lg border border-gray-100 italic">
                            No class routines uploaded yet.
                        </div>
                    ) : (
                        routines.map((routine) => (
                            <Card key={routine.id} className="hover:shadow-lg transition-shadow">
                                <CardBody className="p-6">
                                    {/* Title */}
                                    <h3 className="text-base font-semibold text-[#1f2937] mb-3 line-clamp-2 min-h-[48px]">
                                        {routine.title}
                                    </h3>

                                    {/* Meta Information */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                            <span className="truncate">Uploaded by: {routine.uploadedByName}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                            </svg>
                                            <span>Date: {formatDateShort(routine.createdAt.toISOString())}</span>
                                        </div>
                                    </div>

                                    {/* View Button */}
                                    <a
                                        href={routine.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full"
                                    >
                                        <button className="w-full px-4 py-3 bg-[#059669] text-white font-semibold rounded-lg hover:bg-[#10b981] transition-colors">
                                            View / Download
                                        </button>
                                    </a>
                                </CardBody>
                            </Card>
                        ))
                    )}
                </div>
            </div>

            {/* Batch-wise Class Count Section */}
            <div className="mt-12">
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-10 bg-[#059669] rounded-full"></div>
                    <div>
                        <h2 className="text-3xl font-bold text-[#1f2937]">
                            Batch-wise Class Count
                        </h2>
                        <p className="text-[#6b7280] mt-1">
                            Track classes taken per subject for each batch
                        </p>
                    </div>
                </div>

                {/* Dynamic Batch Tables */}
                {Object.keys(batchStats).length === 0 && !loading && !batchStatsLoading ? (
                    <div className="text-center py-8 text-gray-500 bg-white rounded-lg border border-gray-100 italic">
                        No batch data found. Please ensure tabs are named &apos;Batch_06&apos;, etc.
                    </div>
                ) : (
                    Object.keys(batchStats).sort().map(batchName => {
                        const subjects = batchStats[batchName];

                        return (
                            <div key={batchName} className="mb-8">
                                <h3 className="text-xl font-semibold text-[#1f2937] mb-3">{batchName}</h3>
                                <Card>
                                    <CardBody className="p-0">
                                        <div className="overflow-x-auto">
                                            <table className="w-full border-collapse">
                                                <thead>
                                                    <tr className="bg-[#1e3a5f]">
                                                        <th className="px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278] w-20">
                                                            #
                                                        </th>
                                                        <th className="px-6 py-4 text-start text-sm font-semibold text-white border border-[#2d5278]">
                                                            Subject Name
                                                        </th>
                                                        <th className="px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278] w-48">
                                                            Classes Taken
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {batchStatsLoading ? (
                                                        [1, 2, 3].map(i => (
                                                            <tr key={i} className="animate-pulse bg-white">
                                                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-8 mx-auto"></div></td>
                                                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                                                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-12 mx-auto"></div></td>
                                                            </tr>
                                                        ))
                                                    ) : subjects.length === 0 ? (
                                                        <tr>
                                                            <td colSpan={3} className="px-6 py-8 text-center text-gray-500 italic">
                                                                No classes found for this batch.
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        subjects.map((subject, idx) => (
                                                            <tr
                                                                key={subject.subjectName}
                                                                className={idx % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}
                                                            >
                                                                <td className="px-6 py-3 text-sm text-[#1f2937] font-medium border border-[#e5e7eb] text-center">
                                                                    {idx + 1}
                                                                </td>
                                                                <td className="px-6 py-3 text-sm text-[#1f2937] border border-[#e5e7eb]">
                                                                    {subject.subjectName}
                                                                </td>
                                                                <td className="px-6 py-3 text-sm text-[#1f2937] font-semibold border border-[#e5e7eb] text-center">
                                                                    {subject.classCount}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        );
                    })
                )}
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
