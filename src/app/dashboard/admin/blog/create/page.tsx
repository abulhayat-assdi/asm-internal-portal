"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card, { CardBody } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import AdminRoute from "@/components/auth/AdminRoute";
import * as blogService from "@/services/blogService";

export default function CreateBlogPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        featuredImage: "",
        content: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'title') {
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');

            setFormData(prev => ({ ...prev, [name]: value, slug }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = async (status: 'draft' | 'published') => {
        if (!formData.title || !formData.content) {
            alert("Title and Content are required");
            return;
        }

        if (status === 'published' && !confirm("Are you sure you want to publish this post?")) {
            return;
        }

        setLoading(true);
        try {
            await blogService.createPost({
                ...formData,
                status,
            });
            router.push('/dashboard/admin/blog');
        } catch (error) {
            console.error(error);
            alert("Failed to save post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminRoute>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1f2937]">Create New Post</h1>
                        <p className="text-[#6b7280] mt-1">Draft a new blog post</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/dashboard/admin/blog">
                            <Button variant="outline" disabled={loading}>Cancel</Button>
                        </Link>
                        <Button
                            variant="secondary"
                            onClick={() => handleSave('draft')}
                            disabled={loading}
                        >
                            Save Draft
                        </Button>
                        <Button
                            onClick={() => handleSave('published')}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Publish Post
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardBody className="space-y-4">
                                <Input
                                    label="Post Title"
                                    name="title"
                                    placeholder="Enter post title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                                <Textarea
                                    label="Content"
                                    name="content"
                                    placeholder="Write your post content here..."
                                    rows={15}
                                    value={formData.content}
                                    onChange={handleChange}
                                    required
                                />
                            </CardBody>
                        </Card>
                    </div>

                    {/* Sidebar Settings */}
                    <div className="space-y-6">
                        <Card>
                            <CardBody className="space-y-4">
                                <h3 className="font-semibold text-gray-900 border-b pb-2">Post Settings</h3>

                                <Input
                                    label="Slug"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    helperText="Auto-generated from title"
                                />

                                <Textarea
                                    label="Excerpt"
                                    name="excerpt"
                                    rows={3}
                                    placeholder="Short summary of the post"
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                />

                                <Input
                                    label="Featured Image URL"
                                    name="featuredImage"
                                    placeholder="https://example.com/image.jpg"
                                    value={formData.featuredImage}
                                    onChange={handleChange}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminRoute>
    );
}
