import { Menu, Bell, Search } from "lucide-react";

export default function TopBar({ title, subtitle, onMenu }: { title: string; subtitle?: string; onMenu: () => void }) {
  return (
    <div className="flex items-center justify-between px-6 py-5 border-b border-line">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} className="lg:hidden text-mist hover:text-ink">
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">{title}</h1>
          {subtitle && <p className="text-sm text-mist mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="hidden md:flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-panel border border-line text-sm text-ash w-64">
          <Search className="w-3.5 h-3.5" />
          <span>Search regions, cities...</span>
        </div>
        <button className="relative w-9 h-9 rounded-lg bg-panel border border-line flex items-center justify-center text-mist hover:text-ink">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-coral" />
        </button>
      </div>
    </div>
  );
}
