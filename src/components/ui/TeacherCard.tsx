"use client";

import { useState } from "react";
import Card, { CardBody } from "./Card";
import { Teacher } from "@/lib/mockData";

interface TeacherCardProps {
    teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <Card className="h-full relative hover:shadow-lg transition-shadow">
            <CardBody className="flex flex-col items-center text-center p-6">
                {/* Profile Image */}
                <div className="w-24 h-24 rounded-full overflow-hidden shadow-md mb-3 bg-gradient-to-br from-[#059669] to-[#10b981] flex items-center justify-center">
                    {teacher.avatar ? (
                        <img
                            src={teacher.avatar}
                            alt={teacher.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    )}
                </div>

                {/* ID Badge - Dark Blue */}
                <div className="mb-3">
                    <span className="bg-[#1e3a5f] text-white text-xs font-semibold px-4 py-1.5 rounded-md">
                        {teacher.id.replace('T00', 'ID-10')}
                    </span>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-[#1f2937] mb-1">
                    {teacher.name}
                </h3>

                {/* Designation */}
                <p className="text-sm text-[#6b7280] mb-3">
                    {teacher.designation}
                </p>

                {/* Role/Academic Badge - Teal */}
                <div className="mb-4">
                    <span className="bg-[#0d9488] text-white text-xs font-medium px-4 py-1 rounded-md uppercase">
                        {teacher.role === "Admin" ? "ADMIN" : "ACADEMIC"}
                    </span>
                </div>

                {/* About Section */}
                <div className="w-full mb-4">
                    <div className="text-sm text-[#374151] text-left leading-relaxed">
                        <p className={`${!isExpanded ? 'line-clamp-3' : ''}`}>
                            {teacher.about || `${teacher.name} is a dedicated ${teacher.designation} specializing in ${teacher.subject}. With years of experience in education, they bring extensive knowledge and passion to their teaching methodology. Focused on student success and creating an engaging learning environment.`}
                        </p>
                        <div className="text-center">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-[#0d9488] hover:text-[#0f766e] text-sm font-semibold mt-2 transition-colors inline-flex items-center gap-1"
                            >
                                {isExpanded ? (
                                    <>See Less <span className="text-xs">↑</span></>
                                ) : (
                                    <>See More <span className="text-xs">→</span></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="w-full space-y-3">
                    {/* Phone */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-white border border-[#e5e7eb] rounded-lg group hover:border-[#0d9488] transition-colors">
                        <div className="flex-shrink-0 text-[#0d9488]">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                        </div>
                        <span className="text-sm text-[#1f2937] flex-1 text-left font-semibold">
                            {teacher.phone || '01712345678'}
                        </span>
                        <button
                            onClick={() => copyToClipboard(teacher.phone || '01712345678')}
                            className="flex-shrink-0 text-[#9ca3af] hover:text-[#0d9488] transition-colors"
                            title="Copy phone"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-white border border-[#e5e7eb] rounded-lg group hover:border-[#0d9488] transition-colors">
                        <div className="flex-shrink-0 text-[#0d9488]">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                        </div>
                        <span className="text-sm text-[#1f2937] flex-1 text-left truncate font-semibold">
                            {teacher.email}
                        </span>
                        <button
                            onClick={() => copyToClipboard(teacher.email)}
                            className="flex-shrink-0 text-[#9ca3af] hover:text-[#0d9488] transition-colors"
                            title="Copy email"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
