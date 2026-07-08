'use client';

import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { Copy, Share2, Check, MessageCircle, Twitter, Facebook, Linkedin } from "lucide-react";
import baseUrl from '@/lib/config';
import Layout from "@/components/Layout";

// --- UI Components ---
// Simple custom component for Badge
const Badge = ({ variant, className, children }: { variant?: string; className?: string; children: React.ReactNode }) => {
    const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
    let variantStyles = "";

    switch (variant) {
        case "secondary":
            variantStyles = "border-transparent bg-neutral-100 text-neutral-800 hover:bg-neutral-200";
            break;
        default:
            variantStyles = "border-transparent bg-black text-white hover:bg-neutral-800";
            break;
    }

    return (
        <div className={`${baseStyles} ${variantStyles} ${className}`}>
            {children}
        </div>
    );
};

// Simple custom components for Card
const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}>
        {children}
    </div>
);
const CardHeader = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
        {children}
    </div>
);
const CardContent = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={`p-6 pt-0 ${className}`}>
        {children}
    </div>
);

// Simple custom component for Textarea
const Textarea = ({ className, value, onChange, placeholder }: { className?: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; placeholder?: string }) => (
    <textarea
        className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
    />
);

// Simple custom component for Button
const Button = ({ variant, size, onClick, className, disabled, type, children }: { variant?: string; size?: string; onClick?: () => void; className?: string; disabled?: boolean; type?: "button" | "submit" | "reset"; children: React.ReactNode }) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    let variantStyles = "";
    let sizeStyles = "";

    switch (variant) {
        case "ghost":
            variantStyles = "bg-transparent text-neutral-900 hover:bg-neutral-100";
            break;
        default:
            variantStyles = "bg-black text-white hover:bg-neutral-800";
            break;
    }

    switch (size) {
        case "icon":
            sizeStyles = "h-9 w-9";
            break;
        default:
            sizeStyles = "h-10 py-2 px-4";
            break;
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        >
            {children}
        </button>
    );
};

// Simple custom component for Input
const Input = ({ type, placeholder, value, onChange, className }: { type: string; placeholder?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; className?: string }) => (
    <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
);
// --- End of UI Components ---


// Define the Post interface
interface Post {
    _id: string;
    title: string;
    body: string;
    image_path?: string;
    likeCount?: number;
    category?: string;
    tags?: string[];
    author?: { name?: string; username: string };
    createdAt: string;
    commentCount?: number;
    jobDetails?: {
        salary?: { min?: number; max?: number };
        salaryRange?: string;
        company?: string;
        location?: string;
        jobType?: string;
        applicationDeadline?: string;
        responsibilities?: string[];
        requirements?: string[];
        link?: string;
    };
}

// Define the Comment interface
interface Comment {
    _id: string;
    content: string;
    author_info: { fullName?: string; email?: string };
    createdAt: string;
}

interface PostDetailClientProps {
    post: Post | null;
}

// Copy to clipboard component
const CopyToClipboard = ({ textToCopy, className }: { textToCopy: string; className?: string }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        if (!navigator.clipboard) {
            toast.error("Clipboard API not supported in this environment.");
            return;
        }
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopied(true);
                toast.success('Link copied!');
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => {
                console.error("Failed to copy text: ", err);
                toast.error("Failed to copy link.");
            });
    };
    return (
        <button onClick={handleCopy} className={className}>
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
        </button>
    );
};

// Social share component
const SocialShareButtons = ({ title, url }: { title: string; url: string }) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    return (
        <div className="flex items-center gap-2">
            <Share2 size={14} className="text-neutral-400 mr-1" />
            <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors duration-200"><Twitter size={14} /></a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors duration-200"><Facebook size={14} /></a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors duration-200"><Linkedin size={14} /></a>
            <a href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors duration-200"><MessageCircle size={14} /></a>
            <CopyToClipboard textToCopy={url} className="p-1.5 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors duration-200" />
        </div>
    );
};

