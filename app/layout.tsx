import type { Metadata } from "next";
// Import fonts using next/font for optimal performance
import { Inter, Orbitron } from "next/font/google"; 

// --- Global CSS Imports ---
// These are the ONLY place global CSS files should be imported in Next.js App Router.
import "./globals.css"; // Your main global CSS file, assumed to contain @tailwind directives
import './App.css'; // Your additional global CSS file
import './index.css'; // Your additional global CSS file

// Import shared UI components
import Navbar from "../components/Navbar"; // Path corrected assuming Navbar is in components/
import Footer from "../components/Footer"; // Path corrected assuming Footer is in components/
import { Toaster } from "react-hot-toast"; // For global toast notifications

// Configure your fonts with next/font/google
// These will create CSS variables that can be used throughout your app.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Defines --font-inter CSS variable
  display: "swap", // Ensures font is displayed quickly for better UX
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron", // Defines --font-orbitron CSS variable
  display: "swap",
});

// Define global metadata for your application, used for SEO
export const metadata: Metadata = {
  title: "Edge - Modern Business Solutions", // Your application's title
  description: "Bridging the gap between ambition and achievement through scholarships, career guidance, and life-changing opportunities worldwide.", // Your application's description
};

// This is your RootLayout component, which wraps all pages in your Next.js app.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // Apply font CSS variables and core global Tailwind classes for a sticky footer layout.
        // `min-h-screen` ensures body takes at least full viewport height.
        // `flex flex-col` enables flexbox for vertical stacking.
        className={`${inter.variable} ${orbitron.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar /> {/* Your global navigation bar */}
        {/* The <main> element will hold your page-specific content. */}
        {/* `flex-1` makes it grow to fill available space, pushing Footer to bottom. */}
        {/* `pt-16` provides top padding, assuming your Navbar is fixed and ~64px tall. */}
        <main className="flex-1 pt-16">
          {children} {/* This is where the content of your individual pages (e.g., your Index component) will be rendered */}
        </main>
        <Footer /> {/* Your global footer */}
        <Toaster /> {/* React Hot Toast component for displaying notifications */}
      </body>
    </html>
  );
}
