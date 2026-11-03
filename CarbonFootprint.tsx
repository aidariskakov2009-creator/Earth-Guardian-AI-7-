import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Calculator, Car, Home, Plane, Utensils } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import GlassCard from "@/components/ui/GlassCard";
import GaugeRadial from "@/components/ui/GaugeRadial";
import { carbonFactors } from "@/data/mockData";

const chartTooltip = {
  contentStyle: { background: "#101c2c", border: "1px solid #223448", borderRadius: 10, fontSize: 12 },
  labelStyle: { color: "#93a7b8" },
};

const globalAvgTonsPerYear = 4.7;

function Slider({
  label, icon: Icon, value, onChange, min, max, step, unit,
}: {
  label: string; icon: React.ComponentType<{ className?: string }>; value: number;
  onChange: (v: number) => void; min: number; max: number; step: number; unit: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm text-ink">
          <Icon className="w-4 h-4 text-signal" />
          {label}
        </div>
        <span className="font-mono text-sm text-mist">{value.toLocaleString()} {unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-signal h-1.5 rounded-full bg-panel-hi cursor-pointer"
      />
    </div>
  );
}

export default function CarbonFootprint() {
  const [electricityKwh, setElectricityKwh] = useState(350);
  const [carKm, setCarKm] = useState(120);
  const [flightsKm, setFlightsKm] = useState(2500);
  const [meatMeals, setMeatMeals] = useState(10);

  const results = useMemo(() => {
    const electricity = (electricityKwh * 12 * carbonFactors.electricityKgPerKwh) / 1000;
    const car = (carKm * 52 * carbonFactors.carKgPerKm) / 1000;
    const flights = (flightsKm * carbonFactors.flightKgPerKm) / 1000;
    const food = (meatMeals * 52 * carbonFactors.meatKgPerMeal + (21 - meatMeals) * 52 * carbonFactors.vegKgPerMeal) / 1000;
    const total = electricity + car + flights + food;
    return { electricity, car, flights, food, total };
  }, [electricityKwh, carKm, flightsKm, meatMeals]);

  const pieData = [
    { name: "Electricity", value: Number(results.electricity.toFixed(2)), color: "#f5a524" },
    { name: "Transport", value: Number(results.car.toFixed(2)), color: "#5b9dff" },
    { name: "Flights", value: Number(results.flights.toFixed(2)), color: "#fb5b4e" },
    { name: "Food", value: Number(results.food.toFixed(2)), color: "#8ee06a" },
  ];

  const scoreVsAvg = Math.min(100, Math.round((results.total / globalAvgTonsPerYear) * 50));

  return (
    <PageShell title="Carbon Footprint Analyzer" subtitle="Interactive calculator with individual reduction planning">
      <div className="grid lg:grid-cols-2 gap-5">
        <GlassCard className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <Calculator className="w-5 h-5 text-signal" />
            <h3 className="font-display text-base font-semibold text-ink">Your Monthly Habits</h3>
          </div>
          <div className="flex flex-col gap-6">
            <Slider label="Electricity use" icon={Home} value={electricityKwh} onChange={setElectricityKwh} min={0} max={1500} step={10} unit="kWh/mo" />
            <Slider label="Car travel" icon={Car} value={carKm} onChange={setCarKm} min={0} max={800} step={10} unit="km/wk" />
            <Slider label="Flights" icon={Plane} value={flightsKm} onChange={setFlightsKm} min={0} max={20000} step={250} unit="km/yr" />
            <Slider label="Meat-based meals" icon={Utensils} value={meatMeals} onChange={setMeatMeals} min={0} max={21} step={1} unit="/ week" />
          </div>
        </GlassCard>

        <GlassCard className="p-6 flex flex-col items-center">
          <h3 className="font-display text-base font-semibold text-ink mb-1 self-start">Your Footprint</h3>
          <p className="text-xs text-mist mb-4 self-start">Estimated annual CO₂e emissions</p>
          <GaugeRadial value={scoreVsAvg} size={190} label="vs Global Avg" sublabel={`${results.total.toFixed(1)} t CO₂e / yr`} />
          <div className="w-full mt-6">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={3}>
                  {pieData.map((d, i) => <Cell key={i} fill={d.color} stroke="#0a1420" strokeWidth={2} />)}
                </Pie>
                <Tooltip {...chartTooltip} formatter={(v) => [`${v} t CO₂e`, "Emissions"]} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-mist mt-3 text-center leading-relaxed">
            Global average is <span className="text-ink font-mono">{globalAvgTonsPerYear}t</span> CO₂e/year.
            Paris Agreement target for 2030 is <span className="text-ink font-mono">2.3t</span> CO₂e/year per person.
          </p>
        </GlassCard>
      </div>

      <GlassCard className="p-6 mt-5">
        <h3 className="font-display text-base font-semibold text-ink mb-3">AI Reduction Recommendations</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { t: "Switch to renewable electricity", d: "Could cut your electricity footprint by up to 80%.", tone: "signal" },
            { t: "Reduce flights or offset them", d: "Flights are your most carbon-intensive activity per km.", tone: "coral" },
            { t: "Two meat-free days per week", d: "Would lower your annual footprint by roughly 0.3–0.5t.", tone: "bio" },
          ].map((r) => (
            <div key={r.t} className="p-4 rounded-xl bg-panel-hi/60 border border-line">
              <div className="text-sm font-medium text-ink mb-1">{r.t}</div>
              <div className="text-xs text-mist leading-relaxed">{r.d}</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  );
}
