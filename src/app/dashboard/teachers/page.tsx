"use client";

import { useState } from "react";
import TeacherCard from "@/components/ui/TeacherCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { mockTeachers } from "@/lib/mockData";

export default function TeachersPage() {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter teachers based on search query
    const filteredTeachers = mockTeachers.filter(teacher => {
        const query = searchQuery.toLowerCase();
        return (
            teacher.name.toLowerCase().includes(query) ||
            teacher.employeeId.toLowerCase().includes(query)
        );
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-10 bg-[#059669] rounded-full"></div>
                    <div>
                        <h1 className="text-3xl font-bold text-[#1f2937]">
                            Teacher Directory
                        </h1>
                        <p className="text-[#6b7280] mt-1">
                            View all teachers and their information
                        </p>
                    </div>
                </div>
                <Badge variant="default" size="lg">
                    {filteredTeachers.length} Teachers
                </Badge>
            </div>

            {/* Search Bar */}
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Search by name or employee ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-3 border border-[#e5e7eb] rounded-lg bg-white text-[#1f2937] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                />
                {searchQuery && (
                    <Button
                        variant="secondary"
                        onClick={() => setSearchQuery("")}
                    >
                        Clear
                    </Button>
                )}
            </div>

            {/* Teachers Grid */}
            {filteredTeachers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTeachers.map((teacher) => (
                        <TeacherCard key={teacher.id} teacher={teacher} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-[#6b7280] text-lg">
                        No teachers found matching "{searchQuery}"
                    </p>
                </div>
            )}
        </div>
    );
}
