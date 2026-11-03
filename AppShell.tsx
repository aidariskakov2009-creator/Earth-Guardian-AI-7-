import type { ReactNode } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Leaf, Menu, X, Search, Bell } from "lucide-react";
import { navItems } from "../../data/nav";

function NavGroup({ title, group, pathname, onNavigate }: { title: string; group: string; pathname: string; onNavigate: () => void }) {
  return (
    <>
      <p className="mb-2 mt-5 px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-mist-500 first:mt-0">{title}</p>
      <ul className="space-y-0.5">
        {navItems.filter((n) => n.group === group).map((item) => {
          const active = pathname === item.to;
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <Link to={item.to} onClick={onNavigate}
                className={`focus-ring flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors ${active ? "bg-signal-500/10 text-signal-400" : "text-mist-300 hover:bg-white/5 hover:text-mist-100"}`}>
                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                <span className="truncate">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const current = navItems.find((n) => n.to === pathname);

  const sidebar = (
    <>
      <Link to="/" className="flex items-center gap-2 px-5 pb-6 pt-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-signal-500 to-signal-600">
          <Leaf className="h-4 w-4 text-void-950" strokeWidth={2.5} />
        </div>
        <span className="font-display text-sm font-semibold tracking-tight">EARTH GUARDIAN <span className="text-signal-400">AI</span></span>
      </Link>
      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        <NavGroup title="Intelligence Modules" group="Modules" pathname={pathname} onNavigate={() => setOpen(false)} />
        <NavGroup title="Business Intelligence" group="Business Intelligence" pathname={pathname} onNavigate={() => setOpen(false)} />
      </nav>
    </>
  );

  return (
    <div className="flex min-h-screen bg-void-950 bg-grid text-mist-100">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/5 bg-void-900/60 md:flex">{sidebar}</aside>
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-void-900 pt-5">
            <button className="focus-ring absolute right-3 top-3 rounded-md p-1 text-mist-400" onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></button>
            {sidebar}
          </aside>
        </div>
      )}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/5 bg-void-950/80 px-4 py-3 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-3">
            <button className="focus-ring rounded-md p-1.5 text-mist-300 md:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
            <div>
              <h1 className="font-display text-lg font-semibold">{current?.label ?? "Overview"}</h1>
              {current?.blurb && <p className="text-xs text-mist-500">{current.blurb}</p>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-mist-500 sm:flex">
              <Search className="h-3.5 w-3.5" /><span className="font-mono text-xs">Search datasets…</span>
            </div>
            <button className="focus-ring relative rounded-md p-1.5 text-mist-300 hover:text-signal-400" aria-label="Alerts">
              <Bell className="h-4 w-4" /><span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-flare-500" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-signal-500/40 to-void-700 ring-1 ring-white/10" />
          </div>
        </header>
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
