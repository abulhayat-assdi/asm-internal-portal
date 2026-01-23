"use client";

import { useState } from "react";
import Card, { CardBody } from "@/components/ui/Card";

// Mock data
const adminStats = {
    totalUsers: 45,
    totalNotices: 12,
    totalResources: 28,
    totalMessages: 156,
};

const mockUsers = [
    { id: "U001", name: "Karim Uddin", role: "Teacher", email: "karim@example.com", status: "Active" as const },
    { id: "U002", name: "Shahid Ahmed", role: "Teacher", email: "shahid@example.com", status: "Active" as const },
    { id: "U003", name: "Mohammad Rahman", role: "Teacher", email: "rahman@example.com", status: "Inactive" as const },
    { id: "U004", name: "Rafiqul Islam", role: "Teacher", email: "rafiq@example.com", status: "Active" as const },
    { id: "U005", name: "Abul Hayat", role: "Admin", email: "abul@example.com", status: "Active" as const },
];

export default function AdminPage() {
    const [users] = useState(mockUsers);

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-center gap-3">
                <div className="w-1 h-10 bg-[#059669] rounded-full"></div>
                <div>
                    <h1 className="text-3xl font-bold text-[#1f2937]">
                        Admin Panel
                    </h1>
                    <p className="text-[#6b7280] mt-1">
                        Manage users, notices, and system settings
                    </p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Users */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardBody className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-[#1f2937]">{adminStats.totalUsers}</p>
                                <p className="text-sm text-[#6b7280] mt-1">Total Users</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Total Notices */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardBody className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#ec4899] to-[#f472b6] rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-[#1f2937]">{adminStats.totalNotices}</p>
                                <p className="text-sm text-[#6b7280] mt-1">Total Notices</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Total Resources */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardBody className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#06b6d4] to-[#22d3ee] rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-[#1f2937]">{adminStats.totalResources}</p>
                                <p className="text-sm text-[#6b7280] mt-1">Total Resources</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Total Messages */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardBody className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#10b981] to-[#34d399] rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-[#1f2937]">{adminStats.totalMessages}</p>
                                <p className="text-sm text-[#6b7280] mt-1">Total Messages</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Admin Control Sections */}
            <div className="space-y-4">
                {/* Recent Admin Activity */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardBody className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <h3 className="text-lg font-semibold text-[#1f2937]">Recent Admin Activity</h3>
                                    <p className="text-sm text-[#6b7280] mt-1">View recent administrative actions and system logs</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 border-2 border-[#059669] text-[#059669] font-semibold rounded-lg hover:bg-[#059669] hover:text-white transition-colors">
                                Show Logs
                            </button>
                        </div>
                    </CardBody>
                </Card>

                {/* Manage Pending Classes */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardBody className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6 text-[#f59e0b]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <h3 className="text-lg font-semibold text-[#1f2937]">Manage Pending Classes</h3>
                                    <p className="text-sm text-[#6b7280] mt-1">Review and complete pending classes from all users</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 border-2 border-[#059669] text-[#059669] font-semibold rounded-lg hover:bg-[#059669] hover:text-white transition-colors">
                                Show Pending Classes
                            </button>
                        </div>
                    </CardBody>
                </Card>

                {/* Pending Feedbacks Review */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardBody className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6 text-[#3b82f6]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <h3 className="text-lg font-semibold text-[#1f2937]">Pending Feedbacks Review</h3>
                                    <p className="text-sm text-[#6b7280] mt-1">Review and approve student feedbacks before publishing</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 border-2 border-[#059669] text-[#059669] font-semibold rounded-lg hover:bg-[#059669] hover:text-white transition-colors">
                                Show Pending Feedbacks
                            </button>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* User Management Table */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#1f2937]">User Management</h2>

                <Card>
                    <CardBody className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-[#1e3a5f]">
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278]">
                                            Name
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278]">
                                            Role
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278]">
                                            Email
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278]">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-white border border-[#2d5278]">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr
                                            key={user.id}
                                            className={index % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}
                                        >
                                            <td className="px-6 py-3 text-sm text-[#1f2937] font-medium border border-[#e5e7eb] text-center">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-3 text-sm text-[#1f2937] border border-[#e5e7eb] text-center">
                                                {user.role}
                                            </td>
                                            <td className="px-6 py-3 text-sm text-[#6b7280] border border-[#e5e7eb] text-center">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-3 border border-[#e5e7eb] text-center">
                                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${user.status === "Active"
                                                        ? "bg-[#d1fae5] text-[#059669]"
                                                        : "bg-[#fee2e2] text-[#dc2626]"
                                                    }`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3 border border-[#e5e7eb] text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button className="p-2 text-[#059669] hover:bg-[#d1fae5] rounded-lg transition-colors">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
