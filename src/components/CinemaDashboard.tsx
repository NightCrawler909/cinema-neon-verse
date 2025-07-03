import { CinemaSidebar } from "./CinemaSidebar";
import { CenterPanel } from "./CenterPanel";
import { RightPanel } from "./RightPanel";

export function CinemaDashboard() {
  return (
    <div className="min-h-screen bg-gradient-main flex">
      <CinemaSidebar />
      <CenterPanel />
      <RightPanel />
    </div>
  );
}