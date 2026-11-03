import { useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import VitalsTicker from "./VitalsTicker";

export default function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-deep grid-overlay">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <VitalsTicker />
        <TopBar title={title} subtitle={subtitle} onMenu={() => setSidebarOpen(true)} />
        <main className="flex-1 p-6 max-w-[1600px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
