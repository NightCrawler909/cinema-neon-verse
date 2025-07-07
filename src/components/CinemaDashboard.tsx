import React from "react";
import { CinemaSidebar } from "./CinemaSidebar";
import { CenterPanel } from "./CenterPanel";
import { RightPanel } from "./RightPanel";

export function CinemaDashboard() {
  const [theme, setTheme] = React.useState('dark');

  React.useEffect(() => {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:block">
        <CinemaSidebar theme={theme} toggleTheme={toggleTheme} />
      </div>
      <CenterPanel theme={theme} toggleTheme={toggleTheme} />
      <div className="hidden xl:block">
        <RightPanel theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}