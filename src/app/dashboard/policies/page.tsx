import Card, { CardBody } from "@/components/ui/Card";
import { formatDateShort } from "@/lib/utils";

// Policy interface
interface Policy {
    id: string;
    title: string;
    date: string;
    version: string;
}

// Meeting interface
interface Meeting {
    id: string;
    title: string;
    date: string;
    meetingNumber: string;
}

// Mock Policies Data
const policies: Policy[] = [
    {
        id: "P001",
        title: "Teacher Attendance Policy",
        date: "2026-01-15",
        version: "v2.1",
    },
    {
        id: "P002",
        title: "Academic Code of Conduct",
        date: "2026-01-10",
        version: "v1.5",
    },
    {
        id: "P003",
        title: "Examination Guidelines",
        date: "2025-12-20",
        version: "v3.0",
    },
    {
        id: "P004",
        title: "Student Assessment Policy",
        date: "2025-12-15",
        version: "v2.0",
    },
    {
        id: "P005",
        title: "Leave and Absence Policy",
        date: "2025-11-30",
        version: "v1.8",
    },
    {
        id: "P006",
        title: "Professional Development Policy",
        date: "2025-11-20",
        version: "v1.2",
    },
];

// Mock Meeting Minutes Data
const meetings: Meeting[] = [
    {
        id: "M001",
        title: "Monthly Academic Review Meeting",
        date: "2026-01-20",
        meetingNumber: "Meeting #24",
    },
    {
        id: "M002",
        title: "Curriculum Planning Session",
        date: "2026-01-15",
        meetingNumber: "Meeting #23",
    },
    {
        id: "M003",
        title: "Faculty Development Workshop",
        date: "2026-01-08",
        meetingNumber: "Meeting #22",
    },
    {
        id: "M004",
        title: "Exam Committee Meeting",
        date: "2025-12-28",
        meetingNumber: "Meeting #21",
    },
    {
        id: "M005",
        title: "Annual Planning Meeting",
        date: "2025-12-15",
        meetingNumber: "Meeting #20",
    },
    {
        id: "M006",
        title: "Student Progress Review",
        date: "2025-12-10",
        meetingNumber: "Meeting #19",
    },
];

export default function PoliciesPage() {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-center gap-3">
                <div className="w-1 h-10 bg-[#059669] rounded-full"></div>
                <div>
                    <h1 className="text-3xl font-bold text-[#1f2937]">
                        Policies & Meeting Minutes
                    </h1>
                    <p className="text-[#6b7280] mt-1">
                        Access institutional policies and meeting records
                    </p>
                </div>
            </div>

            {/* Policies Section */}
            <div className="space-y-4">
                {/* Section Heading */}
                <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-[#059669] rounded-full"></div>
                    <h2 className="text-2xl font-bold text-[#1f2937]">
                        Policies
                    </h2>
                </div>

                {/* Policy Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {policies.map((policy) => (
                        <Card key={policy.id} className="hover:shadow-lg transition-shadow h-full">
                            <CardBody className="p-6 flex flex-col">
                                {/* Document Icon */}
                                <div className="mb-4">
                                    <div className="w-12 h-14 bg-[#f3f4f6] rounded-lg flex items-center justify-center">
                                        <svg className="w-8 h-8 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-[#1f2937] mb-3">
                                    {policy.title}
                                </h3>

                                {/* Meta Information */}
                                <div className="space-y-2 mb-4 mt-auto">
                                    <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                        <span>Date: {formatDateShort(policy.date)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                        <span className="px-2 py-1 bg-[#dbeafe] text-[#1e40af] rounded text-xs font-semibold">
                                            {policy.version}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button className="w-full px-4 py-3 bg-[#059669] text-white font-semibold rounded-lg hover:bg-[#10b981] transition-colors">
                                    View Document
                                </button>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Meeting Minutes Section */}
            <div className="space-y-4">
                {/* Section Heading */}
                <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-[#059669] rounded-full"></div>
                    <h2 className="text-2xl font-bold text-[#1f2937]">
                        Meeting Minutes
                    </h2>
                </div>

                {/* Meeting Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {meetings.map((meeting) => (
                        <Card key={meeting.id} className="hover:shadow-lg transition-shadow h-full">
                            <CardBody className="p-6 flex flex-col">
                                {/* Meeting Icon */}
                                <div className="mb-4">
                                    <div className="w-12 h-14 bg-[#f3f4f6] rounded-lg flex items-center justify-center">
                                        <svg className="w-8 h-8 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-[#1f2937] mb-3">
                                    {meeting.title}
                                </h3>

                                {/* Meta Information */}
                                <div className="space-y-2 mb-4 mt-auto">
                                    <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                        <span>Date: {formatDateShort(meeting.date)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                        </svg>
                                        <span className="px-2 py-1 bg-[#d1fae5] text-[#059669] rounded text-xs font-semibold">
                                            {meeting.meetingNumber}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button className="w-full px-4 py-3 bg-[#059669] text-white font-semibold rounded-lg hover:bg-[#10b981] transition-colors">
                                    View Minutes
                                </button>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
