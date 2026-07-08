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
      <section className="relative min-h-[75vh] flex items-center justify-center bg-gradient-to-br from-white via-violet-50/60 to-fuchsia-50/60 overflow-hidden">
        <div className="absolute inset-0 bg-white/70 z-0" />
        <div
          className="absolute inset-0 z-0 bg-bottom bg-cover opacity-10" 
          style={{
            backgroundImage: `url(${heroBg.src})`
          }}
        />
        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center px-4 md:px-12">
            <h1 className="font-outfit text-[2.8rem] md:text-[4rem] font-extrabold mb-8 leading-tight pt-16 md:pt-24 text-violet-950 tracking-tight">
              Transform Your Future with
              <br />
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600">
                Edge Top Consult
              </span>
            </h1>
            <p className="font-plus-jakarta text-lg md:text-2xl mb-10 text-neutral-600 leading-relaxed font-light">
              Bridging the gap between ambition and achievement through scholarships,
              career guidance, and life-changing opportunities worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2 mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white font-outfit font-semibold px-8 py-4 text-lg shadow-lg hover:scale-105 hover:from-fuchsia-600 hover:to-violet-700 transition-all duration-200 border-none"
              >
                Discover Opportunities
                <ArrowRight className="ml-2" size={22} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-violet-600 text-violet-700 bg-white hover:bg-violet-50 font-plus-jakarta px-8 py-4 text-lg shadow-sm hover:scale-105 transition-all duration-200"
              >
                Free Resources
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white via-violet-50/20 to-fuchsia-50/20">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="text-center mb-16">
            <h2 className="font-outfit text-3xl md:text-4xl font-bold mb-6 text-violet-950 tracking-tight">
              Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 via-violet-700 to-indigo-700">Edge Top Consult</span>?
            </h2>
            <p className="font-plus-jakarta text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto font-light">
              Every individual deserves access to opportunities that can transform their future.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift border border-violet-100/50 bg-white shadow-md rounded-2xl transition-all duration-300">
                <CardContent className="p-10 text-center flex flex-col items-center">
                  <span className="flex justify-center items-center mb-6 rounded-full bg-violet-50 p-5 shadow-sm">
                    {feature.icon}
                  </span>
                  <h3 className="font-outfit text-lg md:text-xl font-semibold mb-3 text-violet-900">{feature.title}</h3>
                  <p className="font-plus-jakarta text-base text-neutral-500 font-light">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-white via-violet-50/30 to-white text-violet-950 border-y border-violet-100/50">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="animate-fade-in rounded-xl shadow-sm bg-white border border-violet-100/60 py-8 px-4 flex flex-col items-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="font-outfit text-3xl md:text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 drop-shadow-sm">{stat.number}</div>
                <div className="font-plus-jakarta text-base md:text-lg font-medium text-neutral-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 text-center bg-gradient-to-br from-white via-violet-50/55 to-fuchsia-50/55 border border-violet-100/70 shadow-xl rounded-3xl text-violet-950">
          <h2 className="font-outfit text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="font-plus-jakarta text-lg md:text-xl mb-10 text-neutral-600 font-light">
            Join hundreds of successful individuals and start your transformation today.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white font-outfit font-semibold px-12 py-5 text-xl shadow-md hover:scale-105 hover:from-fuchsia-600 hover:to-violet-700 transition-all duration-200 border-none"
          >
            Start Your Journey
            <ArrowRight className="ml-2" size={24} />
          </Button>
        </div>
      </section>
    </>
  );
}