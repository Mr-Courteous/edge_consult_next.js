'use client';

import { Users, Target, Award, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";

const aboutValues = [
  {
    icon: <Target className="w-7 h-7 text-fuchsia-500" />,
    title: "Customer-Focused",
    desc: "Every decision we make puts our customers first."
  },
  {
    icon: <Lightbulb className="w-7 h-7 text-violet-500" />,
    title: "Innovation-Driven",
    desc: "We constantly evolve to stay ahead of the curve."
  },
  {
    icon: <Award className="w-7 h-7 text-indigo-500" />,
    title: "Excellence",
    desc: "We maintain the highest standards in everything we do."
  }
];

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    desc: "20+ years in business strategy"
  },
  {
    name: "Michael Chen",
    role: "CTO",
    desc: "Expert in emerging technologies"
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Operations",
    desc: "Operational excellence specialist"
  }
];

const stats = [
  { number: "2018", label: "Founded" },
  { number: "500+", label: "Projects Completed" },
  { number: "50+", label: "Team Members" },
  { number: "25+", label: "Industry Awards" }
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-indigo-900 via-violet-700 to-fuchsia-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 w-full py-20">
          <div className="max-w-4xl mx-auto text-center px-4 md:px-12">
            <h1 className="font-orbitron text-4xl md:text-6xl font-extrabold mb-8 leading-tight text-white drop-shadow-2xl tracking-tight">
              About <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400">Edge</span>
            </h1>
            <p className="font-inter text-lg md:text-2xl mb-6 text-white/90 leading-relaxed font-light drop-shadow">
              We&apos;re passionate about helping businesses unlock their full potential
              through innovative technology and strategic solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-white via-violet-50 to-fuchsia-50">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-5 text-violet-900 tracking-tight">
                Our Mission
              </h2>
              <p className="font-inter text-lg text-violet-700/80 mb-6 leading-relaxed font-light">
                To empower businesses of all sizes with cutting-edge technology solutions 
                that drive growth, efficiency, and innovation. We believe every organization 
                deserves access to world-class tools and expertise.
              </p>
              <p className="font-inter text-lg text-violet-700/80 leading-relaxed font-light">
                Since our founding, we&apos;ve been committed to delivering exceptional value 
                through personalized service, innovative solutions, and unwavering dedication 
                to our clients&apos; success.
              </p>
            </div>
            <div className="space-y-8">
              {aboutValues.map((value, idx) => (
                <div key={idx} className="flex items-start space-x-5">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-violet-200 via-fuchsia-100 to-indigo-100 rounded-lg flex items-center justify-center shadow-lg">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="font-orbitron text-lg md:text-xl font-bold mb-1 text-violet-800">{value.title}</h3>
                    <p className="font-inter text-violet-700/80 font-light">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4 text-violet-900 tracking-tight">
              Meet Our Team
            </h2>
            <p className="font-inter text-xl text-violet-700/80 font-light">
              The brilliant minds behind Edge&apos;s success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {teamMembers.map((member, idx) => (
              <Card key={idx} className="text-center bg-gradient-to-br from-white via-violet-100 to-fuchsia-100 shadow-xl rounded-2xl hover:scale-105 transition-all duration-200">
                <CardContent className="p-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="font-orbitron text-xl font-semibold mb-2 text-violet-800">{member.name}</h3>
                  <p className="font-inter text-base text-fuchsia-600 font-medium mb-2">{member.role}</p>
                  <p className="font-inter text-violet-700/80 text-sm font-light">{member.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-violet-700 via-indigo-700 to-fuchsia-700 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-xl shadow-lg bg-violet-800/70 py-8 px-4 flex flex-col items-center"
              >
                <div className="font-orbitron text-3xl md:text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 drop-shadow-lg">
                  {stat.number}
                </div>
                <div className="font-inter text-base md:text-lg font-medium text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}