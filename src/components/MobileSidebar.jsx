import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, X } from "lucide-react";
import * as Icons from "lucide-react";

export default function MobileSidebar({
  modules,
  expandedModule,
  toggleModule,
  selectedModule,
  selectedSub,
  handleSubClick,
  setMobileMenuOpen,
}) {
  return (
    <AnimatePresence>
      <motion.aside
        key="mobileSidebar"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r p-4 md:hidden overflow-y-auto"
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Modules</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X />
          </Button>
        </div>

        {/* Module List */}
        {modules.map((m) => {
          // ✅ Get icon component dynamically
          const Icon = Icons[m.icon];
          return (
            <div key={m.name}>
              {/* Module Button */}
              <Button
                variant={selectedModule === m.name ? "secondary" : "ghost"}
                className="w-full justify-between"
                onClick={() => toggleModule(m.name)}
              >
                <div className="flex items-center">
                  {Icon && (
                    <span className="mr-2">
                      <Icon className="h-4 w-4" />
                    </span>
                  )}
                  {m.name}
                </div>
                {expandedModule === m.name ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>

              {/* Submenu */}
              <AnimatePresence>
                {expandedModule === m.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="ml-6 mt-1 space-y-1"
                  >
                    {m.subs.map((sub) => (
                      <Button
                        key={sub}
                        variant={
                          selectedModule === m.name && selectedSub === sub
                            ? "secondary"
                            : "ghost"
                        }
                        size="sm"
                        className="w-full justify-start text-sm"
                        onClick={() => {
                          handleSubClick(m.name, sub);
                          // ✅ Auto close sidebar after clicking submenu
                          setMobileMenuOpen(false);
                        }}
                      >
                        {sub}
                      </Button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.aside>
    </AnimatePresence>
  );
}
