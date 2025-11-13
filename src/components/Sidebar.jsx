import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown } from "lucide-react";
import * as Icons from "lucide-react";

export default function Sidebar({
  modules,
  expandedModule,
  toggleModule,
  selectedModule,
  selectedSub,
  handleSubClick,
}) {
  return (
    <aside className="hidden md:flex w-60 flex-col border-r bg-card/70 backdrop-blur-sm p-3 overflow-y-auto transition-colors duration-300">
      {modules.map((m) => {
        const Icon = Icons[m.icon];
        return (
          <div key={m.name}>
            <Button
              variant={selectedModule === m.name ? "secondary" : "ghost"}
              className="w-full justify-between"
              onClick={() => toggleModule(m.name)}
            >
              <div className="flex items-center">
                <span className="mr-2">
                  <Icon className="h-4 w-4" />
                </span>
                {m.name}
              </div>
              {expandedModule === m.name ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>

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
                      onClick={() => handleSubClick(m.name, sub)}
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
    </aside>
  );
}
