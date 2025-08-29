'use client'; // Add this line at the top
import { MessageCircle, FileText, Cog, Rocket, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import baseUrl from '@/lib/config';

const HowItWorks = () => {
  const steps = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Initial Consultation",
      description: "We start with a detailed discussion to understand your business needs, challenges, and goals.",
      details: [
        "Free 30-minute consultation call",
        "Requirements gathering session", 
        "Business analysis and recommendations",
        "Custom proposal preparation"
      ]
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Project Planning",
      description: "Our team creates a comprehensive project plan with timelines, milestones, and deliverables.",
      details: [
        "Detailed project roadmap",
        "Resource allocation planning",
        "Risk assessment and mitigation",
        "Clear timeline and milestones"
      ]
    },
    {
      icon: <Cog className="w-8 h-8" />,
      title: "Development & Implementation",
      description: "We execute the plan using agile methodology with regular updates and feedback sessions.",
      details: [
        "Agile development sprints",
        "Regular progress updates",
        "Continuous testing and quality assurance",
        "Client feedback integration"
      ]
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Launch & Support",
      description: "We deploy your solution and provide ongoing support to ensure continued success.",
      details: [
        "Seamless deployment process",
        "User training and documentation",
        "24/7 technical support",
        "Performance monitoring and optimization"
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-secondary">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            How We <span className="gradient-text">Work</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our proven process ensures seamless project delivery from initial consultation 
            to ongoing support and optimization.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-primary mb-1">Step {index + 1}</div>
                      <h3 className="font-display text-3xl font-bold">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <Card className="border-0 shadow-lg bg-gradient-secondary p-8">
                    <CardContent className="p-0">
                      <div className="aspect-video bg-gradient-primary/10 rounded-lg flex items-center justify-center">
                        <div className="text-6xl text-primary/20">
                          {step.icon}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-muted/50">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">Project Timeline</h2>
            <p className="text-xl text-muted-foreground">
              Typical project phases and expected timeframes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { phase: "Week 1-2", title: "Discovery & Planning", desc: "Requirements gathering and project setup" },
              { phase: "Week 3-8", title: "Development", desc: "Core development and feature implementation" },
              { phase: "Week 9-10", title: "Testing & Refinement", desc: "Quality assurance and final adjustments" },
              { phase: "Week 11+", title: "Launch & Support", desc: "Deployment and ongoing maintenance" }
            ].map((timeline, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-display font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <div className="text-sm font-medium text-primary mb-2">{timeline.phase}</div>
                <h3 className="font-display text-lg font-semibold mb-2">{timeline.title}</h3>
                <p className="text-muted-foreground text-sm">{timeline.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Common questions about our process and approach
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "How long does a typical project take?",
                a: "Project timelines vary based on complexity, but most projects are completed within 6-12 weeks from start to finish."
              },
              {
                q: "Can I make changes during development?",
                a: "Absolutely! Our agile approach allows for flexibility and incorporates your feedback throughout the development process."
              },
              {
                q: "What kind of support do you provide after launch?",
                a: "We offer comprehensive post-launch support including bug fixes, updates, monitoring, and feature enhancements."
              },
              {
                q: "How do you ensure project quality?",
                a: "We use rigorous testing procedures, code reviews, and quality assurance protocols throughout the development process."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold mb-3">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="font-display text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Let's schedule a consultation to discuss your needs and how we can help
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg">
            Schedule Free Consultation
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;