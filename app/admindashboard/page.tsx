'use client'; 

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { PlusCircle, FileText, Users, LogOut, Upload, MessageCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import baseURL from '@/lib/config';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dashboardData, setDashboardData] = useState(null);
    const [metricsData, setMetricsData] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        body: "",
        category: "",
        author: "",
        country: "",
        degree: "",
        funding: "",
        deadline: "",
        requirements: []
    });
    const [currentRequirement, setCurrentRequirement] = useState("");
    const router = useRouter();

    // Helper function to handle authentication errors
    const handleAuthError = (message) => {
        toast.error(`Authentication Error: ${message}`);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/adminlogin');
    };

    const fetchDashboardData = async (token) => {
        try {
            const [dashboardResponse, metricsResponse] = await Promise.all([
                fetch(`${baseURL}/admin-dashboard`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch(`${baseURL}/metrics`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);

            if (dashboardResponse.status === 401 || metricsResponse.status === 401) {
                handleAuthError("Session expired. Please log in again.");
                return;
            }

            if (dashboardResponse.ok) {
                const data = await dashboardResponse.json();
                setDashboardData(data);
            }

            if (metricsResponse.ok) {
                const metrics = await metricsResponse.json();
                setMetricsData(metrics);
            }

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            toast.error("Connection Error: Failed to fetch dashboard data. Please try again later.");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (!token || !userData) {
            router.push('/adminlogin');
            return;
        }

        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setFormData(prev => ({ ...prev, author: parsedUser.id }));

        fetchDashboardData(token);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/adminlogin');
        toast.success("You have been successfully logged out.");
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleAddTag = (e) => {
        if (e) e.preventDefault();
        if (currentTag.trim() && !tags.includes(currentTag.trim())) {
            setTags([...tags, currentTag.trim()]);
            setCurrentTag("");
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleAddRequirement = (e) => {
        if (e) e.preventDefault();
        if (currentRequirement.trim()) {
            setFormData(prev => ({
                ...prev,
                requirements: [...prev.requirements, currentRequirement.trim()]
            }));
            setCurrentRequirement("");
        }
    };

    const handleRemoveRequirement = (reqToRemove) => {
        setFormData(prev => ({
            ...prev,
            requirements: prev.requirements.filter(req => req !== reqToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title || !formData.body || !formData.category || !user?.id) {
            toast.error("Please fill in all required fields and ensure you are logged in.");
            return;
        }

        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            const formDataToSend = new FormData();
            
            formDataToSend.append('title', formData.title);
            formDataToSend.append('body', formData.body);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('author', user.id); 
            formDataToSend.append('tags', JSON.stringify(tags));

            if (formData.category === 'scholarships') {
                formDataToSend.append('country', formData.country);
                formDataToSend.append('degree', formData.degree);
                formDataToSend.append('funding', formData.funding);
                formDataToSend.append('deadline', formData.deadline);
                formDataToSend.append('requirements', JSON.stringify(formData.requirements));
            }
            
            if (selectedImage) {
                formDataToSend.append('image', selectedImage);
            }
            
            const response = await fetch(`${baseURL}/add-posts`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            if (response.status === 401) {
                handleAuthError("Session expired or token is invalid. Please log in again.");
                return;
            }

            const data = await response.json();

            if (response.ok) {
                toast.success("Blog post created successfully!");
                
                setFormData({
                    title: "",
                    body: "",
                    category: "",
                    author: user?.id || "",
                    country: "",
                    degree: "",
                    funding: "",
                    deadline: "",
                    requirements: []
                });
                setTags([]);
                setSelectedImage(null);
                
                const fileInput = document.getElementById('image');
                if (fileInput) fileInput.value = '';
                
                window.location.reload(); // Consider using router.refresh() or re-fetching data instead of full reload
                
            } else {
                toast.error(data.message || "Failed to create post");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Failed to connect to server or process request. Check console for details.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (!user || !dashboardData || !metricsData) {
        return <div className="min-h-screen flex items-center justify-center font-orbitron text-xl text-violet-700">Loading dashboard...</div>;
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-violet-700 to-fuchsia-700 py-8">
                <div className="max-w-7xl mx-auto px-4 md:px-10">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h1 className="font-orbitron text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">Admin Dashboard</h1>
                            <p className="font-inter text-md text-violet-200">Welcome back, {user.name}!</p>
                        </div>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="border-violet-400 text-violet-100 bg-white/10 hover:bg-violet-900/40 font-orbitron"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-7 mb-12">
                        <Card className="bg-gradient-to-br from-white via-violet-100 to-fuchsia-100 shadow-xl rounded-2xl">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="font-orbitron text-sm font-medium text-violet-700">Total Posts</CardTitle>
                                <FileText className="h-5 w-5 text-fuchsia-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="font-orbitron text-2xl font-extrabold text-violet-800">{dashboardData?.totalPosts ?? '--'}</div>
                                <p className="font-inter text-xs text-violet-700/80">Total posts created</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-white via-violet-100 to-fuchsia-100 shadow-xl rounded-2xl">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="font-orbitron text-sm font-medium text-violet-700">Total Users</CardTitle>
                                <Users className="h-5 w-5 text-indigo-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="font-orbitron text-2xl font-extrabold text-violet-800">{dashboardData?.users.length ?? '--'}</div>
                                <p className="font-inter text-xs text-violet-700/80">Number of registered users</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-white via-violet-100 to-fuchsia-100 shadow-xl rounded-2xl">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="font-orbitron text-sm font-medium text-violet-700">Total Comments</CardTitle>
                                <MessageCircle className="h-5 w-5 text-violet-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="font-orbitron text-2xl font-extrabold text-violet-800">
                                    {metricsData?.postsWithMostComments?.reduce((total, post) => total + post.commentCount, 0) ?? '--'}
                                </div>
                                <p className="font-inter text-xs text-violet-700/80">All comments received</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-white via-violet-100 to-fuchsia-100 shadow-xl rounded-2xl">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="font-orbitron text-sm font-medium text-violet-700">Total Likes</CardTitle>
                                <Eye className="h-5 w-5 text-fuchsia-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="font-orbitron text-2xl font-extrabold text-violet-800">
                                    {metricsData?.postsWithMostLikes?.reduce((total, post) => total + post.likeCount, 0) ?? '--'}
                                </div>
                                <p className="font-inter text-xs text-violet-700/80">All likes received</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Create Post Form */}
                    <Card className="bg-gradient-to-br from-white via-violet-100 to-fuchsia-100 shadow-xl rounded-2xl">
                        <CardHeader>
                            <CardTitle className="flex items-center font-orbitron text-lg md:text-xl text-violet-800">
                                <PlusCircle className="w-5 h-5 mr-2 text-fuchsia-500" />
                                Create New Blog Post
                            </CardTitle>
                            <CardDescription className="font-inter text-violet-700/80">
                                Share your insights and knowledge with the community
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6 font-inter">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="title" className="font-orbitron">Post Title *</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            required
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Enter post title"
                                            className="mt-1"
                                        />
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="category" className="font-orbitron">Category *</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) => setFormData(prev => ({
                                                ...prev,
                                                category: value,
                                                country: value !== 'scholarships' ? "" : prev.country,
                                                degree: value !== 'scholarships' ? "" : prev.degree,
                                                funding: value !== 'scholarships' ? "" : prev.funding,
                                                deadline: value !== 'scholarships' ? "" : prev.deadline,
                                                requirements: value !== 'scholarships' ? [] : prev.requirements,
                                            }))}
                                        >
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="news">News</SelectItem>
                                                <SelectItem value="nysc">NYSC</SelectItem>
                                                <SelectItem value="scholarships">Scholarships</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Scholarship-specific fields, rendered conditionally */}
                                {formData.category === 'scholarships' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-violet-200 rounded-xl bg-violet-50/50">
                                        <h3 className="font-orbitron text-lg font-bold col-span-2 text-violet-800">Scholarship Details</h3>
                                        <div>
                                            <Label htmlFor="country" className="font-orbitron">Country</Label>
                                            <Input
                                                id="country"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                                placeholder="e.g., United Kingdom"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="degree" className="font-orbitron">Degree Level</Label>
                                            <Input
                                                id="degree"
                                                name="degree"
                                                value={formData.degree}
                                                onChange={handleChange}
                                                placeholder="e.g., Masters, PhD"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="funding" className="font-orbitron">Funding</Label>
                                            <Input
                                                id="funding"
                                                name="funding"
                                                value={formData.funding}
                                                onChange={handleChange}
                                                placeholder="e.g., Full funding, Partial funding"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="deadline" className="font-orbitron">Deadline</Label>
                                            <Input
                                                id="deadline"
                                                name="deadline"
                                                value={formData.deadline}
                                                onChange={handleChange}
                                                placeholder="e.g., November 2024"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <Label htmlFor="requirements" className="font-orbitron">Requirements</Label>
                                            <div className="flex gap-2 mt-1">
                                                <Input
                                                    id="requirements"
                                                    value={currentRequirement}
                                                    onChange={(e) => setCurrentRequirement(e.target.value)}
                                                    placeholder="Add a requirement"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            handleAddRequirement();
                                                        }
                                                    }}
                                                />
                                                <Button type="button" onClick={handleAddRequirement} variant="outline" className="border-violet-300 text-violet-800 font-orbitron">
                                                    Add
                                                </Button>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {formData.requirements.map((req, index) => (
                                                    <Badge key={index} variant="secondary" className="cursor-pointer font-orbitron" onClick={() => handleRemoveRequirement(req)}>
                                                        {req} ×
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <Label htmlFor="image" className="font-orbitron">Featured Image</Label>
                                    <div className="mt-1">
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="cursor-pointer font-inter"
                                        />
                                        <p className="text-sm text-violet-700/80 mt-1 font-inter">
                                            Upload a featured image for your post (optional)
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="body" className="font-orbitron">Post Content *</Label>
                                    <Textarea
                                            id="body"
                                            name="body"
                                            required
                                            value={formData.body}
                                            onChange={handleChange}
                                            placeholder="Write your post content here..."
                                            className="mt-1 min-h-[200px] font-inter"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="tags" className="font-orbitron">Tags</Label>
                                    <div className="flex gap-2 mt-1">
                                        <Input
                                            id="tags"
                                            value={currentTag}
                                            onChange={(e) => setCurrentTag(e.target.value)}
                                            placeholder="Add a tag"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleAddTag();
                                                }
                                            }}
                                            className="font-inter"
                                        />
                                        <Button type="button" onClick={handleAddTag} variant="outline" className="border-violet-300 text-violet-800 font-orbitron">
                                            Add
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {tags.map((tag, index) => (
                                            <Badge key={index} variant="secondary" className="cursor-pointer font-orbitron" onClick={() => handleRemoveTag(tag)}>
                                                {tag} ×
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 text-white font-orbitron font-semibold px-8 py-4 text-lg shadow-xl hover:scale-105 hover:from-fuchsia-600 hover:to-violet-600 transition-all duration-200 border-none"
                                >
                                    {isLoading ? (
                                        "Publishing..."
                                    ) : (
                                        <>
                                            <Upload className="w-4 h-4 mr-2" />
                                            Publish Post
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;