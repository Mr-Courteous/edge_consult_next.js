'use client';

import { ArrowRight, Zap, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroBg from "./assets/hero-bg.jpg";

// --- Feature Data ---
const features = [
  {
    icon: <Zap className="w-10 h-10 text-violet-600" />,
    title: "Global Opportunities",
    description: "Scholarships, study abroad & internships worldwide."
  },
  {
    icon: <Shield className="w-10 h-10 text-violet-600" />,
    title: "Expert Guidance",
    description: "Professional consulting for academics & career."
  },
  {
    icon: <Users className="w-10 h-10 text-violet-600" />,
    title: "Personalized Support",
    description: "Solutions tailored to your unique goals."
  }
];

// --- Stats Data ---
const stats = [
  { number: "500+", label: "Success Stories" },
  { number: "50+", label: "Countries" },
  { number: "24/7", label: "Support" },
  { number: "100%", label: "Commitment" }
];

export default function Index() {
  return (
    <>
      {/* Modern HERO */}
      <section className="relative min-h-[75vh] flex items-center justify-center bg-gradient-to-br from-indigo-900 via-violet-700 to-fuchsia-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div
          className="absolute inset-0 z-0 bg-bottom bg-cover opacity-20" // <-- FIXED LINE: Changed from 'bg-contain bg-no-repeat' to 'bg-cover' and added 'bg-bottom'
          style={{
            backgroundImage: `url(${heroBg.src})`
          }}
        />
        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center px-4 md:px-12">
            <h1 className="font-orbitron text-[2.8rem] md:text-[4rem] font-extrabold mb-8 leading-tight pt-16 md:pt-24 text-white drop-shadow-2xl tracking-tight">
              Transform Your Future with
              <br />
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400">
                Edge Top Consult
              </span>
            </h1>
            <p className="font-inter text-lg md:text-2xl mb-10 text-white/90 leading-relaxed font-light drop-shadow">
              Bridging the gap between ambition and achievement through scholarships,
              career guidance, and life-changing opportunities worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2 mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white font-orbitron font-semibold px-8 py-4 text-lg shadow-xl hover:scale-105 hover:from-fuchsia-600 hover:to-violet-600 transition-all duration-200 border-none"
              >
                Discover Opportunities
                <ArrowRight className="ml-2" size={22} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-violet-300 text-violet-100 bg-white/10 hover:bg-violet-900/40 font-inter px-8 py-4 text-lg shadow-xl hover:scale-105 transition-all duration-200"
              >
                Free Resources
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white via-violet-50 to-fuchsia-50">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-6 text-violet-900 tracking-tight">
              Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 via-violet-700 to-indigo-700">Edge Top Consult</span>?
            </h2>
            <p className="font-inter text-lg md:text-xl text-violet-700/80 max-w-2xl mx-auto font-light">
              Every individual deserves access to opportunities that can transform their future.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift border-none bg-gradient-to-br from-white via-violet-100 to-fuchsia-100 shadow-xl rounded-2xl transition-all duration-300">
                <CardContent className="p-10 text-center flex flex-col items-center">
                  <span className="flex justify-center items-center mb-6 rounded-full bg-violet-100 p-5 shadow-lg">
                    {feature.icon}
                  </span>
                  <h3 className="font-orbitron text-lg md:text-xl font-semibold mb-3 text-violet-800">{feature.title}</h3>
                  <p className="font-inter text-base text-violet-700/80 font-light">{feature.description}</p>
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
            {stats.map((stat, index) => (
              <div
                key={index}
                className="animate-fade-in rounded-xl shadow-lg bg-violet-800/70 py-8 px-4 flex flex-col items-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="font-orbitron text-3xl md:text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 drop-shadow-lg">{stat.number}</div>
                <div className="font-inter text-base md:text-lg font-medium text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-fuchsia-700 via-violet-700 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-10 text-center">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-6 drop-shadow-2xl">
            Ready to Transform Your Future?
          </h2>
          <p className="font-inter text-lg md:text-xl mb-10 text-white/90 font-light drop-shadow">
            Join hundreds of successful individuals and start your transformation today.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-white to-violet-300 text-violet-700 font-orbitron font-semibold px-12 py-5 text-xl shadow-2xl hover:scale-105 hover:from-violet-100 hover:to-white transition-all duration-200"
          >
            Start Your Journey
            <ArrowRight className="ml-2" size={24} />
          </Button>
        </div>
      </section>
    </>
  );
}