'use client';
import { Code, Cloud, Shield, BarChart, Smartphone, Headphones } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const Services = () => {
  const services = [
    {
      icon: <Code className="w-8 h-8 text-fuchsia-500" />,
      title: "Scholarship & Study Abroad Guidance",
      description: "Up-to-date information on scholarships and admissions worldwide, with step-by-step application guidance.",
      features: ["Global scholarship opportunities", "Application process guidance", "Document preparation", "Interview coaching"]
    },
    {
      icon: <Cloud className="w-8 h-8 text-violet-500" />,
      title: "Academic & Career Consulting",
      description: "Tailored consulting for choosing academic paths and planning career transitions for a brighter future.",
      features: ["Academic path planning", "Career transition guidance", "Professional development", "Goal setting strategies"]
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-500" />,
      title: "Academic Research Support",
      description: "Comprehensive research assistance with guidance, resources, and support for scholarly excellence.",
      features: ["Research methodology", "Quality assurance", "Originality verification", "Academic writing support"]
    },
    {
      icon: <BarChart className="w-8 h-8 text-fuchsia-500" />,
      title: "CV, SOP & Document Preparation",
      description: "Professional document crafting that meets international standards and helps you stand out.",
      features: ["Professional CVs", "Statement of Purpose", "Cover letters", "International standards"]
    },
    {
      icon: <Smartphone className="w-8 h-8 text-violet-500" />,
      title: "Digital & Printing Solutions",
      description: "Reliable digital hub services including typing, printing, scanning, and general ICT support.",
      features: ["Typing & printing", "Document scanning", "Internet access", "ICT support services"]
    },
    {
      icon: <Headphones className="w-8 h-8 text-indigo-500" />,
      title: "Edge Elevate Talk",
      description: "Motivational and inspirational talks fostering personal growth, resilience, and success-driven mindsets.",
      features: ["Motivational speaking", "Personal development", "Success strategies", "Mindset transformation"]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-white via-violet-50/60 to-fuchsia-50/60 text-violet-950 border-b border-violet-100/40">
        <div className="max-w-7xl mx-auto px-4 md:px-10 text-center">
          <h1 className="font-outfit text-4xl md:text-6xl font-extrabold mb-8">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600">Services</span>
          </h1>
          <p className="font-plus-jakarta text-xl text-neutral-600 max-w-3xl mx-auto mb-8 font-light">
            Comprehensive solutions designed to accelerate your growth and transformation journey.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-b from-white via-violet-50/20 to-fuchsia-50/20">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <Card key={index} className="bg-white border border-violet-100/50 shadow-md rounded-2xl hover:scale-105 transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-violet-50 border border-violet-100 rounded-lg flex items-center justify-center shadow-sm">
                      {service.icon}
                    </div>
                    <CardTitle className="font-outfit text-2xl text-violet-900">{service.title}</CardTitle>
                  </div>
                  <p className="font-plus-jakarta text-neutral-500">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm font-plus-jakarta text-neutral-600">
                        <div className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full font-outfit border-violet-600 text-violet-700 hover:bg-violet-50 transition-colors duration-200">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-white via-violet-50/10 to-white border-t border-violet-100/40">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="text-center mb-16">
            <h2 className="font-outfit text-3xl md:text-4xl font-extrabold mb-4 text-violet-950">Our Process</h2>
            <p className="font-plus-jakarta text-xl text-neutral-600 font-light">
              A proven methodology that ensures successful delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              { step: "01", title: "Discovery", desc: "We analyze your needs and requirements" },
              { step: "02", title: "Planning", desc: "Strategic roadmap and project planning" },
              { step: "03", title: "Development", desc: "Building your solution with agile methodology" },
              { step: "04", title: "Delivery", desc: "Testing, deployment, and ongoing support" }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-fuchsia-500 to-violet-600 rounded-full flex items-center justify-center text-white font-outfit font-extrabold text-lg mx-auto mb-4 shadow-md">
                  {phase.step}
                </div>
                <h3 className="font-outfit text-xl font-semibold mb-2 text-violet-900">{phase.title}</h3>
                <p className="font-plus-jakarta text-neutral-500 text-sm">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 text-center bg-gradient-to-br from-white via-violet-50/55 to-fuchsia-50/55 border border-violet-100/70 shadow-xl rounded-3xl text-violet-950">
          <h2 className="font-outfit text-3xl md:text-4xl font-extrabold mb-6">
            Ready to Get Started?
          </h2>
          <p className="font-plus-jakarta text-xl mb-8 text-neutral-600 font-light">
            Let&apos;s discuss how our services can help transform your goals.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white font-outfit font-semibold px-10 py-5 text-xl shadow-md hover:scale-105 hover:from-fuchsia-600 hover:to-violet-700 transition-all duration-200 border-none">
            Schedule a Consultation
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;