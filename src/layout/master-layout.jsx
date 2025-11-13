import React, { useState } from "react";
import {Navbar} from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import {MainContent} from "@/components/MainContent";
 import MobileSidebar from "@/components/MobileSidebar";

export default function MasterLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState("Dashboard");
  const [selectedSub, setSelectedSub] = useState("Overview");
  const [expandedModule, setExpandedModule] = useState("Dashboard");

  const modules = [
    {
      name: "Student",
      icon: "User",
      subs: [
        "Student Registration",
        "Update Student",
        "Assign Seat",
        "Assign Plan",
        "All Student Report",
        "Remove Student",
      ],
    },
    {
      name: "Fees",
      icon: "Coins",
      subs: [
        "Deposit Fees",
        "Update Fees",
        "Student Fee Report",
        "Upcoming Fee Report",
        "Fee Report Monthwise",
      ],
    },
    {
      name: "Plan",
      icon: "BookOpen",
      subs: ["Add Plan", "Update Plan", "All Plan Report", "Delete Plan"],
    },
    {
      name: "Setting",
      icon: "Settings",
      subs: ["Update Library", "Subscription Detail", "Update Subscription"],
    },
  ];

  const toggleModule = (moduleName) =>
    setExpandedModule((prev) => (prev === moduleName ? null : moduleName));

  const handleSubClick = (moduleName, sub) => {
    setSelectedModule(moduleName);
    setSelectedSub(sub);
  };

  return (
    <div className="flex h-screen flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          modules={modules}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          expandedModule={expandedModule}
          toggleModule={toggleModule}
          selectedModule={selectedModule}
          selectedSub={selectedSub}
          handleSubClick={handleSubClick}
        />


  {mobileMenuOpen && (
    <MobileSidebar
      modules={modules}
      expandedModule={expandedModule}
      toggleModule={toggleModule}
      selectedModule={selectedModule}
      selectedSub={selectedSub}
      handleSubClick={handleSubClick}
      setMobileMenuOpen={setMobileMenuOpen}
    />
  )}


        <MainContent
          selectedModule={selectedModule}
          selectedSub={selectedSub}
        />
      </div>
    </div>
  );
}
