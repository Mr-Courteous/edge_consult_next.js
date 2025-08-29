'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import toast from 'react-hot-toast';
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import baseURL from '@/lib/config';

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
}

// Define the interface for a comment
interface Comment {
  _id: string;
  content: string;
  author_info: { fullName?: string; email?: string };
  createdAt: string;
}

const PostDetailClient = () => {
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]); // Use the Comment interface
  const [isLoading, setIsLoading] = useState(true);
  const [commentContent, setCommentContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }
    const fetchPost = async () => {
      try {
        const res = await fetch(`${baseURL}/posts/${id}`);
        if (!res.ok) {
          if (res.status === 404) setPost(null);
          throw new Error(`Failed to fetch post: ${res.statusText}`);
        }
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
        toast.error("Could not load post. It might not exist.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const fetchComments = async () => {
      try {
        const res = await fetch(`${baseURL}/posts/${id}/comments`);
        if (!res.ok) {
          throw new Error('Failed to fetch comments with status: ' + res.status);
        }
        const data: Comment[] = await res.json(); // Explicitly type the data
        setComments(data);
      } catch (err) {
        // Do not log a console error here as it might be expected (e.g., no comments found)
      }
    };
    fetchComments();
    const intervalId = setInterval(fetchComments, 5000);
    return () => clearInterval(intervalId);
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }
    if (!authorName.trim() && !authorEmail.trim()) {
      toast.error("Name or email is required.");
      return;
    }
    setIsSubmitting(true);
    try {
      const body = { content: commentContent, author_info: { fullName: authorName, email: authorEmail } };
      const res = await fetch(`${baseURL}/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error('Failed to add comment');
      setCommentContent('');
      setAuthorName('');
      setAuthorEmail('');
      toast.success("Comment added successfully!");
      const updatedCommentsRes = await fetch(`${baseURL}/posts/${id}/comments`);
      if (updatedCommentsRes.ok) {
        const updatedCommentsData: Comment[] = await updatedCommentsRes.json(); // Explicitly type the data
        setComments(updatedCommentsData);
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
      toast.error("Could not add comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-orbitron text-xl text-violet-700">Loading post...</div>;
  if (!post) return <div className="min-h-screen flex items-center justify-center font-orbitron text-xl text-fuchsia-700">Post not found.</div>;

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
            <div className="font-inter whitespace-pre-wrap text-lg leading-relaxed text-violet-800 mb-8">{post.body}</div>

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
                    <p className="font-orbitron font-semibold text-violet-800">{c.author?.fullName || c.author_info?.fullName || 'Anonymous User'}</p>
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