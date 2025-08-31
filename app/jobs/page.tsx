'use client'; // Add this line at the top
import { MapPin, Clock, DollarSign, Users, Briefcase, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
// import baseUrl from '@/lib/config'; // Unused import removed

const Jobs = () => {
  const jobOpenings = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      type: "Full-time",
      location: "Remote / New York",
      salary: "$120k - $150k",
      description: "Join our engineering team to build cutting-edge web applications using React, Node.js, and cloud technologies.",
      requirements: ["5+ years of experience", "React & Node.js expertise", "Cloud platform knowledge", "Strong problem-solving skills"],
      posted: "2 days ago"
    },
    {
      title: "DevOps Engineer",
      department: "Infrastructure",
      type: "Full-time",
      location: "San Francisco / Remote",
      salary: "$110k - $140k",
      description: "Lead our infrastructure automation and help scale our cloud platforms to support growing business needs.",
      requirements: ["AWS/Azure experience", "Kubernetes knowledge", "CI/CD pipeline expertise", "Infrastructure as Code"],
      posted: "1 week ago"
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote",
      salary: "$90k - $120k",
      description: "Create beautiful, intuitive user experiences that delight our clients and drive business results.",
      requirements: ["3+ years of UX/UI design", "Figma/Sketch proficiency", "User research experience", "Portfolio required"],
      posted: "3 days ago"
    },
    {
      title: "Product Manager",
      department: "Product",
      type: "Full-time",
      location: "New York / Remote",
      salary: "$130k - $160k",
      description: "Drive product strategy and work closely with engineering and design teams to deliver exceptional products.",
      requirements: ["5+ years of product management", "Technical background", "Agile methodology", "Leadership experience"],
      posted: "5 days ago"
    },
    {
      title: "Business Development Manager",
      department: "Sales",
      type: "Full-time",
      location: "Chicago / Remote",
      salary: "$80k - $100k + Commission",
      description: "Identify new business opportunities and build relationships with potential clients in the enterprise market.",
      requirements: ["B2B sales experience", "Technology industry knowledge", "Strong communication skills", "CRM experience"],
      posted: "1 week ago"
    },
    {
      title: "Data Scientist",
      department: "Analytics",
      type: "Full-time",
      location: "Boston / Remote",
      salary: "$100k - $130k",
      description: "Analyze complex datasets to provide insights that drive business decisions and improve our products.",
      requirements: ["Python/R proficiency", "Machine learning experience", "Statistical analysis", "PhD/Masters preferred"],
      posted: "4 days ago"
    }
  ];

  const benefits = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, dental, vision, and wellness programs"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Competitive Compensation",
      description: "Market-leading salaries, equity options, and performance bonuses"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Work-Life Balance",
      description: "Flexible hours, unlimited PTO, and remote work opportunities"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Growth & Development",
      description: "Learning budget, conference attendance, and mentorship programs"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      {/* <section className="section-padding bg-gradient-secondary"> */}
        {/* <div className="max-w-7xl mx-auto container-padding text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Join Team <span className="gradient-text">Edge</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Be part of a dynamic team that&apos;s shaping the future of technology. 
            We&apos;re looking for passionate individuals to help us build amazing solutions.
          </p>
        </div> */}
      {/* </section> */}

      {/* Company Culture */}
      {/* <section className="section-padding"> */}
        {/* <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold mb-6">Why Work at Edge?</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At Edge, we believe that great work happens when talented people are given 
                the freedom to innovate, grow, and make a meaningful impact. Join a team 
                that values creativity, collaboration, and continuous learning.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We&apos;re building the future of business technology, and we want you to be 
                part of that journey. From cutting-edge projects to a supportive culture, 
                Edge offers everything you need to advance your career.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover-lift">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div> */}
      {/* </section> */}

      {/* Job Openings */}
      <section className="section-padding bg-muted/50">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">Current Openings</h2>
            <p className="text-xl text-muted-foreground">
              Explore exciting opportunities to grow your career with us
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobOpenings.map((job, index) => (
              <Card key={index} className="hover-lift border-0 shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <CardTitle className="font-display text-xl mb-2">{job.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary">{job.department}</Badge>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      {job.posted}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">{job.description}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Key Requirements:</h4>
                    <ul className="space-y-1">
                      {job.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-center space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">Employee Benefits</h2>
            <p className="text-xl text-muted-foreground">
              We take care of our team with comprehensive benefits and perks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Health, dental, and vision insurance",
              "401(k) matching up to 6%",
              "Unlimited paid time off",
              "Remote work flexibility", 
              "Annual learning & development budget",
              "Top-tier equipment and tools",
              "Team retreats and events",
              "Stock options for all employees",
              "Parental leave support"
            ].map((perk, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span className="text-muted-foreground">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="font-display text-4xl font-bold mb-6">
            Don&apos;t See the Perfect Role?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            We&apos;re always looking for talented individuals. Send us your resume and 
            let us know how you&apos;d like to contribute to Edge&apos;s mission.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg">
            Send Your Resume
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Jobs;