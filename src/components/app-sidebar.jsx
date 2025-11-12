import { Link, useLocation } from "wouter";
import {
  BookOpen,
  Users,
  LayoutDashboard,
  Settings,
  BookCopy,
  BarChart3,
  Building2,
  LogOut,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/store";
import { StatusBadge } from "./status-badge";

export function AppSidebar({ tenantName, subscriptionStatus }) {
  const [location] = useLocation();
  const { user, logout } = useAuthStore();

  const getMenuItems = () => {
    if (user?.role === "SUPER_ADMIN") {
      return [
        { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
        { title: "Tenants", url: "/admin/tenants", icon: Building2 },
        { title: "Reports", url: "/admin/reports", icon: BarChart3 },
      ];
    }

    if (user?.role === "LIBRARY_ADMIN") {
      return [
        { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        { title: "Books", url: "/books", icon: BookOpen },
        { title: "Students", url: "/students", icon: Users },
        { title: "Issue/Return", url: "/issues", icon: BookCopy },
        { title: "Reports", url: "/reports", icon: BarChart3 },
        { title: "Settings", url: "/settings", icon: Settings },
      ];
    }

    if (user?.role === "LIBRARIAN") {
      return [
        { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        { title: "Books", url: "/books", icon: BookOpen },
        { title: "Students", url: "/students", icon: Users },
        { title: "Issue/Return", url: "/issues", icon: BookCopy },
      ];
    }

    if (user?.role === "STUDENT") {
      return [
        { title: "Catalog", url: "/catalog", icon: BookOpen },
        { title: "My Books", url: "/my-books", icon: BookCopy },
        { title: "Profile", url: "/profile", icon: User },
      ];
    }

    return [];
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar data-testid="app-sidebar">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">{tenantName || "LibraryMS"}</h2>
            {user?.role !== "SUPER_ADMIN" && subscriptionStatus && (
              <StatusBadge status={subscriptionStatus} className="mt-1" />
            )}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent">
          <Avatar className="w-10 h-10">
            <AvatarFallback>
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.role?.replace("_", " ")}
            </p>
          </div>
          <button
            onClick={() => logout()}
            className="p-2 hover-elevate rounded-md"
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
