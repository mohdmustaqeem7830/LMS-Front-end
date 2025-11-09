import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";

// ✅ Only Landing import for now
import Landing from "@/pages/landing";
// import NotFound from "@/pages/not-found";
// import Pricing from "@/pages/pricing";
// import Signup from "@/pages/signup";
// import Login from "@/pages/login";
// import Dashboard from "@/pages/dashboard";
// import AdminDashboard from "@/pages/admin-dashboard";
// import AdminTenants from "@/pages/admin-tenants";
// import AdminReports from "@/pages/admin-reports";
// import Books from "@/pages/books";
// import BookForm from "@/pages/book-form";
// import Students from "@/pages/students";
// import StudentForm from "@/pages/student-form";
// import StudentDetail from "@/pages/student-detail";
// import Issues from "@/pages/issues";
// import Reports from "@/pages/reports";
// import Settings from "@/pages/settings";
// import { ProtectedLayout } from "@/components/protected-layout";

function Router() {
  return (
    <Switch>
      {/* ✅ Only public route enabled */}
      <Route path="/" component={Landing} />

      {/* ✅ All other routes disabled for now */}
      {/*
      <Route path="/pricing" component={Pricing} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />

      <Route path="/admin/dashboard">
        <ProtectedLayout requiredRole={["SUPER_ADMIN"]}>
          <AdminDashboard />
        </ProtectedLayout>
      </Route>
      ... (ALL OTHER ROUTES COMMENTED)
      <Route component={NotFound} />
      */}

    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="library-theme">
        <TooltipProvider>
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
