"use client";

import { useState } from "react";
import { type BlogPost } from "@/data/blogData";
import BlogModal from "./BlogModal";

interface BlogListProps {
    posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedPost(post)}
                        className="bg-white rounded-2xl overflow-hidden border border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group"
                    >
                        {/* Image Placeholder */}
                        <div className="w-full h-48 bg-gray-100 relative overflow-hidden">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-6">
                            <span className="text-xs font-medium text-[#059669] uppercase tracking-wide">
                                {post.category}
                            </span>
                            <h3 className="text-lg font-semibold text-[#1f2937] mt-2 mb-3 line-clamp-2 group-hover:text-[#059669] transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-sm text-[#6b7280] leading-relaxed line-clamp-3 mb-4">
                                {post.excerpt}
                            </p>
                            <span className="text-sm font-medium text-[#059669] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                Read Article <span>→</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <BlogModal
                post={selectedPost}
                onClose={() => setSelectedPost(null)}
            />
        </>
    );
}
