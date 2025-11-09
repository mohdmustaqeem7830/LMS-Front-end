import { useLocation } from "wouter";
import { useAuthStore } from "@/lib/store";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { ThemeToggle } from "./ui/theme-toggle";
import React from "react";

export function ProtectedLayout({ children, requiredRole }) {
  const [, setLocation] = useLocation();
  const { user, accessToken } = useAuthStore();

  // ✅ Not logged in → redirect
  if (!accessToken || !user) {
    setLocation("/login");
    return null;
  }

  // ✅ Role check
  if (requiredRole && !requiredRole.includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  // ✅ Sidebar custom properties
  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={sidebarStyle}>
      <div className="flex h-screen w-full">
        <AppSidebar
          tenantName="Central Library"
          subscriptionStatus="ACTIVE"
        />

        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between h-16 px-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>

          <main className="flex-1 overflow-auto bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
