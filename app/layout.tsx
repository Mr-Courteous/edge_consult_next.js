import type { Metadata } from "next";
// Import fonts using next/font for optimal performance
import { Inter, Orbitron } from "next/font/google"; 

// --- Global CSS Imports ---
import "./globals.css"; 
import './App.css'; 
import './index.css'; 

// Import shared UI components
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"; 
import { Toaster } from "react-hot-toast"; 

// Configure your fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

// Global metadata
export const metadata: Metadata = {
  title: "Edge - Modern Business Solutions",
  description: "Bridging the gap between ambition and achievement through scholarships, career guidance, and life-changing opportunities worldwide.",
  icons: {
    icon: "/edge.svg", // default favicon in public folder
  }
};

// RootLayout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon setup */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        {/* You can also add Apple touch icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${inter.variable} ${orbitron.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
