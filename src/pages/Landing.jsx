import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check, BookOpen, Users, BarChart3, Shield, Zap, Globe } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Landing() {
  const features = [
    {
      icon: BookOpen,
      title: "Complete Book Management",
      description: "Track your entire library inventory with ISBN, categories, copies, and availability status.",
    },
    {
      icon: Users,
      title: "Student Management",
      description: "Manage student profiles, track issued books, calculate fines, and monitor library usage.",
    },
    {
      icon: BarChart3,
      title: "Insightful Reports",
      description: "Get detailed analytics on book circulation, overdue items, fines collected, and user activity.",
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description: "Granular permissions for Super Admin, Library Admin, Librarian, and Student roles.",
    },
    {
      icon: Zap,
      title: "Automated Operations",
      description: "Auto-calculate fines, send notifications, track due dates, and manage returns efficiently.",
    },
    {
      icon: Globe,
      title: "Multi-Tenant Ready",
      description: "Perfect for managing multiple libraries with complete data isolation and independent settings.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">LibraryMS</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </a>
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" data-testid="button-login">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button data-testid="button-signup">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Modern Library Management for the Digital Age
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Streamline your library operations with our comprehensive multi-tenant platform.
                Manage books, students, issues, and subscriptions all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" data-testid="button-hero-signup">
                    Start Free Trial
                  </Button>
                </Link>
                <Button size="lg" variant="outline" data-testid="button-view-demo">
                  View Demo
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-8">
                <div>
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Libraries</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">100K+</div>
                  <div className="text-sm text-muted-foreground">Books Tracked</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="rounded-2xl border bg-card p-8 shadow-xl">
                <div className="aspect-[4/3] rounded-lg bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen className="w-24 h-24 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Run Your Library</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to simplify library management and improve user experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">Choose the plan that fits your library size</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "49",
                students: "Up to 100",
                features: ["Book Management", "Student Tracking", "Issue/Return", "Basic Reports", "Email Support"],
              },
              {
                name: "Professional",
                price: "99",
                students: "Up to 500",
                features: [
                  "Everything in Starter",
                  "Advanced Analytics",
                  "CSV Bulk Import",
                  "Priority Support",
                  "Custom Branding",
                ],
                featured: true,
              },
              {
                name: "Enterprise",
                price: "199",
                students: "Unlimited",
                features: [
                  "Everything in Professional",
                  "Multi-Branch Support",
                  "API Access",
                  "Dedicated Support",
                  "Custom Integration",
                ],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-lg border p-8 ${
                  plan.featured ? "border-primary shadow-lg scale-105" : "bg-card"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.students} students</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button
                    className="w-full"
                    variant={plan.featured ? "default" : "outline"}
                    data-testid={`button-plan-${plan.name.toLowerCase()}`}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Library?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of libraries already using LibraryMS to streamline their operations.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" data-testid="button-cta-signup">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="font-bold">LibraryMS</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Modern library management for the digital age.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Features</li>
                <li>Pricing</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 LibraryMS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
