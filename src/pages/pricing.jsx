import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check, BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Pricing() {
  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: 49,
      students: 100,
      features: [
        "Up to 100 students",
        "Unlimited books",
        "Issue/Return tracking",
        "Basic reports",
        "Email support",
        "10% buffer capacity",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      price: 99,
      students: 500,
      features: [
        "Up to 500 students",
        "Unlimited books",
        "Advanced analytics",
        "CSV bulk import",
        "Priority support",
        "Custom branding",
        "15% buffer capacity",
      ],
      featured: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 199,
      students: 2000,
      features: [
        "Up to 2000 students",
        "Unlimited books",
        "Multi-branch support",
        "API access",
        "Dedicated support",
        "Custom integration",
        "20% buffer capacity",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="font-bold text-xl">LibraryMS</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" data-testid="button-login">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button data-testid="button-signup">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Flexible pricing that scales with your library. All plans include a 7-day grace period.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-lg border p-8 ${
                  plan.featured ? "border-primary shadow-xl scale-105 bg-card" : "bg-card"
                }`}
                data-testid={`card-plan-${plan.id}`}
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
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button
                    className="w-full"
                    variant={plan.featured ? "default" : "outline"}
                    data-testid={`button-select-${plan.id}`}
                  >
                    Select Plan
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "What happens when I exceed my student limit?",
                  a: "Each plan includes a buffer capacity (10-20%). Once you exceed this buffer, you'll be prompted to upgrade to a higher tier.",
                },
                {
                  q: "Can I change plans later?",
                  a: "Yes! You can upgrade or downgrade your plan at any time. Changes will be pro-rated on your next billing cycle.",
                },
                {
                  q: "What is the grace period?",
                  a: "All plans include a 7-day grace period after subscription expiry. During this time, you'll have read-only access and can renew without losing data.",
                },
                {
                  q: "Is there a setup fee?",
                  a: "No setup fees. You only pay the monthly subscription for your chosen plan.",
                },
              ].map((faq, i) => (
                <div key={i} className="border rounded-lg p-6">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2024 LibraryMS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
