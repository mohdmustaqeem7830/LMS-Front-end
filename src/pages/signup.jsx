// import { useState } from "react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tenantOnboardingSchema } from "@/shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, Building2, User, ChevronRight, Check } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Signup() {
  const [step, setStep] = useState(1);

  const form = useForm({
    resolver: zodResolver(tenantOnboardingSchema),
    defaultValues: {
      tenantName: "",
      tenantAddress: "",
      adminFirstName: "",
      adminLastName: "",
      adminEmail: "",
      adminPassword: "",
      libraryPlanId: "1",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const steps = [
    { number: 1, title: "Library Info" },
    { number: 2, title: "Admin Account" },
    { number: 3, title: "Choose Plan" },
  ];

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/public/plan")
      .then((res) => res.json())
      .then((data) => setPlans(data))
      .catch((err) => console.error("Failed to fetch plans:", err));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
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
              <Button data-testid="button-signup">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Create Your Library Account
            </h1>
            <p className="text-muted-foreground">
              Get started with a 7-day grace period on any plan
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= s.number
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {step > s.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      s.number
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${step >= s.number
                      ? "text-foreground"
                      : "text-muted-foreground"
                      }`}
                  >
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-muted-foreground mx-4" />
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {step === 1 && "Library Information"}
                    {step === 2 && "Administrator Account"}
                    {step === 3 && "Select Your Plan"}
                  </CardTitle>
                  <CardDescription>
                    {step === 1 && "Tell us about your library"}
                    {step === 2 && "Create your admin user account"}
                    {step === 3 &&
                      "Choose a subscription plan that fits your needs"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Step 1 */}
                  {step === 1 && (
                    <>
                      <FormField
                        control={form.control}
                        name="tenantName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Library Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                  placeholder="Central Public Library"
                                  className="pl-10"
                                  {...field}
                                  data-testid="input-tenant-name"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tenantAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="123 Main St, City, State"
                                {...field}
                                data-testid="input-tenant-address"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="adminFirstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John"
                                  {...field}
                                  data-testid="input-admin-first-name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="adminLastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Doe"
                                  {...field}
                                  data-testid="input-admin-last-name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="adminEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="admin@library.com"
                                {...field}
                                data-testid="input-admin-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="adminPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="••••••••"
                                {...field}
                                data-testid="input-admin-password"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <>
                      <FormField
                        control={form.control}
                        name="libraryPlanId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subscription Plan</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger data-testid="select-plan">
                                  <SelectValue placeholder="Select a plan" />
                                </SelectTrigger>
                              </FormControl>

                              <SelectContent>
                                {plans.map((p) => (
                                  <SelectItem key={p.planId} value={String(p.planId)}>
                                    {p.planName} – ₹{p.planPrice} / {p.noOfDays} Days
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Dynamic Summary */}
                      {(() => {
                        const selected = plans.find(
                          (x) => String(x.planId) === form.watch("libraryPlanId")
                        );

                        return selected ? (
                          <div className="bg-muted p-4 rounded-lg space-y-2">

                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Plan Price</span>
                              <span className="font-medium">₹{selected.planPrice}</span>
                            </div>

                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Duration</span>
                              <span className="font-medium">{selected.noOfDays} days</span>
                            </div>

                            <div className="pt-2 border-t flex justify-between font-semibold">
                              <span>Total due today</span>
                              <span>₹0.00</span>
                            </div>

                            <p className="text-xs text-muted-foreground pt-2">
                              Start with a 7-day grace period. First payment after the grace period.
                            </p>
                          </div>
                        ) : null;
                      })()}

                    </>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 pt-4">
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(step - 1)}
                        data-testid="button-back"
                      >
                        Back
                      </Button>
                    )}
                    {step < 3 ? (
                      <Button
                        type="button"
                        onClick={() => setStep(step + 1)}
                        className="flex-1"
                        data-testid="button-next"
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="flex-1"
                        data-testid="button-create-account"
                      >
                        Create Account
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </form>
          </Form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            By creating an account, you agree to our Terms of Service and
            Privacy Policy
          </p>
        </div>
      </main>
    </div>
  );
}
