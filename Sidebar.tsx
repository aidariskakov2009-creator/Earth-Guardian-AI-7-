import { NavLink } from "react-router-dom";
import {
  Globe2, FlameKindling, Wind, Droplets, Trees, Sun, Calculator,
  Sprout, Waves, ScanSearch, Building2, GraduationCap, Users, FlaskConical,
  LayoutDashboard, X,
} from "lucide-react";
import clsx from "clsx";

const nav = [
  { section: "Overview", items: [
    { to: "/dashboard", label: "Executive Dashboard", icon: LayoutDashboard },
  ]},
  { section: "Intelligence Modules", items: [
    { to: "/climate", label: "Climate Intelligence", icon: Globe2 },
    { to: "/disasters", label: "Disaster Prediction", icon: FlameKindling },
    { to: "/air-quality", label: "Air Quality", icon: Wind },
    { to: "/water", label: "Water Security", icon: Droplets },
    { to: "/forest", label: "Forest & Biodiversity", icon: Trees },
    { to: "/energy", label: "Renewable Energy", icon: Sun },
    { to: "/carbon", label: "Carbon Footprint", icon: Calculator },
    { to: "/agriculture", label: "Smart Agriculture", icon: Sprout },
    { to: "/ocean", label: "Ocean Protection", icon: Waves },
    { to: "/risk-scanner", label: "Risk Scanner", icon: ScanSearch },
    { to: "/cities", label: "Smart Cities", icon: Building2 },
  ]},
  { section: "Community", items: [
    { to: "/learning", label: "Learning Hub", icon: GraduationCap },
    { to: "/volunteer", label: "Volunteer & NGOs", icon: Users },
    { to: "/research", label: "Research Center", icon: FlaskConical },
  ]},
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-abyss/70 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={clsx(
          "fixed lg:sticky top-0 left-0 h-screen w-72 shrink-0 border-r border-line bg-abyss/95 lg:bg-abyss/40 z-50 lg:z-0 overflow-y-auto transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-line">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-signal to-current flex items-center justify-center">
              <Globe2 className="w-4.5 h-4.5 text-abyss" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-display font-semibold text-sm text-ink leading-tight">Earth Guardian</div>
              <div className="text-[10px] text-ash tracking-widest uppercase">AI Platform</div>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-mist hover:text-ink">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-3 py-4 flex flex-col gap-5">
          {nav.map((section) => (
            <div key={section.section}>
              <div className="px-2.5 mb-1.5 text-[10px] uppercase tracking-widest text-ash font-semibold">
                {section.section}
              </div>
              <div className="flex flex-col gap-0.5">
                {section.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      clsx(
                        "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors",
                        isActive
                          ? "bg-signal/10 text-signal border border-signal/20"
                          : "text-mist hover:text-ink hover:bg-panel-hi/60 border border-transparent"
                      )
                    }
                  >
                    <item.icon className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
