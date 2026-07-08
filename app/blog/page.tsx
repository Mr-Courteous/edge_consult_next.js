'use client';

import { Calendar, User, ArrowRight, MessageCircle, Twitter, Facebook, Linkedin, Copy, Share2, Check, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import baseUrl from '@/lib/config';
import toast from 'react-hot-toast';
import ConfirmationModal from "@/components/ConfirmationModal";

const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '');

const CopyToClipboard = ({ textToCopy, className }: { textToCopy: string; className?: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success('Link copied!');
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className={className}>
      {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
    </button>
  );
};

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDeleteId, setPostToDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try { setUser(JSON.parse(userData)); }
      catch { localStorage.removeItem('user'); }
    }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${baseUrl}/posts`);
      if (res.ok) setPosts(await res.json());
    } catch (e) {
      console.error('Failed to fetch posts:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async () => {
    if (!postToDeleteId || deleting) return;
    setDeleting(true);
    const token = localStorage.getItem('token');
    if (!token) { toast.error("Login required."); setShowDeleteModal(false); setDeleting(false); return; }
    try {
      const res = await fetch(`${baseUrl}/posts/${postToDeleteId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.msg || "Failed."); }
      setPosts(posts.filter(p => p._id !== postToDeleteId));
      toast.success("Post deleted!");
    } catch (e: any) { toast.error(e.message || "Failed to delete."); }
    finally { setShowDeleteModal(false); setPostToDeleteId(null); setDeleting(false); }
  };

  const handleSubscribe = async () => {
    if (!newsletterEmail) { toast.error("Enter your email"); return; }
    setSubscribing(true);
    try {
      const res = await fetch(`${baseUrl}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      if (res.ok) { toast.success(data.msg || "Subscribed!"); setNewsletterEmail(''); }
      else throw new Error(data.msg || "Failed");
    } catch (e: any) { toast.error(e.message || "Failed to subscribe"); }
    finally { setSubscribing(false); }
  };

  const filtered = posts.filter(post => {
    const matchCat = selectedCategory === "All" || post.category === selectedCategory;
    const matchSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stripHtml(post.body).toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const categories = ["All", "news", "nysc", "scholarships", "jobs"];

  const ShareButtons = ({ title, url }: { title: string; url: string }) => {
    const eu = encodeURIComponent(url);
    const et = encodeURIComponent(title);
    return (
      <div className="flex items-center gap-2">
        <a href={`https://twitter.com/intent/tweet?url=${eu}&text=${et}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors"><Twitter size={14} /></a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${eu}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors"><Facebook size={14} /></a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${eu}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors"><Linkedin size={14} /></a>
        <CopyToClipboard textToCopy={url} className="p-1.5 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors" />
      </div>
    );
  };

  return (
    <Layout>
      {/* Category filter */}
      <section className="py-3 bg-white border-b border-neutral-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-sm px-5 py-2 rounded-full font-medium transition-all duration-200 border ${
                selectedCategory === cat
                  ? "bg-black text-white border-black"
                  : "bg-white text-neutral-600 border-neutral-300 hover:border-black hover:text-black"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-3">Latest Articles</h1>
            <p className="text-neutral-500 text-lg">Insights, news, and opportunities — all in one place</p>
          </div>

          <div className="flex justify-center mb-10">
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full max-w-md border-neutral-300 focus:border-black rounded-full px-5"
            />
          </div>

          {loading ? (
            <div className="text-center py-24 flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-neutral-300" />
              <p className="text-neutral-400">Loading posts…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-neutral-400 text-lg">No posts found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(post => (
                <article
                  key={post._id}
                  className="group flex flex-col bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-neutral-100 overflow-hidden">
                    {post.image_path ? (
                      <img
                        src={post.image_path}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={e => { (e.currentTarget as HTMLImageElement).src = "https://placehold.co/600x400/f5f5f5/aaaaaa?text=No+Image"; }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl text-neutral-200">📄</div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* Meta row */}
                    <div className="flex items-center gap-3 mb-3 text-xs text-neutral-500">
                      <span className="px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded-full font-medium capitalize">{post.category}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-black leading-snug mb-3 line-clamp-2 group-hover:text-neutral-700 transition-colors">
                      {post.title}
                    </h2>

                    {/* Preview */}
                    {post.category === "jobs" && post.jobDetails ? (
                      <div className="text-sm text-neutral-600 space-y-1 mb-4">
                        {post.jobDetails.company && <p><span className="font-semibold text-black">Company:</span> {post.jobDetails.company}</p>}
                        {post.jobDetails.location && <p><span className="font-semibold text-black">Location:</span> {post.jobDetails.location}</p>}
                        {post.jobDetails.jobType && <p><span className="font-semibold text-black">Type:</span> {post.jobDetails.jobType}</p>}
                        {(post.jobDetails.salaryRange || post.jobDetails.salary) && (
                          <p><span className="font-semibold text-black">Salary:</span> {post.jobDetails.salaryRange || `${post.jobDetails.salary?.min} – ${post.jobDetails.salary?.max}`}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-neutral-500 line-clamp-3 mb-4 leading-relaxed">
                        {stripHtml(post.body).substring(0, 150)}…
                      </p>
                    )}

                    {/* Footer */}
                    <div className="mt-auto pt-4 border-t border-neutral-100 space-y-3">
                      <div className="flex items-center justify-between text-xs text-neutral-500">
                        <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{post.author?.name || "Admin"}</span>
                        <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" />{post.commentCount ?? 0} comments</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Share2 size={13} className="text-neutral-400 shrink-0" />
                        <ShareButtons title={post.title} url={`${window.location.origin}/post/${post._id}`} />
                        {user?.role === 'admin' && (
                          <button
                            className="ml-auto p-1.5 rounded-full text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            onClick={() => { setPostToDeleteId(post._id); setShowDeleteModal(true); }}
                            disabled={deleting}
                          >
                            {deleting && postToDeleteId === post._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => router.push(`/post/${post._id}`)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-neutral-200 text-sm font-medium text-black hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                      >
                        Read Article <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-neutral-950">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">Stay in the Loop</h2>
          <p className="text-neutral-400 mb-8">Get the latest posts and opportunities delivered straight to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="your@email.com"
              value={newsletterEmail}
              onChange={e => setNewsletterEmail(e.target.value)}
              className="flex-1 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-white rounded-full px-5"
            />
            <button
              onClick={handleSubscribe}
              disabled={subscribing}
              className="bg-white text-black font-semibold px-7 py-2.5 rounded-full hover:bg-neutral-100 transition shrink-0"
            >
              {subscribing ? "Subscribing…" : "Subscribe"}
            </button>
          </div>
        </div>
      </section>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDeletePost}
        message="Delete this post? This action cannot be undone."
        isLoading={deleting}
      />
    </Layout>
  );
};

export default Blog;
