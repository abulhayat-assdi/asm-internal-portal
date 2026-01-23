"use client";

import { useState } from "react";
import Card, { CardBody } from "@/components/ui/Card";
import { formatDateShort } from "@/lib/utils";

// Resource interface
interface Resource {
    id: string;
    title: string;
    category: "Course Module" | "Class Routine" | "Notes" | "Assignment" | "Exam / Practice";
    uploadedBy: string;
    uploadDate: string;
    description?: string;
    fileUrl?: string;
    externalLink?: string;
}

// Mock resources with new categories
const initialResources: Resource[] = [
    {
        id: "R001",
        title: "Physics Chapter 1 - Motion",
        category: "Course Module",
        uploadedBy: "Karim Uddin",
        uploadDate: "2026-01-15",
        description: "Complete chapter notes with examples and practice problems",
    },
    {
        id: "R002",
        title: "Chemistry Organic Compounds",
        category: "Course Module",
        uploadedBy: "Shahid Ahmed",
        uploadDate: "2026-01-12",
        description: "Detailed study material on organic chemistry fundamentals",
    },
    {
        id: "R003",
        title: "Batch 06 Weekly Routine",
        category: "Class Routine",
        uploadedBy: "Abul Hayat",
        uploadDate: "2026-01-10",
        description: "Complete weekly class schedule for Batch 06",
    },
    {
        id: "R004",
        title: "Batch 07 Monthly Schedule",
        category: "Class Routine",
        uploadedBy: "Mohammad Rahman",
        uploadDate: "2026-01-08",
    },
    {
        id: "R005",
        title: "Biology Lab Experiment Notes",
        category: "Notes",
        uploadedBy: "Rafiqul Islam",
        uploadDate: "2026-01-18",
        description: "Detailed lab experiment procedures and observations",
    },
    {
        id: "R006",
        title: "Mathematics Calculus Notes",
        category: "Notes",
        uploadedBy: "Karim Uddin",
        uploadDate: "2026-01-16",
        description: "Comprehensive notes on differential and integral calculus",
    },
    {
        id: "R007",
        title: "English Grammar Assignment",
        category: "Assignment",
        uploadedBy: "Mohammad Rahman",
        uploadDate: "2026-01-20",
        description: "Grammar exercises and composition tasks",
    },
    {
        id: "R008",
        title: "Physics Problem Set 3",
        category: "Assignment",
        uploadedBy: "Karim Uddin",
        uploadDate: "2026-01-19",
    },
    {
        id: "R009",
        title: "Chemistry MCQ Practice",
        category: "Exam / Practice",
        uploadedBy: "Shahid Ahmed",
        uploadDate: "2026-01-17",
        description: "100 MCQ questions for exam preparation",
    },
    {
        id: "R010",
        title: "Biology Model Test Papers",
        category: "Exam / Practice",
        uploadedBy: "Rafiqul Islam",
        uploadDate: "2026-01-14",
        description: "Previous year question patterns and solutions",
    },
];

const categories: Resource["category"][] = [
    "Course Module",
    "Class Routine",
    "Notes",
    "Assignment",
    "Exam / Practice"
];

