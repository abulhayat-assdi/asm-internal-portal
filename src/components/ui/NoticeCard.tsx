import Card, { CardBody } from "./Card";
import Badge from "./Badge";
import { Notice } from "@/services/dashboardService";

interface NoticeCardProps {
    notice: Notice;
}

// Get badge variant based on priority
const getPriorityVariant = (priority: string): "default" | "success" | "warning" | "danger" => {
    switch (priority?.toLowerCase()) {
        case "high":
            return "danger";
        case "medium":
            return "warning";
        case "low":
            return "success";
        default:
            return "default";
    }
};

// Format date to readable format
const formatDate = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    } catch {
        return dateString;
    }
};

export default function NoticeCard({ notice }: NoticeCardProps) {
    const priority = notice.priority?.toLowerCase();

    // Custom styles for "button-like" badges
    const getBadgeStyles = () => {
        switch (priority) {
            case "high":
                return "bg-red-500 text-white shadow-md";
            case "medium":
                return "bg-yellow-500 text-white shadow-md";
            case "low":
                return "bg-green-500 text-white shadow-md";
            default:
                return "bg-gray-500 text-white shadow-md";
        }
    };

    return (
        <Card hover className="h-full min-h-[200px] transition-all duration-300 hover:shadow-lg">
            <CardBody className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#1f2937] flex-1 pr-4 leading-tight">
                        {notice.title}
                    </h3>
                    <div className={`
                        px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase
                        ${getBadgeStyles()}
                    `}>
                        {notice.priority || "NORMAL"}
                    </div>
                </div>

                <p className="text-[#4b5563] text-base mb-6 line-clamp-3 flex-grow leading-relaxed">
                    {notice.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-2 text-sm font-medium text-[#6b7280]">
                        <span className="text-lg">📅</span>
                        {formatDate(notice.date)}
                    </div>
                    {notice.createdByName && (
                        <div className="text-xs text-[#9ca3af] font-medium">
                            Posted by {notice.createdByName.split(' ')[0]}
                        </div>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}
