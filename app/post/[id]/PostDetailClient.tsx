import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { Copy, Share2, Check, MessageCircle, Twitter, Facebook, Linkedin } from "lucide-react";

// --- UI Components ---
// Simple custom component for Badge
const Badge = ({ variant, className, children }) => {
    let baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
    let variantStyles = "";

    switch (variant) {
        case "secondary":
            variantStyles = "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80";
            break;
        default:
            variantStyles = "border-transparent bg-violet-500 text-white hover:bg-violet-500/80";
            break;
    }

    return (
        <div className={`${baseStyles} ${variantStyles} ${className}`}>
            {children}
        </div>
    );
};

// Simple custom components for Card
const Card = ({ className, children }) => (
    <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}>
        {children}
    </div>
);
const CardHeader = ({ className, children }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
        {children}
    </div>
);
const CardContent = ({ className, children }) => (
    <div className={`p-6 pt-0 ${className}`}>
        {children}
    </div>
);

// Simple custom component for Textarea
const Textarea = ({ className, value, onChange, placeholder }) => (
    <textarea
        className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
    />
);

// Simple custom component for Button
const Button = ({ variant, size, onClick, className, disabled, type, children }) => {
    let baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    let variantStyles = "";
    let sizeStyles = "";

    switch (variant) {
        case "ghost":
            variantStyles = "bg-transparent text-gray-900 hover:bg-gray-100";
            break;
        default:
            variantStyles = "bg-primary text-primary-foreground hover:bg-primary/90";
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
const Input = ({ type, placeholder, value, onChange, className }) => (
    <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
);

// The Layout component is not provided, so we'll create a simple placeholder.
const Layout = ({ children }) => (
    <div className="bg-white min-h-screen font-inter">
        {children}
    </div>
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
    author?: { username: string };
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
const CopyToClipboard = ({ textToCopy, className }) => {
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
        <Button variant="ghost" size="icon" onClick={handleCopy} className={className}>
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        </Button>
    );
};

// Social share component
const SocialShareButtons = ({ title, url }) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    return (
        <div className="flex items-center gap-2">
            <Share2 size={20} className="text-violet-500" />
            <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-violet-500 hover:text-sky-400 hover:bg-violet-100 transition-colors duration-200"><Twitter size={20} /></a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-violet-500 hover:text-blue-600 hover:bg-violet-100 transition-colors duration-200"><Facebook size={20} /></a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-violet-500 hover:text-blue-700 hover:bg-violet-100 transition-colors duration-200"><Linkedin size={20} /></a>
            <a href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-violet-500 hover:text-green-500 hover:bg-violet-100 transition-colors duration-200"><MessageCircle size={20} /></a>
            <CopyToClipboard textToCopy={url} className="p-1 rounded-full text-violet-500 hover:text-fuchsia-500 hover:bg-violet-100 transition-colors duration-200" />
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
                const res = await fetch(`https://your-backend-api.com/posts/${postId}/comments`);
                if (!res.ok) throw new Error('Failed to fetch comments.');
                const data: Comment[] = await res.json();
                setComments(data);
            } catch (err) {
                console.error("Error fetching comments:", err);
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
            const res = await fetch(`https://your-backend-api.com/posts/${postId}/comments`, {
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
            const updatedCommentsRes = await fetch(`https://your-backend-api.com/posts/${postId}/comments`);
            if (updatedCommentsRes.ok) setComments(await updatedCommentsRes.json());
        } catch {
            toast.error("Could not add comment.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!post) return <div className="min-h-screen flex items-center justify-center font-orbitron text-xl text-fuchsia-700">Post not found.</div>;

    const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/posts/${post._id}` : `https://example.com/posts/${post._id}`;

    // Fix the "Apply Now" button link
    const applyLink = post.jobDetails?.link;
    const finalApplyLink = applyLink && !applyLink.startsWith('http') ? `https://${applyLink}` : applyLink;

    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
                <Card className="bg-gradient-to-br from-white via-violet-50 to-fuchsia-50 shadow-2xl rounded-2xl">
                    <CardHeader className="space-y-4">
                        <div className="flex items-center justify-between">
                            {post.category && <Badge variant="secondary" className="font-orbitron">{post.category.charAt(0).toUpperCase() + post.category.slice(1)}</Badge>}
                            {post.likeCount !== undefined && <span className="font-inter text-violet-700 font-bold">{post.likeCount} Likes</span>}
                        </div>
                        <h1 className="font-orbitron text-3xl md:text-4xl font-extrabold text-violet-900 drop-shadow mb-3">{post.title}</h1>
                        <p className="font-inter text-sm text-violet-700/80 flex items-center gap-2">
                            {new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
                        </p>
                        <div className="flex justify-start pt-4">
                            <SocialShareButtons title={post.title} url={postUrl} />
                        </div>
                    </CardHeader>

                    <CardContent>
                        {post.image_path && (
                            <img src={post.image_path} alt={post.title} className="w-full h-auto max-h-[400px] object-cover mb-6 rounded-xl border border-violet-100 shadow"
                                onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400/CCCCCC/333333?text=Image+Error"; }} />
                        )}

                        {/* Job Details Section */}
                        {post.jobDetails ? (
                            <div className="mb-8 p-6 bg-gradient-to-r from-violet-50 via-fuchsia-50 to-indigo-50 rounded-2xl shadow-inner border border-violet-200 space-y-3">
                                {post.jobDetails.company && <p><strong>Company:</strong> {post.jobDetails.company}</p>}
                                {post.jobDetails.location && <p><strong>Location:</strong> {post.jobDetails.location}</p>}
                                {post.jobDetails.jobType && <p><strong>Job Type:</strong> {post.jobDetails.jobType}</p>}
                                {post.jobDetails.salaryRange || post.jobDetails.salary ? (
                                    <p><strong>Salary:</strong> {post.jobDetails.salaryRange || `${post.jobDetails.salary?.min} - ${post.jobDetails.salary?.max}`}</p>
                                ) : null}
                                {post.jobDetails.applicationDeadline && (
                                    <p><strong>Application Deadline:</strong> {new Date(post.jobDetails.applicationDeadline).toLocaleDateString()}</p>
                                )}
                                {post.jobDetails.requirements?.length > 0 && (
                                    <div>
                                        <strong>Requirements:</strong>
                                        <ul className="list-disc list-inside">{post.jobDetails.requirements.map((r, i) => <li key={i}>{r}</li>)}</ul>
                                    </div>
                                )}
                                {post.jobDetails.responsibilities?.length > 0 && (
                                    <div>
                                        <strong>Responsibilities:</strong>
                                        <ul className="list-disc list-inside">{post.jobDetails.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>
                                    </div>
                                )}

                                {/* Fixed Apply Now button */}
                                {finalApplyLink && (
                                    <a
                                        href={finalApplyLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 text-white font-orbitron rounded-xl shadow-lg hover:scale-105 transition-all duration-200"
                                    >
                                        Apply Now
                                    </a>
                                )}
                            </div>
                        ) : (
                            <div className="font-inter text-lg leading-relaxed text-violet-800 mb-8" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
                        )}

                        <div className="flex justify-start my-8">
                            <SocialShareButtons title={post.title} url={postUrl} />
                        </div>

                        <hr className="my-8 border-violet-200" />

                        <h2 className="font-orbitron text-2xl md:text-3xl font-bold mb-4 text-violet-900 drop-shadow">Comments ({comments.length})</h2>

                        <form onSubmit={handleCommentSubmit} className="space-y-4 mb-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input type="text" placeholder="Your Full Name (Optional)" value={authorName} onChange={e => setAuthorName(e.target.value)} className="font-inter" />
                                <Input type="email" placeholder="Your Email (Optional)" value={authorEmail} onChange={e => setAuthorEmail(e.target.value)} className="font-inter" />
                            </div>
                            <Textarea placeholder="Add a comment..." value={commentContent} onChange={e => setCommentContent(e.target.value)} className="font-inter min-h-[100px]" />
                            <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 text-white font-orbitron px-8 py-3 shadow-lg hover:scale-105 transition-all duration-200">
                                {isSubmitting ? 'Posting...' : 'Post Comment'}
                            </Button>
                        </form>
                        
                        <div className="space-y-5">
                            {comments.length > 0 ? comments.map(c => (
                                <Card key={c._id} className="bg-gradient-to-r from-violet-100 via-fuchsia-50 to-indigo-100 shadow rounded-lg">
                                    <CardContent className="pt-6 font-inter">
                                        <p className="font-orbitron font-semibold text-violet-800">{c.author_info?.fullName || 'Anonymous User'}</p>
                                        <p className="text-xs text-violet-700/80">{new Date(c.createdAt).toLocaleDateString()}</p>
                                        <p className="mt-2 text-base text-violet-900">{c.content}</p>
                                    </CardContent>
                                </Card>
                            )) : <p className="font-inter text-violet-700/80">No comments yet.</p>}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
};

export default PostDetailClient;
