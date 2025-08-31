'use client';

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { PlusCircle, FileText, Users, LogOut, Upload, MessageCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import baseURL from '@/lib/config';

const TiptapEditor = dynamic(() => import("@/components/TiptapEditor"), { ssr: false });

interface User {
    id: string;
    name: string;
}

interface DashboardData {
    totalPosts: number;
    users: { name: string; email: string }[];
}

interface MetricsData {
    postsWithMostComments: Array<{ commentCount: number; }>;
    postsWithMostLikes: Array<{ likeCount: number; }>;
}

// ⬅️ NEW: Define a type for the entire form state to ensure type safety
interface FormDataState {
    title: string;
    body: string;
    category: string;
    author: string;
    // Scholarship fields
    country: string;
    degree: string;
    funding: string;
    deadline: string;
    scholarshipRequirements: string[];
    // Job fields
    company: string;
    location: string;
    salaryRange: string;
    jobType: string;
    applicationDeadline: string;
    responsibilities: string[];
    jobRequirements: string[];
    link: string;
}

const AdminDashboard = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [metricsData, setMetricsData] = useState<MetricsData | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState("");

    const [formData, setFormData] = useState<FormDataState>({
        title: "",
        body: "",
        category: "",
        author: "",
        country: "",
        degree: "",
        funding: "",
        deadline: "",
        scholarshipRequirements: [],
        company: "",
        location: "",
        salaryRange: "",
        jobType: "",
        applicationDeadline: "",
        responsibilities: [],
        jobRequirements: [],
        link: "",
    });

    const [currentScholarshipRequirement, setCurrentScholarshipRequirement] = useState("");
    const [currentJobRequirement, setCurrentJobRequirement] = useState("");
    const [currentResponsibility, setCurrentResponsibility] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => setIsMounted(true), []);

    const handleAuthError = useCallback((message: string) => {
        toast.error(`Authentication Error: ${message}`);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/adminlogin');
    }, [router]);

    const fetchDashboardData = useCallback(async (token: string) => {
        try {
            const [dashboardResponse, metricsResponse] = await Promise.all([
                fetch(`${baseURL}/admin-dashboard`, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`${baseURL}/metrics`, { headers: { 'Authorization': `Bearer ${token}` } })
            ]);

            if (dashboardResponse.status === 401 || metricsResponse.status === 401) {
                handleAuthError("Session expired. Please log in again.");
                return;
            }

            const dashboardJson: DashboardData = await dashboardResponse.json();
            const metricsJson: MetricsData = await metricsResponse.json();
            setDashboardData(dashboardJson);
            setMetricsData(metricsJson);

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            toast.error("Connection Error: Failed to fetch dashboard data. Please try again later.");
        }
    }, [handleAuthError]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            handleAuthError("Not authenticated. Please log in.");
            return;
        }

        try {
            const parsedUser: User = JSON.parse(userData);
            setUser(parsedUser);
            setFormData(prev => ({ ...prev, author: parsedUser.id }));
            fetchDashboardData(token);
        } catch (error) {
            console.error("Failed to parse user data from localStorage:", error);
            handleAuthError("Invalid user data. Please log in again.");
        }
    }, [fetchDashboardData, handleAuthError]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/adminlogin');
        toast.success("You have been successfully logged out.");
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleAddTag = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (currentTag.trim() && !tags.includes(currentTag.trim())) {
            setTags([...tags, currentTag.trim()]);
            setCurrentTag("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleAddScholarshipRequirement = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (currentScholarshipRequirement.trim()) {
            setFormData(prev => ({
                ...prev,
                scholarshipRequirements: [...prev.scholarshipRequirements, currentScholarshipRequirement.trim()]
            }));
            setCurrentScholarshipRequirement("");
        }
    };

    const handleRemoveScholarshipRequirement = (reqToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            scholarshipRequirements: prev.scholarshipRequirements.filter(req => req !== reqToRemove)
        }));
    };

    const handleAddJobRequirement = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (currentJobRequirement.trim()) {
            setFormData(prev => ({
                ...prev,
                jobRequirements: [...prev.jobRequirements, currentJobRequirement.trim()]
            }));
            setCurrentJobRequirement("");
        }
    };

    const handleRemoveJobRequirement = (reqToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            jobRequirements: prev.jobRequirements.filter(req => req !== reqToRemove)
        }));
    };

    const handleAddResponsibility = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (currentResponsibility.trim()) {
            setFormData(prev => ({
                ...prev,
                responsibilities: [...prev.responsibilities, currentResponsibility.trim()]
            }));
            setCurrentResponsibility("");
        }
    };

    const handleRemoveResponsibility = (resToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            responsibilities: prev.responsibilities.filter(res => res !== resToRemove)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const textOnly = formData.body.replace(/<[^>]*>/g, "").trim();

        if (!formData.title || !textOnly || !formData.category || !user?.id) {
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
                formDataToSend.append('requirements', JSON.stringify(formData.scholarshipRequirements));
            } else if (formData.category === 'jobs') {
                formDataToSend.append('company', formData.company);
                formDataToSend.append('location', formData.location);
                formDataToSend.append('salaryRange', formData.salaryRange);
                formDataToSend.append('jobType', formData.jobType);
                formDataToSend.append('applicationDeadline', formData.applicationDeadline);
                formDataToSend.append('responsibilities', JSON.stringify(formData.responsibilities));
                formDataToSend.append('requirements', JSON.stringify(formData.jobRequirements));
                formDataToSend.append('link', formData.link);
            }

            if (selectedImage) {
                formDataToSend.append('image', selectedImage);
            }

            const response = await fetch(`${baseURL}/add-posts`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formDataToSend,
            });

            if (response.status === 401) {
                handleAuthError("Session expired or token is invalid. Please log in again.");
                return;
            }

            const data = await response.json();

            if (response.ok) {
                toast.success("Blog post created successfully!");
                window.location.reload();
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (!user || !dashboardData || !metricsData) {
        return (
            <div className="min-h-screen flex items-center justify-center font-orbitron text-xl text-violet-700">
                Loading dashboard...
            </div>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-violet-700 to-fuchsia-700 py-8">
                <div className="max-w-7xl mx-auto px-4 md:px-10">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h1 className="font-orbitron text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">Admin Dashboard</h1>
                            <p className="font-inter text-md text-violet-200">Welcome back, {user.name}!</p>
                        </div>
                        <Button onClick={handleLogout} variant="outline" className="border-violet-400 text-violet-100 bg-white/10 hover:bg-violet-900/40 font-orbitron">
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>

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
                                        <Input id="title" name="title" required value={formData.title} onChange={handleChange} placeholder="Enter post title" className="mt-1" />
                                    </div>
                                    <div>
                                        <Label htmlFor="category" className="font-orbitron">Category *</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) => setFormData(prev => ({
                                                ...prev,
                                                category: value,
                                                // Reset all specific fields when category changes
                                                country: "", degree: "", funding: "", deadline: "", scholarshipRequirements: [],
                                                company: "", location: "", salaryRange: "", jobType: "", applicationDeadline: "", responsibilities: [], jobRequirements: [], link: ""
                                            }))}
                                        >
                                            <SelectTrigger className="mt-1 font-inter bg-gradient-to-r from-fuchsia-50 via-violet-50 to-indigo-50 border-violet-200 transition-colors duration-200 hover:bg-violet-100">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gradient-to-r from-fuchsia-50 via-violet-50 to-indigo-50 font-inter">
                                                <SelectItem value="news" className="hover:bg-violet-100">News</SelectItem>
                                                <SelectItem value="nysc" className="hover:bg-violet-100">NYSC</SelectItem>
                                                <SelectItem value="scholarships" className="hover:bg-violet-100">Scholarships</SelectItem>
                                                <SelectItem value="jobs" className="hover:bg-violet-100">Jobs</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Conditional fields for Scholarships */}
                                {formData.category === 'scholarships' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-violet-200 rounded-xl bg-violet-50/50">
                                        <h3 className="font-orbitron text-lg font-bold col-span-2 text-violet-800">Scholarship Details</h3>
                                        <div>
                                            <Label htmlFor="country" className="font-orbitron">Country</Label>
                                            <Input id="country" name="country" value={formData.country} onChange={handleChange} placeholder="e.g., United Kingdom" className="mt-1" />
                                        </div>
                                        <div>
                                            <Label htmlFor="degree" className="font-orbitbon">Degree Level</Label>
                                            <Input id="degree" name="degree" value={formData.degree} onChange={handleChange} placeholder="e.g., Masters, PhD" className="mt-1" />
                                        </div>
                                        <div>
                                            <Label htmlFor="funding" className="font-orbitron">Funding</Label>
                                            <Input id="funding" name="funding" value={formData.funding} onChange={handleChange} placeholder="e.g., Full funding, Partial funding" className="mt-1" />
                                        </div>
                                        <div>
                                            <Label htmlFor="deadline" className="font-orbitron">Deadline</Label>
                                            <Input id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} placeholder="e.g., November 2024" className="mt-1" />
                                        </div>
                                        <div className="col-span-2">
                                            <Label htmlFor="scholarshipRequirements" className="font-orbitron">Requirements</Label>
                                            <div className="flex gap-2 mt-1">
                                                <Input
                                                    id="scholarshipRequirements"
                                                    value={currentScholarshipRequirement}
                                                    onChange={(e) => setCurrentScholarshipRequirement(e.target.value)}
                                                    placeholder="Add a requirement"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            handleAddScholarshipRequirement();
                                                        }
                                                    }}
                                                />
                                                <Button type="button" onClick={handleAddScholarshipRequirement} variant="outline" className="border-violet-300 text-violet-800 font-orbitron">Add</Button>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {formData.scholarshipRequirements.map((req, index) => (
                                                    <Badge key={index} variant="secondary" className="cursor-pointer font-orbitron" onClick={() => handleRemoveScholarshipRequirement(req)}>{req} ×</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Conditional fields for Jobs */}
                                {formData.category === 'jobs' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-violet-200 rounded-xl bg-violet-50/50">
                                        <h3 className="font-orbitron text-lg font-bold col-span-2 text-violet-800">Job Details</h3>
                                        <div>
                                            <Label htmlFor="company" className="font-orbitron">Company Name</Label>
                                            <Input id="company" name="company" value={formData.company} onChange={handleChange} placeholder="e.g., Google" className="mt-1" />
                                        </div>
                                        <div>
                                            <Label htmlFor="location" className="font-orbitron">Job Location</Label>
                                            <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Remote, Lagos, Nigeria" className="mt-1" />
                                        </div>
                                        <div>
                                            <Label htmlFor="jobType" className="font-orbitron">Job Type</Label>
                                            <Input id="jobType" name="jobType" value={formData.jobType} onChange={handleChange} placeholder="e.g., Full-time, Internship" className="mt-1" />
                                        </div>
                                        <div>
                                            <Label htmlFor="salaryRange" className="font-orbitron">Salary Range</Label>
                                            <Input id="salaryRange" name="salaryRange" value={formData.salaryRange} onChange={handleChange} placeholder="e.g., $90k - $120k" className="mt-1" />
                                        </div>
                                        <div>
                                            <Label htmlFor="applicationDeadline" className="font-orbitron">Application Deadline</Label>
                                            <Input id="applicationDeadline" name="applicationDeadline" type="date" value={formData.applicationDeadline} onChange={handleChange} className="mt-1" />
                                        </div>
                                        <div>
                                            <Label htmlFor="link" className="font-orbitron">Application Link</Label>
                                            <Input id="link" name="link" value={formData.link} onChange={handleChange} placeholder="e.g., https://example.com/apply" className="mt-1" />
                                        </div>
                                        <div className="col-span-2">
                                            <Label htmlFor="responsibilities" className="font-orbitron">Responsibilities</Label>
                                            <div className="flex gap-2 mt-1">
                                                <Input
                                                    id="responsibilities"
                                                    value={currentResponsibility}
                                                    onChange={(e) => setCurrentResponsibility(e.target.value)}
                                                    placeholder="Add a responsibility"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            handleAddResponsibility();
                                                        }
                                                    }}
                                                />
                                                <Button type="button" onClick={handleAddResponsibility} variant="outline" className="border-violet-300 text-violet-800 font-orbitron">Add</Button>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {formData.responsibilities.map((res, index) => (
                                                    <Badge key={index} variant="secondary" className="cursor-pointer font-orbitron" onClick={() => handleRemoveResponsibility(res)}>{res} ×</Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <Label htmlFor="jobRequirements" className="font-orbitron">Requirements</Label>
                                            <div className="flex gap-2 mt-1">
                                                <Input
                                                    id="jobRequirements"
                                                    value={currentJobRequirement}
                                                    onChange={(e) => setCurrentJobRequirement(e.target.value)}
                                                    placeholder="Add a requirement"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            handleAddJobRequirement();
                                                        }
                                                    }}
                                                />
                                                <Button type="button" onClick={handleAddJobRequirement} variant="outline" className="border-violet-300 text-violet-800 font-orbitron">Add</Button>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {formData.jobRequirements.map((req, index) => (
                                                    <Badge key={index} variant="secondary" className="cursor-pointer font-orbitron" onClick={() => handleRemoveJobRequirement(req)}>{req} ×</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <Label htmlFor="image" className="font-orbitron">Featured Image</Label>
                                    <div className="mt-1">
                                        <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer font-inter" />
                                        <p className="text-sm text-violet-700/80 mt-1 font-inter">
                                            Upload a featured image for your post (optional)
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <Label className="font-orbitron">Post Content *</Label>
                                    {isMounted && (
                                        <div className="mt-2">
                                            <TiptapEditor
                                                value={formData.body}
                                                onChange={(html: string) => setFormData(prev => ({ ...prev, body: html }))}
                                                placeholder="Write your post content here. Use the toolbar to bold, italicize, or add links..."
                                            />
                                        </div>
                                    )}
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
                                        <Button type="button" onClick={handleAddTag} variant="outline" className="border-violet-300 text-violet-800 font-orbitron">Add</Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {tags.map((tag, index) => (
                                            <Badge key={index} variant="secondary" className="cursor-pointer font-orbitron" onClick={() => handleRemoveTag(tag)}>{tag} ×</Badge>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 text-white font-orbitron font-semibold px-8 py-4 text-lg shadow-xl hover:scale-105 hover:from-fuchsia-600 hover:to-violet-600 transition-all duration-200 border-none"
                                >
                                    {isLoading ? "Publishing..." : (<><Upload className="w-4 h-4 mr-2" />Publish Post</>)}
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