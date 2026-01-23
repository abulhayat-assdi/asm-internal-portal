import Card, { CardBody } from "./Card";
import Badge from "./Badge";
import Button from "./Button";
import { Notice } from "@/lib/mockData";
import { formatDateShort, getNoticeTypeVariant } from "@/lib/utils";

interface NoticeCardProps {
    notice: Notice;
}

export default function NoticeCard({ notice }: NoticeCardProps) {
    return (
        <Card hover className="h-full">
            <CardBody>
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-[#1f2937] flex-1 pr-2">
                        {notice.title}
                    </h3>
                    <Badge variant={getNoticeTypeVariant(notice.type)} size="sm">
                        {notice.type}
                    </Badge>
                </div>

                <p className="text-[#6b7280] text-sm mb-4 line-clamp-3">
                    {notice.description}
                </p>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#374151]">
                        📅 {formatDateShort(notice.date)}
                    </span>

                    {notice.hasAttachment && (
                        <Button variant="outline" size="sm">
                            📎 View Attachment
                        </Button>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}
