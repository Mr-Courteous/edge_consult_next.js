'use client';
import { Calendar, User, Tag, ArrowRight, Clock, MessageCircle, Twitter, Facebook, Linkedin, Copy, Share2, Check, Trash2, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import baseUrl from '@/lib/config';
import toast from 'react-hot-toast';
import ConfirmationModal from "@/components/ConfirmationModal";

// Helper function to strip HTML tags from a string
const stripHtml = (htmlString) => {
    return htmlString.replace(/<[^>]*>?/gm, '');
};

// Reusable component for copying to clipboard
const CopyToClipboard = ({ textToCopy, className }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        toast.success('Link copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className={className}
        >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        </Button>
    );
};

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    
    // ➡️ NEW: State for user session, delete modal, and delete loading
    const [user, setUser] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postToDeleteId, setPostToDeleteId] = useState(null);
    const [deleting, setDeleting] = useState(false); // 🆕 New loading state

    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
            } catch (e) {
                console.error("Failed to parse user data from localStorage", e);
                localStorage.removeItem('user');
            }
        }
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

    // ➡️ NEW: Handle post deletion with loading state
    const handleDeletePost = async () => {
        if (!postToDeleteId || deleting) return; // Prevent multiple clicks
        
        setDeleting(true); // 🆕 Start loading state

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("You must be logged in to delete posts.");
            setShowDeleteModal(false);
            setDeleting(false); // 🆕 Reset loading state
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/posts/${postToDeleteId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || "Failed to delete post.");
            }

            // Update UI by filtering out the deleted post
            setPosts(posts.filter(post => post._id !== postToDeleteId));
            toast.success("Post deleted successfully!");

        } catch (error) {
            console.error("Error deleting post:", error);
            toast.error(error.message || "Failed to delete post. Check console for details.");
        } finally {
            setShowDeleteModal(false);
            setPostToDeleteId(null);
            setDeleting(false); // 🆕 End loading state
        }
    };

    const filteredAndSearchedPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stripHtml(post.body).toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const categories = ["All", "news", "nysc", "scholarships", "jobs"];

    const SocialShareButtons = ({ title, url }) => {
        const encodedUrl = encodeURIComponent(url);
        const encodedTitle = encodeURIComponent(title);

        return (
            <div className="flex items-center gap-4">
                <a
                    href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Twitter"
                    className="p-1 rounded-full text-violet-500 hover:text-sky-400 hover:bg-violet-100 transition-colors duration-200"
                >
                    <Twitter size={20} />
                </a>
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="p-1 rounded-full text-violet-500 hover:text-blue-600 hover:bg-violet-100 transition-colors duration-200"
                >
                    <Facebook size={20} />
                </a>
                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="p-1 rounded-full text-violet-500 hover:text-blue-700 hover:bg-violet-100 transition-colors duration-200"
                >
                    <Linkedin size={20} />
                </a>
                <a
                    href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on WhatsApp"
                    className="p-1 rounded-full text-violet-500 hover:text-green-500 hover:bg-violet-100 transition-colors duration-200"
                >
                    <MessageCircle size={20} />
                </a>
                <CopyToClipboard
                    textToCopy={url}
                    className="p-1 rounded-full text-violet-500 hover:text-fuchsia-500 hover:bg-violet-100 transition-colors duration-200"
                />
            </div>
        );
    };

    return (
        <Layout>
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

            ---

            <section className="py-16 bg-gradient-to-b from-white via-violet-50 to-fuchsia-50">
                <div className="max-w-7xl mx-auto px-4 md:px-10">
                    <div className="mb-10 text-center">
                        <h2 className="font-orbitron text-3xl md:text-4xl font-extrabold mb-4 text-violet-900 drop-shadow-lg">Latest Articles</h2>
                        <p className="font-inter text-violet-700/80">
                            Stay updated with our latest insights and industry analysis
                        </p>
                    </div>
                    {/* Add a search bar */}
                    <div className="flex justify-center mb-8">
                        <Input
                            type="text"
                            placeholder="Search posts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full max-w-md font-inter border-violet-200 focus:border-violet-500 transition-colors duration-200"
                        />
                    </div>
                    {loading ? (
                        <div className="text-center py-12">
                            <p className="font-orbitron text-violet-700">Loading posts...</p>
                        </div>
                    ) : filteredAndSearchedPosts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="font-orbitron text-violet-700">No posts available yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredAndSearchedPosts.map((post) => (
                                <Card key={post._id} className="overflow-hidden border-none bg-gradient-to-br from-white via-violet-100 to-fuchsia-100 shadow-xl rounded-2xl hover:scale-105 transition-all duration-200">
                                    <div className="aspect-video bg-gradient-to-br from-violet-200 via-fuchsia-100 to-indigo-100 flex items-center justify-center">
                                        {post.image_path ? (
                                            <img
                                                src={post.image_path}
                                                alt={post.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400/CCCCCC/333333?text=Image+Error"; }}
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
                                            {stripHtml(post.body).substring(0, 150)}...
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
                                        <div className="flex items-center gap-2 mt-4 mb-4">
                                            <Share2 size={20} className="text-violet-500" />
                                            <SocialShareButtons
                                                title={post.title}
                                                url={`${window.location.origin}/post/${post._id}`}
                                            />
                                            {/* ➡️ NEW: Conditionally render the delete button */}
                                            {user && user.role === 'admin' && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-fuchsia-600 hover:bg-fuchsia-100 hover:text-fuchsia-700 transition-colors duration-200"
                                                    onClick={() => {
                                                        setPostToDeleteId(post._id);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    disabled={deleting} // 🆕 Disable the button while deleting
                                                >
                                                    {deleting && postToDeleteId === post._id ? ( // 🆕 Show a spinner for the post being deleted
                                                        <Loader2 className="h-5 w-5 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="h-5 w-5" />
                                                    )}
                                                </Button>
                                            )}
                                        </div>
                                        <div>
                                            <Button
                                                variant="ghost"
                                                className="w-full py-3 font-orbitron text-violet-700 hover:text-fuchsia-700 hover:bg-violet-100 transition-colors duration-200"
                                                onClick={() => router.push(`/post/${post._id}`)}
                                            >
                                                Read Full Article
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            ---

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
            
            {/* ➡️ NEW: Confirmation Modal for deletion */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={handleDeletePost}
                message="Are you sure you want to delete this post? This action is permanent."
                isLoading={deleting} // 🆕 Pass the deleting state to the modal
            />
        </Layout>
    );
};

export default Blog;