export default function ResourcesPage() {
    const [resources, setResources] = useState<Resource[]>(initialResources);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newResource, setNewResource] = useState({
        title: "",
        category: "Course Module" as Resource["category"],
        description: "",
        externalLink: "",
    });

    // Group resources by category
    const groupedResources = categories.map(category => ({
        category,
        resources: resources.filter(r => r.category === category)
    }));

    const handleAddResource = (e: React.FormEvent) => {
        e.preventDefault();

        const resource: Resource = {
            id: `R${String(resources.length + 1).padStart(3, '0')}`,
            title: newResource.title,
            category: newResource.category,
            uploadedBy: "Abul Hayat",
            uploadDate: new Date().toISOString().split('T')[0],
            description: newResource.description || undefined,
            externalLink: newResource.externalLink || undefined,
        };

        setResources([resource, ...resources]);
        setIsModalOpen(false);
        setNewResource({
            title: "",
            category: "Course Module",
            description: "",
            externalLink: "",
        });
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-10 bg-[#059669] rounded-full"></div>
                    <div>
                        <h1 className="text-3xl font-bold text-[#1f2937]">
                            Resource Library
                        </h1>
                        <p className="text-[#6b7280] mt-1">
                            Access teaching materials, documents, and resources
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-[#059669] text-white font-semibold rounded-lg hover:bg-[#10b981] transition-colors inline-flex items-center gap-2"
                >
                    <span className="text-lg">+</span>
                    Add Resource
                </button>
            </div>

            {/* Category-wise Resource Sections */}
            {groupedResources.map(({ category, resources: categoryResources }) => (
                categoryResources.length > 0 && (
                    <div key={category} className="space-y-4">
                        {/* Category Heading */}
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-8 bg-[#059669] rounded-full"></div>
                            <h2 className="text-2xl font-bold text-[#1f2937]">
                                {category}
                            </h2>
                        </div>

                        {/* Resource Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categoryResources.map((resource) => (
                                <Card key={resource.id} className="hover:shadow-lg transition-shadow h-full">
                                    <CardBody className="p-6 flex flex-col">
                                        {/* Title */}
                                        <h3 className="text-lg font-semibold text-[#1f2937] mb-3">
                                            {resource.title}
                                        </h3>

                                        {/* Description */}
                                        {resource.description && (
                                            <p className="text-sm text-[#6b7280] mb-4 line-clamp-2">
                                                {resource.description}
                                            </p>
                                        )}

                                        {/* Meta Information */}
                                        <div className="space-y-2 mb-4 mt-auto">
                                            <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                                <span>Uploaded by: {resource.uploadedBy}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                </svg>
                                                <span>Date: {formatDateShort(resource.uploadDate)}</span>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button className="w-full px-4 py-3 bg-[#059669] text-white font-semibold rounded-lg hover:bg-[#10b981] transition-colors">
                                            {resource.externalLink ? "Open Link" : "View / Download"}
                                        </button>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </div>
                )
            ))}

            {/* Add Resource Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-[#1f2937]">Add Resource</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-[#6b7280] hover:text-[#1f2937]"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleAddResource} className="space-y-4">
                            {/* Resource Title */}
                            <div>
                                <label className="block text-sm font-medium text-[#1f2937] mb-2">
                                    Resource Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newResource.title}
                                    onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
                                    placeholder="Enter resource title"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-[#1f2937] mb-2">
                                    Category *
                                </label>
                                <select
                                    required
                                    value={newResource.category}
                                    onChange={(e) => setNewResource({ ...newResource, category: e.target.value as Resource["category"] })}
                                    className="w-full px-4 py-2 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
                                >
                                    <option value="Course Module">Course Module</option>
                                    <option value="Class Routine">Class Routine</option>
                                    <option value="Notes">Notes</option>
                                    <option value="Assignment">Assignment</option>
                                    <option value="Exam / Practice">Exam / Practice</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-[#1f2937] mb-2">
                                    Description (Optional)
                                </label>
                                <textarea
                                    value={newResource.description}
                                    onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
                                    placeholder="Brief description of the resource"
                                    rows={3}
                                />
                            </div>

                            {/* File Upload or External Link */}
                            <div>
                                <label className="block text-sm font-medium text-[#1f2937] mb-2">
                                    Upload File or Add Link
                                </label>
                                <input
                                    type="text"
                                    value={newResource.externalLink}
                                    onChange={(e) => setNewResource({ ...newResource, externalLink: e.target.value })}
                                    className="w-full px-4 py-2 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
                                    placeholder="Enter Drive link or external URL"
                                />
                                <p className="text-xs text-[#6b7280] mt-1">
                                    Or upload a file (feature coming soon)
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-[#e5e7eb] text-[#6b7280] font-medium rounded-lg hover:bg-[#f9fafb] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-[#059669] text-white font-semibold rounded-lg hover:bg-[#10b981] transition-colors"
                                >
                                    Add Resource
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