const PostDetailClient = ({ post }: PostDetailClientProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentContent, setCommentContent] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorEmail, setAuthorEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sanitizedHtml, setSanitizedHtml] = useState('');

    const postId = post?._id;

    // Sanitize HTML on client
    useEffect(() => {
        if (post && post.body) {
            import('dompurify').then(module => {
                const dompurify = module.default;
                setSanitizedHtml(dompurify.sanitize(post.body));
            }).catch(() => setSanitizedHtml(post.body));
        }
    }, [post]);

    // Fetch comments
    useEffect(() => {
        if (!postId) return;
        const fetchComments = async () => {
            try {
                const res = await fetch(`${baseUrl}/posts/${postId}/comments`);
                if (!res.ok) throw new Error('Failed to fetch comments.');
                const data: Comment[] = await res.json();
                setComments(data);
            } catch (err) {
                // Silently ignore or console log
            }
        };
        fetchComments();
        const intervalId = setInterval(fetchComments, 5000);
        return () => clearInterval(intervalId);
    }, [postId]);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentContent.trim() || !postId) {
            toast.error("Comment cannot be empty or post ID is missing.");
            return;
        }
        setIsSubmitting(true);
        try {
            const body = { content: commentContent, author_info: { fullName: authorName, email: authorEmail } };
            const res = await fetch(`${baseUrl}/posts/${postId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (!res.ok) throw new Error('Failed to add comment');
            setCommentContent('');
            setAuthorName('');
            setAuthorEmail('');
            toast.success("Comment added successfully!");
            // Re-fetch comments
            const updatedCommentsRes = await fetch(`${baseUrl}/posts/${postId}/comments`);
            if (updatedCommentsRes.ok) setComments(await updatedCommentsRes.json());
        } catch {
            toast.error("Could not add comment.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!post) {
        return (
            <Layout>
                <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
                    <p className="text-neutral-500 text-lg">Post not found.</p>
                </div>
            </Layout>
        );
    }

    const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/post/${post._id}` : `https://example.com/post/${post._id}`;

    // Fix the "Apply Now" button link
    const applyLink = post.jobDetails?.link;
    const finalApplyLink = applyLink && !applyLink.startsWith('http') ? `https://${applyLink}` : applyLink;

    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 bg-white">
                <article className="space-y-8">
                    {/* Header */}
                    <div className="space-y-4 pb-8 border-b border-neutral-200">
                        <div className="flex items-center justify-between">
                            {post.category && (
                                <Badge variant="default" className="capitalize">
                                    {post.category}
                                </Badge>
                            )}
                            {post.likeCount !== undefined && (
                                <span className="text-sm font-medium text-neutral-600">
                                    {post.likeCount} Likes
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-black leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                            <p className="text-sm text-neutral-500">
                                Published on {new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            <SocialShareButtons title={post.title} url={postUrl} />
                        </div>
                    </div>

                    {/* Main image */}
                    {post.image_path && (
                        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200 shadow-sm">
                            <img
                                src={post.image_path}
                                alt={post.title}
                                className="w-full h-full object-cover"
                                onError={e => { (e.currentTarget as HTMLImageElement).src = "https://placehold.co/800x600/f5f5f5/aaaaaa?text=No+Image"; }}
                            />
                        </div>
                    )}

                    {/* Job Details Section */}
                    {post.jobDetails ? (
                        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-4">
                            <h3 className="text-lg font-bold text-black border-b border-neutral-200 pb-2">Job Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-700">
                                {post.jobDetails.company && <p><span className="font-semibold text-black">Company:</span> {post.jobDetails.company}</p>}
                                {post.jobDetails.location && <p><span className="font-semibold text-black">Location:</span> {post.jobDetails.location}</p>}
                                {post.jobDetails.jobType && <p><span className="font-semibold text-black">Job Type:</span> {post.jobDetails.jobType}</p>}
                                {(post.jobDetails.salaryRange || post.jobDetails.salary) && (
                                    <p>
                                        <span className="font-semibold text-black">Salary:</span>{' '}
                                        {post.jobDetails.salaryRange || `${post.jobDetails.salary?.min} - ${post.jobDetails.salary?.max}`}
                                    </p>
                                )}
                                {post.jobDetails.applicationDeadline && (
                                    <p>
                                        <span className="font-semibold text-black">Application Deadline:</span>{' '}
                                        {new Date(post.jobDetails.applicationDeadline).toLocaleDateString()}
                                    </p>
                                )}
                            </div>

                            {post.jobDetails.requirements && post.jobDetails.requirements.length > 0 && (
                                <div className="space-y-2 pt-2">
                                    <h4 className="font-semibold text-black text-sm">Requirements:</h4>
                                    <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                                        {post.jobDetails.requirements.map((r, i) => <li key={i}>{r}</li>)}
                                    </ul>
                                </div>
                            )}

                            {post.jobDetails.responsibilities && post.jobDetails.responsibilities.length > 0 && (
                                <div className="space-y-2 pt-2">
                                    <h4 className="font-semibold text-black text-sm">Responsibilities:</h4>
                                    <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                                        {post.jobDetails.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                                    </ul>
                                </div>
                            )}

                            {finalApplyLink && (
                                <div className="pt-2">
                                    <a
                                        href={finalApplyLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-6 py-3 bg-black text-white hover:bg-neutral-800 text-sm font-medium rounded-xl shadow transition-colors"
                                    >
                                        Apply Now
                                    </a>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div
                            className="prose prose-neutral max-w-none text-black mb-10 prose-headings:text-black prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-a:text-black prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-neutral-300 prose-blockquote:text-neutral-600 prose-blockquote:italic prose-img:rounded-xl leading-relaxed text-lg"
                            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                        />
                    )}

                    {/* Share bar */}
                    <div className="flex items-center justify-between border-t border-b border-neutral-100 py-4 my-8">
                        <span className="text-sm text-neutral-500 font-medium font-sans">Share this article:</span>
                        <SocialShareButtons title={post.title} url={postUrl} />
                    </div>

                    {/* Comments Section */}
                    <div className="space-y-8 pt-8">
                        <h2 className="text-2xl font-bold text-black">Comments ({comments.length})</h2>

                        <form onSubmit={handleCommentSubmit} className="space-y-4 p-6 border border-neutral-200 rounded-2xl bg-neutral-50">
                            <h3 className="text-sm font-semibold text-black mb-2">Leave a Comment</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    type="text"
                                    placeholder="Your Name (Optional)"
                                    value={authorName}
                                    onChange={e => setAuthorName(e.target.value)}
                                    className="bg-white border-neutral-300 focus:border-black rounded-lg"
                                />
                                <Input
                                    type="email"
                                    placeholder="Your Email (Optional)"
                                    value={authorEmail}
                                    onChange={e => setAuthorEmail(e.target.value)}
                                    className="bg-white border-neutral-300 focus:border-black rounded-lg"
                                />
                            </div>
                            <Textarea
                                placeholder="Write your comment..."
                                value={commentContent}
                                onChange={e => setCommentContent(e.target.value)}
                                className="bg-white border-neutral-300 focus:border-black rounded-lg min-h-[120px]"
                            />
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-black text-white hover:bg-neutral-800 font-medium px-6 py-2.5 rounded-lg transition-colors"
                            >
                                {isSubmitting ? 'Posting...' : 'Post Comment'}
                            </Button>
                        </form>

                        <div className="space-y-4">
                            {comments.length > 0 ? (
                                comments.map(c => (
                                    <div key={c._id} className="p-5 border border-neutral-200 rounded-xl bg-white space-y-2">
                                        <div className="flex items-center justify-between text-xs text-neutral-500">
                                            <span className="font-semibold text-black">{c.author_info?.fullName || 'Anonymous User'}</span>
                                            <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-neutral-700 text-sm leading-relaxed whitespace-pre-wrap">{c.content}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-neutral-500 text-sm">No comments yet. Be the first to share your thoughts!</p>
                            )}
                        </div>
                    </div>
                </article>
            </div>
        </Layout>
    );
};

export default PostDetailClient;