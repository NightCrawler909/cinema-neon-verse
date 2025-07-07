import React from "react";
import { CinemaSidebar } from "./CinemaSidebar";
import { CenterPanel } from "./CenterPanel";
import { RightPanel } from "./RightPanel";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";

function CinemaDashboardContent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex transition-colors duration-300">
      <div className="hidden lg:flex lg:flex-shrink-0">
        <CinemaSidebar theme={theme} toggleTheme={toggleTheme} />
      </div>
      <CenterPanel theme={theme} toggleTheme={toggleTheme} />
      <div className="hidden xl:flex xl:flex-shrink-0">
        <RightPanel theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}

export function CinemaDashboard() {
  return (
    <ThemeProvider>
      <CinemaDashboardContent />
    </ThemeProvider>
  );
}