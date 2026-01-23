import Card, { CardBody, CardHeader } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { mockAdminStats, mockUsers } from "@/lib/mockData";
import { getStatusVariant } from "@/lib/utils";

export default function AdminPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ⚙️ Admin Panel
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage users, notices, and system settings
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-[#009d63] to-[#00b371] border-0">
                    <CardBody>
                        <div className="text-white">
                            <p className="text-sm opacity-90 mb-1">Total Teachers</p>
                            <p className="text-4xl font-bold mb-2">{mockAdminStats.totalTeachers}</p>
                            <p className="text-xs opacity-75">👥 Active members</p>
                        </div>
                    </CardBody>
                </Card>

                <Card className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] border-0">
                    <CardBody>
                        <div className="text-white">
                            <p className="text-sm opacity-90 mb-1">Total Students</p>
                            <p className="text-4xl font-bold mb-2">{mockAdminStats.totalStudents}</p>
                            <p className="text-xs opacity-75">🎓 Enrolled students</p>
                        </div>
                    </CardBody>
                </Card>

                <Card className="bg-gradient-to-br from-[#008554] to-[#009d63] border-0">
                    <CardBody>
                        <div className="text-white">
                            <p className="text-sm opacity-90 mb-1">Total Notices</p>
                            <p className="text-4xl font-bold mb-2">{mockAdminStats.totalNotices}</p>
                            <p className="text-xs opacity-75">📢 Published notices</p>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Quick Actions
                </h2>
                <div className="flex gap-3 flex-wrap">
                    <Button variant="primary">
                        ➕ Add User
                    </Button>
                    <Button variant="primary">
                        📢 Add Notice
                    </Button>
                    <Button variant="outline">
                        📊 View Reports
                    </Button>
                    <Button variant="outline">
                        ⚙️ Settings
                    </Button>
                </div>
            </div>

            {/* User Management Table */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            User Management
                        </h2>
                        <Badge variant="info">
                            {mockUsers.length} Users
                        </Badge>
                    </div>
                </CardHeader>
                <CardBody className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        Role
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            {user.role}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={getStatusVariant(user.status)} size="sm">
                                                {user.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm">
                                                    ✏️
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    🗑️
                                                </Button>
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
    );
}
