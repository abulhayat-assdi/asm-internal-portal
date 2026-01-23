import Card, { CardBody } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { mockPolicies, mockMeetings } from "@/lib/mockData";
import { formatDateShort } from "@/lib/utils";

export default function PoliciesPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    📋 Policies & Meeting Minutes
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Access institutional policies and meeting records
                </p>
            </div>

            {/* Policies Section */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    📜 Policies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockPolicies.map((policy) => (
                        <Card key={policy.id} hover>
                            <CardBody>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                            {policy.title}
                                        </h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                                            <span>📅 {formatDateShort(policy.date)}</span>
                                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded text-xs font-medium">
                                                {policy.version}
                                            </span>
                                        </div>
                                        <Button variant="primary" size="sm">
                                            📄 View Document
                                        </Button>
                                    </div>
                                    <div className="text-3xl">📋</div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Meeting Minutes Section */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    🗓️ Meeting Minutes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockMeetings.map((meeting) => (
                        <Card key={meeting.id} hover>
                            <CardBody>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                            {meeting.title}
                                        </h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                                            <span>📅 {formatDateShort(meeting.date)}</span>
                                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded text-xs font-medium">
                                                {meeting.version}
                                            </span>
                                        </div>
                                        <Button variant="primary" size="sm">
                                            📄 View Minutes
                                        </Button>
                                    </div>
                                    <div className="text-3xl">📝</div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
