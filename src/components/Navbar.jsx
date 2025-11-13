import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, HelpCircle, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar({ mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <header className="flex items-center justify-between border-b bg-card/80 backdrop-blur-sm px-4 py-3 shadow-sm">
      
      {/* === Left section (Logo + Mobile menu toggle) === */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <h1 className="text-lg font-semibold tracking-tight select-none">
          Library Admin
        </h1>
      </div>

      {/* === Right section (Desktop view) === */}
      <div className="hidden md:flex gap-3 items-center">
        <ThemeToggle />
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <HelpCircle className="h-4 w-4" />
          Help
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* === Right section (Mobile view) === */}
      <div className="flex md:hidden gap-2 items-center">
        <ThemeToggle />
      </div>
    </header>
  );
}
