import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import React from "react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  avatar: string;
}

interface Stat {
  number: string;
  label: string;
  desc: string;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Mitchell",
      role: "CEO, TechFlow Solutions",
      company: "TechFlow Solutions",
      rating: 5,
      text: "Edge transformed our entire business process. Their team's expertise and dedication resulted in a 40% increase in our operational efficiency. The solution they built is robust, scalable, and exactly what we needed.",
      avatar: "SM",
    },
    {
      name: "David Chen",
      role: "CTO, InnovateCorp",
      company: "InnovateCorp",
      rating: 5,
      text: "Working with Edge was a game-changer for our company. They delivered a complex custom software solution on time and within budget. The ongoing support has been exceptional.",
      avatar: "DC",
    },
    {
      name: "Maria Rodriguez",
      role: "Operations Director, GrowthLab",
      company: "GrowthLab",
      rating: 5,
      text: "The cloud migration Edge handled for us was seamless. Zero downtime, improved performance, and significant cost savings. Their expertise in cloud solutions is unmatched.",
      avatar: "MR",
    },
    {
      name: "James Wilson",
      role: "Founder, StartupBoost",
      company: "StartupBoost",
      rating: 5,
      text: "Edge helped us scale from a small startup to a thriving business. Their mobile app development expertise and strategic guidance were instrumental in our success.",
      avatar: "JW",
    },
    {
      name: "Lisa Thompson",
      role: "IT Manager, SecureBank",
      company: "SecureBank",
      rating: 5,
      text: "The cybersecurity solution Edge implemented gave us peace of mind. Their comprehensive approach to security and compliance has protected our business and our customers.",
      avatar: "LT",
    },
    {
      name: "Robert Kim",
      role: "VP of Technology, DataDriven",
      company: "DataDriven",
      rating: 5,
      text: "Edge's business intelligence solution revolutionized how we analyze data. The insights we gain now drive all our strategic decisions. Outstanding work from an exceptional team.",
      avatar: "RK",
    },
  ];

  const stats: Stat[] = [
    { number: "98%", label: "Client Satisfaction", desc: "Based on project completion surveys" },
    { number: "4.9/5", label: "Average Rating", desc: "Across all client reviews" },
    { number: "95%", label: "Repeat Clients", desc: "Come back for additional projects" },
    { number: "100%", label: "On-Time Delivery", desc: "Projects completed within deadline" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-secondary">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Client <span className="gradient-text">Testimonials</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover what our clients say about working with Edge and the results
            they've achieved through our partnership.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="font-display text-4xl md:text-5xl font-bold text-primary">
                  {stat.number}
                </div>
                <div className="font-semibold text-lg">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-muted/50">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground">
              Real feedback from real clients who've experienced the Edge difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift border-0 shadow-md bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-primary/20" />
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-sm text-primary">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto container-padding">
          <Card className="border-0 shadow-lg bg-gradient-secondary">
            <CardContent className="p-12 text-center">
              <Quote className="w-12 h-12 text-primary mx-auto mb-6" />
              <blockquote className="text-2xl md:text-3xl font-light mb-8 leading-relaxed text-foreground">
                "Edge didn't just deliver a solution; they became a true partner in our growth.
                Their innovative approach and unwavering commitment to excellence set them apart
                in the industry. We couldn't be happier with the results."
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  AJ
                </div>
                <div className="text-left">
                  <div className="font-display text-xl font-semibold">Alex Johnson</div>
                  <div className="text-muted-foreground">CEO, FutureTech Industries</div>
                  <div className="flex space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <h2 className="font-display text-4xl font-bold mb-12">Trusted by Industry Leaders</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-80">
            {["TechFlow", "InnovateCorp", "GrowthLab", "StartupBoost", "SecureBank"].map((company, index) => (
              <div key={index} className="font-display text-xl font-semibold">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="font-display text-4xl font-bold mb-6">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Experience the Edge difference and become our next success story
          </p>
          <div className="space-y-4">
            <button className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300">
              Start Your Project Today
            </button>
            <div className="text-white/80 text-sm">
              Join 500+ satisfied clients who chose Edge for their success
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
