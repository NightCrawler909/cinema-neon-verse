import { CinemaSidebar } from "./CinemaSidebar";
import { CenterPanel } from "./CenterPanel";
import { RightPanel } from "./RightPanel";

export function CinemaDashboard() {
  return (
    <div className="min-h-screen bg-gradient-main flex flex-col lg:flex-row">
      <div className="hidden lg:block">
        <CinemaSidebar />
      </div>
      <CenterPanel />
      <div className="hidden xl:block">
        <RightPanel />
      </div>
    </div>
  );
}