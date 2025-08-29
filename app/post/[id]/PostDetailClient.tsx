'use client';

import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import baseURL from '@/lib/config';
import { Calendar, User, Tag, Twitter, Facebook, Linkedin, Copy, Share2, Check, MessageCircle } from "lucide-react";


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

// Social share component
const SocialShareButtons = ({ title, url }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2">
      <Share2 size={20} className="text-violet-500" />
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

const PostDetailClient = ({ post }: PostDetailClientProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentContent, setCommentContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sanitizedHtml, setSanitizedHtml] = useState('');

  const postId = post?._id;

  // Dynamically import and sanitize on the client side
  useEffect(() => {
    if (post && post.body) {
      // Dynamic import to prevent server-side issues
      import('dompurify').then(module => {
        // Access the default export, which is the sanitize function
        const dompurify = module.default;
        setSanitizedHtml(dompurify.sanitize(post.body));
      }).catch(err => {
        console.error("Failed to load DOMPurify:", err);
        // Fallback to raw HTML if sanitization fails
        setSanitizedHtml(post.body);
      });
    }
  }, [post]);

  // Fetch comments only after the post is available
  useEffect(() => {
    if (!postId) return;

    const fetchComments = async () => {
      try {
        const res = await fetch(`${baseURL}/posts/${postId}/comments`);
        if (!res.ok) {
          throw new Error('Failed to fetch comments.');
        }
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
      const res = await fetch(`${baseURL}/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error('Failed to add comment');
      setCommentContent('');
      setAuthorName('');
      setAuthorEmail('');
      toast.success("Comment added successfully!");
      // Re-fetch comments to show the new one
      const updatedCommentsRes = await fetch(`${baseURL}/posts/${postId}/comments`);
      if (updatedCommentsRes.ok) {
        const updatedCommentsData: Comment[] = await updatedCommentsRes.json();
        setComments(updatedCommentsData);
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
      toast.error("Could not add comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!post) {
    return <div className="min-h-screen flex items-center justify-center font-orbitron text-xl text-fuchsia-700">Post not found.</div>;
  }

  // The `postUrl` can be calculated safely as it doesn't depend on DOMPurify
  const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/posts/${post._id}` : `${baseURL}/posts/${post._id}`;

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
            <p className="font-inter text-sm text-violet-700/80">By {post.author?.username || 'Anonymous'} | {new Date(post.createdAt).toLocaleDateString()}</p>

            <div className="flex justify-start pt-4">
              <SocialShareButtons title={post.title} url={postUrl} />
            </div>
          </CardHeader>

          <CardContent>
            {post.image_path && (
              <img
                src={post.image_path}
                alt={post.title}
                className="w-full h-auto max-h-[400px] object-cover mb-6 rounded-xl border border-violet-100 shadow"
                onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400/CCCCCC/333333?text=Image+Error"; }}
              />
            )}
            <div
              className="font-inter text-lg leading-relaxed text-violet-800 mb-8"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />

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