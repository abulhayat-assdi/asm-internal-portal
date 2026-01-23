import Card, { CardBody, CardHeader } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { mockFeedback } from "@/lib/mockData";
import { formatDateShort, getStatusVariant } from "@/lib/utils";

export default function FeedbackPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    💬 Feedback & Suggestions
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Share your feedback and view previous submissions
                </p>
            </div>

            {/* Feedback Form */}
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Submit New Feedback
                    </h2>
                </CardHeader>
                <CardBody>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                placeholder="আপনার নাম লিখুন"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Your Feedback
                            </label>
                            <textarea
                                rows={4}
                                placeholder="আপনার মতামত বা পরামর্শ লিখুন..."
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled
                            ></textarea>
                        </div>

                        <div>
                            <Button variant="primary" type="submit">
                                📤 Submit Feedback
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>

            {/* Previous Feedback */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Previous Feedback
                    </h2>
                    <Badge variant="info">
                        {mockFeedback.length} Submissions
                    </Badge>
                </div>

                <div className="space-y-4">
                    {mockFeedback.map((feedback) => (
                        <Card key={feedback.id} hover>
                            <CardBody>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {feedback.submittedBy}
                                            </h3>
                                            <Badge variant={getStatusVariant(feedback.status)} size="sm">
                                                {feedback.status}
                                            </Badge>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                                            {feedback.message}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-500">
                                            📅 {formatDateShort(feedback.date)}
                                        </p>
                                    </div>
                                    <div className="text-2xl">💬</div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
