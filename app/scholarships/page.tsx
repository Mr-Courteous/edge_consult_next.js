'use client';

import { useState, useEffect } from "react";
import { GraduationCap, Globe, Calendar, DollarSign, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import NewsletterSignup from "@/components/NewsletterSignup";
// import EbookDownload from "@/components/EbookDownload";
import toast from 'react-hot-toast';
import baseUrl from '@/lib/config';
import Link from "next/link";

const Scholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const response = await fetch(`${baseUrl}/scholarships`);
                if (!response.ok) {
                    throw new Error('Failed to fetch scholarship posts');
                }
                const data = await response.json();
                setScholarships(data);
            } catch (error) {
                console.error("Error fetching scholarships:", error);
                toast.error("Could not load scholarships. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchScholarships();
    }, []);

    const ebooks = [
        {
            title: "Complete Scholarship Application Guide",
            description: "A comprehensive guide covering everything from finding scholarships to writing winning applications. Includes templates and real examples."
        },
        {
            title: "Study Abroad Success Stories",
            description: "Inspiring stories from students who successfully secured scholarships and studied abroad. Learn from their experiences and strategies."
        },
        {
            title: "Statement of Purpose Writing Masterclass",
            description: "Master the art of writing compelling SOPs that get you noticed. Includes step-by-step instructions and sample essays."
        }
    ];

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center font-orbitron text-xl text-violet-700">Loading scholarships...</div>;
    }

    return (
        <Layout>
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-indigo-900 via-violet-700 to-fuchsia-700 text-white">
                <div className="max-w-7xl mx-auto px-4 md:px-10 text-center">
                    <h1 className="font-orbitron text-4xl md:text-6xl font-extrabold mb-8">
                        Scholarship <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400">Opportunities</span>
                    </h1>
                    <p className="font-inter text-xl text-white/90 max-w-3xl mx-auto mb-8 font-light drop-shadow">
                        Discover life-changing scholarship opportunities worldwide. From undergraduate to PhD programs,
                        find the perfect funding for your educational journey.
                    </p>
                    <Button size="lg" className="bg-white text-violet-700 font-orbitron font-semibold px-8 py-4 text-lg shadow-lg hover:scale-105 transition-all duration-200 mb-6">
                        <GraduationCap className="mr-2" size={22} />
                        Start Your Search
                    </Button>
                </div>
            </section>

            {/* Featured Scholarships */}
            <section className="py-20 bg-gradient-to-b from-white via-violet-50 to-fuchsia-50">
                <div className="max-w-7xl mx-auto px-4 md:px-10">
                    <div className="text-center mb-16">
                        <h2 className="font-orbitron text-3xl md:text-4xl font-extrabold mb-4 text-violet-900 drop-shadow-lg">Featured Scholarships</h2>
                        <p className="font-inter text-xl text-violet-700/80 font-light">
                            Current opportunities with upcoming deadlines
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                        {scholarships.length > 0 ? (
                            scholarships.map((post) => (
                                <Card key={post._id} className="bg-gradient-to-br from-white via-violet-100 to-fuchsia-100 shadow-xl rounded-2xl hover:scale-105 transition-all duration-200 border-none">
                                    <CardHeader>
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <CardTitle className="font-orbitron text-xl mb-2 text-violet-800">{post.title}</CardTitle>
                                                <div className="flex items-center gap-2 text-sm text-violet-700/80 font-inter">
                                                    <Globe className="w-4 h-4" />
                                                    {post.scholarshipDetails?.country || 'N/A'}
                                                </div>
                                            </div>
                                            <Badge variant="secondary" className="bg-violet-100 text-violet-800 font-orbitron">
                                                {post.scholarshipDetails?.degree || 'N/A'}
                                            </Badge>
                                        </div>
                                        <p className="font-inter text-violet-700/80 text-sm">{post.body}</p>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4 text-fuchsia-500" />
                                                <span className="font-inter text-sm font-medium">{post.scholarshipDetails?.funding || 'N/A'}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-violet-500" />
                                                <span className="font-inter text-sm font-medium">{post.scholarshipDetails?.deadline || 'N/A'}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="mb-6">
                                            <h4 className="font-orbitron font-semibold text-sm mb-2 text-violet-800">Requirements:</h4>
                                            <ul className="space-y-1">
                                                {post.scholarshipDetails?.requirements?.map((req, reqIndex) => (
                                                    <li key={reqIndex} className="flex items-center gap-2 text-sm font-inter text-violet-800">
                                                        <div className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full"></div>
                                                        <span>{req}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        <Link href={`/post/${post._id}`}>
                                            <Button variant="outline" className="w-full font-orbitron border-violet-300 text-violet-800 hover:bg-violet-50 transition-colors duration-200">
                                                Learn More & Apply
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-full text-center font-orbitron text-violet-700">
                                <p>No scholarship opportunities available at the moment. Please check back later!</p>
                            </div>
                        )}
                    </div>

                    {/* Newsletter Signup */}
                    <div className="max-w-md mx-auto mb-16">
                        <NewsletterSignup />
                    </div>
                </div>
            </section>

            {/* Free Resources */}
            <section className="py-20 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-indigo-100">
                <div className="max-w-7xl mx-auto px-4 md:px-10">
                    <div className="text-center mb-16">
                        <h2 className="font-orbitron text-3xl md:text-4xl font-extrabold mb-4 text-violet-900 drop-shadow-lg">Free Educational Resources</h2>
                        <p className="font-inter text-xl text-violet-700/80 font-light">
                            Download our comprehensive guides to boost your scholarship applications
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {ebooks.map((ebook, index) => (
                            <Card key={index} className="bg-gradient-to-br from-white via-violet-100 to-fuchsia-100 shadow-xl rounded-2xl hover:scale-105 transition-all duration-200 border-none">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                                            <BookOpen className="w-5 h-5 text-fuchsia-500" />
                                        </div>
                                        <h3 className="font-orbitron text-lg font-semibold text-violet-800">{ebook.title}</h3>
                                    </div>
                                    <p className="font-inter text-violet-700/80 text-sm mb-6">{ebook.description}</p>
                                    {/* <EbookDownload title={ebook.title} description={ebook.description} /> */}
                                    <Button className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 text-white font-orbitron px-6 py-3 shadow hover:scale-105 transition-all duration-200 w-full">
                                        Download
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-fuchsia-700 via-violet-700 to-indigo-900 text-white">
                <div className="max-w-4xl mx-auto px-4 md:px-10 text-center">
                    <h2 className="font-orbitron text-3xl md:text-4xl font-extrabold mb-6 drop-shadow-2xl">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="font-inter text-xl mb-8 text-white/90 font-light drop-shadow">
                        Get personalized guidance for your scholarship applications and study abroad dreams
                    </p>
                    <Button size="lg" className="bg-gradient-to-r from-white to-violet-300 text-violet-700 font-orbitron font-semibold px-10 py-5 text-xl shadow-lg hover:scale-105 transition-all duration-200">
                        Book a Consultation
                    </Button>
                </div>
            </section>
        </Layout>
    );
};

export default Scholarships;