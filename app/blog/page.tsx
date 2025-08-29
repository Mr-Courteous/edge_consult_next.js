'use client';
import { Calendar, User, Tag, ArrowRight, Clock, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"; 
import baseUrl from '@/lib/config';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const router = useRouter();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${baseUrl}/posts`);
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            } else {
                console.error('Failed to fetch posts:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPosts = selectedCategory === "All"
        ? posts
        : posts.filter(post => post.category === selectedCategory);

    const categories = ["All", "news", "nysc", "scholarships"]; 

    return (
        <Layout>
            {/* Category Filter */}
            <section className="py-4 bg-gradient-to-r from-violet-100 via-fuchsia-50 to-indigo-100 border-b border-t sticky top-0 z-20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-wrap gap-3 justify-center">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            onClick={() => setSelectedCategory(category)}
                            className={`font-orbitron text-sm px-5 py-2 rounded-full transition-all duration-200 shadow ${selectedCategory === category ? "bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 text-white" : "bg-white text-violet-700 border-violet-200 hover:bg-violet-50"}`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Button>
                    ))}
                </div>
            </section>
            
            {/* Blog Posts Grid */}
            <section className="py-16 bg-gradient-to-b from-white via-violet-50 to-fuchsia-50">
                <div className="max-w-7xl mx-auto px-4 md:px-10">
                    <div className="mb-10 text-center">
                        <h2 className="font-orbitron text-3xl md:text-4xl font-extrabold mb-4 text-violet-900 drop-shadow-lg">Latest Articles</h2>
                        <p className="font-inter text-violet-700/80">
                            Stay updated with our latest insights and industry analysis
                        </p>
                    </div>
                    
                    {loading ? (
                        <div className="text-center py-12">
                            <p className="font-orbitron text-violet-700">Loading posts...</p>
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="font-orbitron text-violet-700">No posts available yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredPosts.map((post) => ( 
                                <Card key={post._id} className="overflow-hidden border-none bg-gradient-to-br from-white via-violet-100 to-fuchsia-100 shadow-xl rounded-2xl hover:scale-105 transition-all duration-200">
                                    <div className="aspect-video bg-gradient-to-br from-violet-200 via-fuchsia-100 to-indigo-100 flex items-center justify-center">
                                        {post.image_path ? (
                                            <img 
                                                src={post.image_path} 
                                                alt={post.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/333333?text=Image+Error"; }}
                                            />
                                        ) : (
                                            <div className="text-3xl text-violet-200">📄</div>
                                        )}
                                    </div>
                                    
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center space-x-2 mb-3 text-sm text-violet-700/80">
                                            <Badge variant="secondary">{post.category.charAt(0).toUpperCase() + post.category.slice(1)}</Badge>
                                            <div className="flex items-center space-x-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        
                                        <h3 className="font-orbitron text-lg font-bold line-clamp-2 mb-3 text-violet-800">
                                            {post.title}
                                        </h3>
                                        
                                        <p className="font-inter text-violet-700/80 text-sm line-clamp-3 mb-4">
                                            {post.body.substring(0, 150)}...
                                        </p>
                                        
                                        {post.tags && post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.tags.slice(0, 2).map((tag, tagIndex) => (
                                                    <span key={tagIndex} className="inline-flex items-center text-xs bg-violet-100 text-violet-700 px-3 py-1 rounded-full font-inter shadow">
                                                        <Tag className="w-3 h-3 mr-1" />
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </CardHeader>
                                    
                                    <CardContent className="pt-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-2 text-sm text-violet-700/80">
                                                <User className="w-4 h-4" />
                                                <span>{post.author?.name || "Admin"}</span>
                                            </div>
                                            <div className="flex items-center space-x-1 text-sm text-violet-700/80">
                                                <MessageCircle className="w-4 h-4" />
                                                <span>{post.commentCount} Comments</span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            className="w-full mt-4 py-3 font-orbitron text-violet-700 hover:text-fuchsia-700 hover:bg-violet-100 transition-colors duration-200"
                                            onClick={() => router.push(`/post/${post._id}`)}
                                        >
                                            Read Full Article
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-gradient-to-r from-violet-100 via-fuchsia-50 to-indigo-100 rounded-xl shadow-inner my-16">
                <div className="max-w-3xl mx-auto text-center px-4 md:px-10">
                    <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4 text-violet-900 drop-shadow-lg">Stay Updated</h2>
                    <p className="font-inter text-violet-700/80 mb-6">
                        Subscribe to our newsletter for the latest blog posts, industry news, and exclusive insights directly in your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Input type="email" placeholder="Enter your email" className="w-full sm:w-auto flex-grow font-inter" />
                        <Button className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 text-white font-orbitron px-8 py-3 shadow-lg hover:scale-105 transition-all duration-200">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Blog;