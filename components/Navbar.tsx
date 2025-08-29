'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const checkAuthStatus = () => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setIsLoggedIn(true);
                setIsAdmin(parsedUser.role === 'admin');
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setIsLoggedIn(false);
                setIsAdmin(false);
            }
        } else {
            setIsLoggedIn(false);
            setIsAdmin(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();

        const handleStorageChange = () => {
            checkAuthStatus();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setIsAdmin(false);
        setIsOpen(false);
        router.push('/admin-login');
    };

    const getNavItems = () => {
        const baseItems = [
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
            { name: "Services", path: "/services" },
            { name: "Scholarships", path: "/scholarships" },
            { name: "How It Works", path: "/how-it-works" },
            { name: "Testimonials", path: "/testimonials" },
            { name: "Jobs", path: "/jobs" },
            { name: "Blog", path: "/blog" },
        ];
        if (isAdmin) {
            return [...baseItems, { name: "Dashboard", path: "/admin/dashboard" }];
        }
        return baseItems;
    };

    const navItems = getNavItems();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="font-extrabold text-3xl bg-gradient-to-br from-blue-600 via-purple-500 to-pink-400 bg-clip-text text-transparent tracking-tight transition-transform group-hover:scale-105">
                            Edge Top Consult
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`relative px-2 py-1 font-semibold text-base rounded-lg transition-all duration-200
                                    ${
                                        isActive(item.path)
                                            ? "text-blue-600"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                                    }`}
                            >
                                {item.name}
                                {isActive(item.path) && (
                                    <span className="absolute left-1/2 -bottom-1 w-2/3 h-1 rounded-full bg-gradient-to-r from-blue-500 to-pink-400 -translate-x-1/2 transition-all" />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA/Auth Button */}
                    <div className="hidden lg:flex items-center gap-3">
                        {isAdmin ? (
                            <>
                                <Link href="/admin/dashboard">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-lg border-blue-500 text-blue-600 hover:bg-blue-50 transition shadow-sm"
                                    >
                                        <LayoutDashboard className="w-4 h-4 mr-2" />
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button
                                    variant="default"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="bg-gradient-to-br from-pink-400 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transition"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/admin/login">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-lg border-gray-400 text-gray-600 hover:bg-gray-100 transition shadow-sm"
                                    >
                                        Admin Login
                                    </Button>
                                </Link>
                                <Button
                                    variant="default"
                                    className="bg-gradient-to-r from-blue-500 to-pink-400 text-white rounded-lg shadow-md hover:shadow-lg transition"
                                >
                                    Get Started
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`lg:hidden absolute left-0 w-full transition-all duration-300 ${
                        isOpen
                            ? "top-20 opacity-100 pointer-events-auto"
                            : "top-0 opacity-0 pointer-events-none"
                    }`}
                >
                    <div className="bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-xl rounded-b-2xl py-4 px-6 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                                    isActive(item.path)
                                        ? "text-blue-600 bg-blue-50"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="border-t border-gray-100 pt-4 space-y-2">
                            {isAdmin ? (
                                <>
                                    <Link href="/admin/dashboard" onClick={() => setIsOpen(false)}>
                                        <Button
                                            variant="outline"
                                            className="w-full rounded-lg border-blue-500 text-blue-600 hover:bg-blue-50"
                                        >
                                            <LayoutDashboard className="w-4 h-4 mr-2" />
                                            Dashboard
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="default"
                                        className="w-full bg-gradient-to-br from-pink-400 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link href="/adminlogin" onClick={() => setIsOpen(false)}>
                                        <Button variant="outline" className="w-full rounded-lg border-gray-400 text-gray-600 hover:bg-gray-100">
                                            Admin Login
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="default"
                                        className="w-full bg-gradient-to-r from-blue-500 to-pink-400 text-white rounded-lg shadow-md hover:shadow-lg"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Get Started
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;