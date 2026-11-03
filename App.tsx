import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";

const pages = {
  climate: lazy(() => import("./pages/modules/ClimateIntelligence")),
  disasters: lazy(() => import("./pages/modules/DisasterPrediction")),
  air: lazy(() => import("./pages/modules/AirQuality")),
  water: lazy(() => import("./pages/modules/WaterSecurity")),
  forest: lazy(() => import("./pages/modules/ForestBiodiversity")),
  energy: lazy(() => import("./pages/modules/RenewableEnergy")),
  carbon: lazy(() => import("./pages/modules/CarbonFootprint")),
  agri: lazy(() => import("./pages/modules/SmartAgriculture")),
  ocean: lazy(() => import("./pages/modules/OceanProtection")),
  risk: lazy(() => import("./pages/modules/RiskScanner")),
  cities: lazy(() => import("./pages/modules/SmartCities")),
  learn: lazy(() => import("./pages/modules/LearningHub")),
  volunteer: lazy(() => import("./pages/modules/VolunteerNetwork")),
  research: lazy(() => import("./pages/modules/ResearchCenter")),
  exec: lazy(() => import("./pages/dashboards/ExecutiveDashboard")),
  investor: lazy(() => import("./pages/dashboards/InvestorDashboard")),
  gov: lazy(() => import("./pages/dashboards/GovernmentDashboard")),
  resDash: lazy(() => import("./pages/dashboards/ResearchDashboard")),
};

const routes: [string, keyof typeof pages][] = [
  ["/climate", "climate"], ["/disasters", "disasters"], ["/air-quality", "air"], ["/water", "water"],
  ["/forest", "forest"], ["/energy", "energy"], ["/carbon", "carbon"], ["/agriculture", "agri"],
  ["/ocean", "ocean"], ["/risk-scanner", "risk"], ["/cities", "cities"], ["/learn", "learn"],
  ["/volunteer", "volunteer"], ["/research", "research"], ["/dashboard/executive", "exec"],
  ["/dashboard/investor", "investor"], ["/dashboard/government", "gov"], ["/dashboard/research", "resDash"],
];

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="grid min-h-screen place-items-center bg-void-950 font-mono text-xs text-mist-500">Loading telemetry…</div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          {routes.map(([path, key]) => { const C = pages[key]; return <Route key={path} path={path} element={<C />} />; })}
          <Route path="*" element={<Landing />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
