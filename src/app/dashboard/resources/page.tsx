import ResourceCard from "@/components/ui/ResourceCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { mockResources } from "@/lib/mockData";

export default function ResourcesPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        📚 Resource Library
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Access teaching materials, documents, and links
                    </p>
                </div>
                <Badge variant="info" size="lg">
                    {mockResources.length} Resources
                </Badge>
            </div>

            {/* Filter Options (UI Only) */}
            <div className="flex gap-3 flex-wrap">
                <Button variant="primary" size="sm">
                    All
                </Button>
                <Button variant="outline" size="sm">
                    📄 PDF
                </Button>
                <Button variant="outline" size="sm">
                    ☁️ Drive
                </Button>
                <Button variant="outline" size="sm">
                    🔗 Links
                </Button>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
        </div>
    );
}
