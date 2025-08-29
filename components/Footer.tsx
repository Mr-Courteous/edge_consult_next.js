'use client';

import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#fafaff] via-violet-50 to-fuchsia-50 border-t border-violet-200 pt-10 text-violet-800">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="font-orbitron font-extrabold text-3xl mb-2 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 drop-shadow">
              Edge
            </div>
            <p className="font-inter text-violet-700/80 text-sm leading-relaxed">
              Leading provider of modern business solutions with cutting-edge technology 
              and exceptional service. We help businesses transform and grow.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook" className="text-violet-400 hover:text-fuchsia-500 transition-colors duration-200">
                <Facebook size={22} />
              </a>
              <a href="#" aria-label="Twitter" className="text-violet-400 hover:text-fuchsia-500 transition-colors duration-200">
                <Twitter size={22} />
              </a>
              <a href="#" aria-label="Linkedin" className="text-violet-400 hover:text-fuchsia-500 transition-colors duration-200">
                <Linkedin size={22} />
              </a>
              <a href="#" aria-label="Instagram" className="text-violet-400 hover:text-fuchsia-500 transition-colors duration-200">
                <Instagram size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-orbitron font-bold text-lg text-violet-800 mb-2">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/about" className="block font-inter text-violet-700/80 hover:text-fuchsia-500 transition-colors duration-200 text-sm">
                About Us
              </Link>
              <Link href="/services" className="block font-inter text-violet-700/80 hover:text-fuchsia-500 transition-colors duration-200 text-sm">
                Our Services
              </Link>
              <Link href="/how-it-works" className="block font-inter text-violet-700/80 hover:text-fuchsia-500 transition-colors duration-200 text-sm">
                How It Works
              </Link>
              <Link href="/testimonials" className="block font-inter text-violet-700/80 hover:text-fuchsia-500 transition-colors duration-200 text-sm">
                Testimonials
              </Link>
              <Link href="/blog" className="block font-inter text-violet-700/80 hover:text-fuchsia-500 transition-colors duration-200 text-sm">
                Blog
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-orbitron font-bold text-lg text-violet-800 mb-2">Resources</h3>
            <div className="space-y-2">
              <Link href="/jobs" className="block font-inter text-violet-700/80 hover:text-fuchsia-500 transition-colors duration-200 text-sm">
                Career Opportunities
              </Link>
              <a href="#" className="block font-inter text-violet-700/80 hover:text-fuchsia-500 transition-colors duration-200 text-sm">
                Support Center
              </a>
              <a href="#" className="block font-inter text-violet-700/80 hover:text-fuchsia-500 transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="block font-inter text-violet-700/80 hover:text-fuchsia-500 transition-colors duration-200 text-sm">
                Terms of Service
              </a>
              <a href="#" className="block font-inter text-violet-700/80 hover:text-fuchsia-500 transition-colors duration-200 text-sm">
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-orbitron font-bold text-lg text-violet-800 mb-2">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin size={18} className="text-fuchsia-500 flex-shrink-0" />
                <span className="font-inter text-violet-700/80">
                  123 Business Street<br />
                  Suite 100, City, State 12345
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone size={18} className="text-fuchsia-500 flex-shrink-0" />
                <span className="font-inter text-violet-700/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail size={18} className="text-fuchsia-500 flex-shrink-0" />
                <span className="font-inter text-violet-700/80">hello@edge.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-violet-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-inter text-violet-700/80 text-sm">
              © {currentYear} Edge. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="font-inter text-violet-700/80 hover:text-fuchsia-500 transition-colors duration-200">
                Privacy
              </a>
              <a href="#" className="font-inter text-violet-700/80 hover:text-fuchsia-500 transition-colors duration-200">
                Terms
              </a>
              <a href="#" className="font-inter text-violet-700/80 hover:text-fuchsia-500 transition-colors duration-200">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;