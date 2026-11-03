// Earth Guardian AI — realistic mock datasets.
// All figures are illustrative approximations built for demo purposes,
// calibrated to be directionally consistent with public climate science.

export type City = {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  population: number;
  aqi: number;
  tempAnomaly: number; // °C vs 1951-1980 baseline
  waterStress: number; // 0-100
  climateRisk: number; // 0-100
  co2PerCapita: number; // tons/year
};

export const cities: City[] = [
  { id: "lagos", name: "Lagos", country: "Nigeria", lat: 6.5244, lng: 3.3792, population: 15_900_000, aqi: 142, tempAnomaly: 1.4, waterStress: 61, climateRisk: 78, co2PerCapita: 0.9 },
  { id: "jakarta", name: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456, population: 10_700_000, aqi: 156, tempAnomaly: 1.1, waterStress: 72, climateRisk: 85, co2PerCapita: 2.1 },
  { id: "delhi", name: "New Delhi", country: "India", lat: 28.6139, lng: 77.2090, population: 32_900_000, aqi: 214, tempAnomaly: 1.8, waterStress: 88, climateRisk: 91, co2PerCapita: 1.8 },
  { id: "cairo", name: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357, population: 21_300_000, aqi: 168, tempAnomaly: 1.6, waterStress: 94, climateRisk: 82, co2PerCapita: 2.4 },
  { id: "phoenix", name: "Phoenix", country: "United States", lat: 33.4484, lng: -112.0740, population: 4_950_000, aqi: 88, tempAnomaly: 2.3, waterStress: 79, climateRisk: 74, co2PerCapita: 14.2 },
  { id: "saopaulo", name: "São Paulo", country: "Brazil", lat: -23.5505, lng: -46.6333, population: 22_400_000, aqi: 79, tempAnomaly: 1.0, waterStress: 54, climateRisk: 61, co2PerCapita: 2.6 },
  { id: "shanghai", name: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737, population: 28_500_000, aqi: 96, tempAnomaly: 1.3, waterStress: 58, climateRisk: 69, co2PerCapita: 8.9 },
  { id: "lagos2", name: "Manila", country: "Philippines", lat: 14.5995, lng: 120.9842, population: 14_400_000, aqi: 112, tempAnomaly: 1.2, waterStress: 66, climateRisk: 88, co2PerCapita: 1.3 },
  { id: "london", name: "London", country: "United Kingdom", lat: 51.5072, lng: -0.1276, population: 9_600_000, aqi: 46, tempAnomaly: 1.1, waterStress: 41, climateRisk: 38, co2PerCapita: 5.1 },
  { id: "capetown", name: "Cape Town", country: "South Africa", lat: -33.9249, lng: 18.4241, population: 4_800_000, aqi: 58, tempAnomaly: 1.3, waterStress: 91, climateRisk: 76, co2PerCapita: 6.8 },
  { id: "miami", name: "Miami", country: "United States", lat: 25.7617, lng: -80.1918, population: 6_200_000, aqi: 51, tempAnomaly: 1.5, waterStress: 47, climateRisk: 83, co2PerCapita: 12.6 },
  { id: "tokyo", name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503, population: 37_400_000, aqi: 44, tempAnomaly: 1.2, waterStress: 33, climateRisk: 55, co2PerCapita: 8.4 },
  { id: "nairobi", name: "Nairobi", country: "Kenya", lat: -1.2921, lng: 36.8219, population: 5_100_000, aqi: 67, tempAnomaly: 1.1, waterStress: 68, climateRisk: 72, co2PerCapita: 0.4 },
  { id: "oslo", name: "Oslo", country: "Norway", lat: 59.9139, lng: 10.7522, population: 1_050_000, aqi: 18, tempAnomaly: 1.9, waterStress: 12, climateRisk: 22, co2PerCapita: 7.9 },
];

export type DisasterEvent = {
  id: string;
  type: "Wildfire" | "Flood" | "Drought" | "Heatwave" | "Storm" | "Earthquake";
  location: string;
  severity: "Watch" | "Warning" | "Critical";
  probability: number; // %
  etaHours: number;
  affectedPopulation: number;
};

export const disasterEvents: DisasterEvent[] = [
  { id: "d1", type: "Wildfire", location: "Central Valley, California, US", severity: "Critical", probability: 92, etaHours: 6, affectedPopulation: 340_000 },
  { id: "d2", type: "Flood", location: "Ganges Delta, Bangladesh", severity: "Warning", probability: 76, etaHours: 18, affectedPopulation: 1_200_000 },
  { id: "d3", type: "Drought", location: "Horn of Africa", severity: "Critical", probability: 88, etaHours: 240, affectedPopulation: 4_600_000 },
  { id: "d4", type: "Heatwave", location: "Southern Spain", severity: "Warning", probability: 81, etaHours: 30, affectedPopulation: 890_000 },
  { id: "d5", type: "Storm", location: "Gulf of Mexico", severity: "Watch", probability: 54, etaHours: 60, affectedPopulation: 610_000 },
  { id: "d6", type: "Earthquake", location: "Sumatra Fault, Indonesia", severity: "Watch", probability: 21, etaHours: 720, affectedPopulation: 2_100_000 },
  { id: "d7", type: "Flood", location: "Rhine Basin, Germany", severity: "Watch", probability: 38, etaHours: 96, affectedPopulation: 210_000 },
  { id: "d8", type: "Wildfire", location: "New South Wales, Australia", severity: "Warning", probability: 69, etaHours: 14, affectedPopulation: 155_000 },
];

// Time series: global CO2 ppm, temp anomaly, sea level (2010-2026 approximation)
export const globalTrend = [
  { year: 2010, co2: 389.9, tempAnomaly: 0.72, seaLevel: 0 },
  { year: 2012, co2: 393.8, tempAnomaly: 0.65, seaLevel: 6 },
  { year: 2014, co2: 397.7, tempAnomaly: 0.75, seaLevel: 13 },
  { year: 2016, co2: 404.2, tempAnomaly: 1.01, seaLevel: 20 },
  { year: 2018, co2: 408.5, tempAnomaly: 0.85, seaLevel: 28 },
  { year: 2020, co2: 414.2, tempAnomaly: 1.02, seaLevel: 36 },
  { year: 2022, co2: 418.6, tempAnomaly: 0.98, seaLevel: 44 },
  { year: 2024, co2: 424.6, tempAnomaly: 1.29, seaLevel: 52 },
  { year: 2026, co2: 428.1, tempAnomaly: 1.34, seaLevel: 59 },
];

export const forecastTrend = [
  { year: 2026, co2: 428.1, tempAnomaly: 1.34 },
  { year: 2028, co2: 432.0, tempAnomaly: 1.38 },
  { year: 2030, co2: 436.4, tempAnomaly: 1.44 },
  { year: 2032, co2: 440.5, tempAnomaly: 1.5 },
  { year: 2034, co2: 444.9, tempAnomaly: 1.57 },
  { year: 2036, co2: 449.0, tempAnomaly: 1.63 },
];

export const aqiHistory24h = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  delhi: Math.round(180 + Math.sin(i / 3) * 35 + (i > 16 ? 20 : 0)),
  jakarta: Math.round(140 + Math.cos(i / 4) * 25),
  london: Math.round(40 + Math.sin(i / 5) * 12),
  saopaulo: Math.round(70 + Math.cos(i / 6) * 15),
}));

export const waterReservoirs = [
  { name: "Lake Mead", region: "Nevada/Arizona, US", capacityPct: 34, trend: -6.2 },
  { name: "Cantareira System", region: "São Paulo, Brazil", capacityPct: 58, trend: 2.1 },
  { name: "Theewaterskloof", region: "Western Cape, South Africa", capacityPct: 41, trend: -3.4 },
  { name: "Krishnaraja Sagar", region: "Karnataka, India", capacityPct: 62, trend: 4.5 },
  { name: "Aswan High Dam", region: "Egypt", capacityPct: 71, trend: 0.6 },
  { name: "Three Gorges", region: "China", capacityPct: 89, trend: 1.2 },
];

export const renewableMix = [
  { source: "Solar", gwCapacity: 1_620, growthYoY: 24.1 },
  { source: "Wind", gwCapacity: 1_040, growthYoY: 12.4 },
  { source: "Hydro", gwCapacity: 1_390, growthYoY: 1.8 },
  { source: "Geothermal", gwCapacity: 16, growthYoY: 4.3 },
  { source: "Biomass", gwCapacity: 145, growthYoY: 2.9 },
  { source: "Nuclear", gwCapacity: 420, growthYoY: 1.1 },
];

export const energyByCountry = [
  { country: "China", renewable: 34, fossil: 58, nuclear: 8 },
  { country: "United States", renewable: 28, fossil: 60, nuclear: 12 },
  { country: "Germany", renewable: 52, fossil: 40, nuclear: 8 },
  { country: "India", renewable: 24, fossil: 71, nuclear: 5 },
  { country: "Brazil", renewable: 74, fossil: 21, nuclear: 5 },
  { country: "Norway", renewable: 92, fossil: 3, nuclear: 0 },
];

export const forestData = {
  deforestationByRegion: [
    { region: "Amazon Basin", hectaresLostK: 1_120, hectaresRestoredK: 210 },
    { region: "Congo Basin", hectaresLostK: 640, hectaresRestoredK: 90 },
    { region: "Southeast Asia", hectaresLostK: 780, hectaresRestoredK: 260 },
    { region: "Boreal Russia", hectaresLostK: 990, hectaresRestoredK: 140 },
  ],
  biodiversityIndex: [
    { year: 2016, index: 74 },
    { year: 2018, index: 70 },
    { year: 2020, index: 66 },
    { year: 2022, index: 63 },
    { year: 2024, index: 60 },
    { year: 2026, index: 58 },
  ],
};

export const oceanData = {
  tempAnomaly: [
    { year: 2010, anomaly: 0.31 },
    { year: 2014, anomaly: 0.41 },
    { year: 2018, anomaly: 0.52 },
    { year: 2022, anomaly: 0.61 },
    { year: 2026, anomaly: 0.71 },
  ],
  coralBleachingRisk: [
    { reef: "Great Barrier Reef", risk: 82 },
    { reef: "Coral Triangle", risk: 64 },
    { reef: "Mesoamerican Reef", risk: 71 },
    { reef: "Red Sea Reef", risk: 39 },
  ],
  plasticDensity: [
    { region: "North Pacific Gyre", tonsPerKm2: 5.1 },
    { region: "Mediterranean Sea", tonsPerKm2: 3.4 },
    { region: "Bay of Bengal", tonsPerKm2: 4.2 },
    { region: "North Atlantic Gyre", tonsPerKm2: 2.8 },
  ],
};

export const smartCityScores = [
  { city: "Copenhagen", sustainability: 91, emissions: 22, energyEfficiency: 88 },
  { city: "Singapore", sustainability: 87, emissions: 34, energyEfficiency: 85 },
  { city: "Curitiba", sustainability: 79, emissions: 41, energyEfficiency: 74 },
  { city: "Seoul", sustainability: 76, emissions: 46, energyEfficiency: 80 },
  { city: "Lagos", sustainability: 41, emissions: 68, energyEfficiency: 39 },
  { city: "Houston", sustainability: 52, emissions: 74, energyEfficiency: 58 },
];

export const ngoDirectory = [
  { name: "Ocean Cleanup Alliance", focus: "Marine plastic removal", region: "Global", volunteers: 12_400 },
  { name: "Green Belt Collective", focus: "Reforestation", region: "East Africa", volunteers: 8_100 },
  { name: "Water for All Initiative", focus: "Clean water access", region: "South Asia", volunteers: 15_600 },
  { name: "Solar Villages Project", focus: "Rural electrification", region: "Sub-Saharan Africa", volunteers: 4_300 },
  { name: "Coral Guardians", focus: "Reef restoration", region: "Southeast Asia", volunteers: 2_900 },
];

export const learningModules = [
  { title: "Climate Science 101", lessons: 8, level: "Beginner" },
  { title: "Understanding Carbon Markets", lessons: 6, level: "Intermediate" },
  { title: "Renewable Energy Systems", lessons: 10, level: "Intermediate" },
  { title: "Biodiversity & Ecosystem Services", lessons: 7, level: "Beginner" },
  { title: "Climate Policy & Diplomacy", lessons: 9, level: "Advanced" },
];

export const executiveKpis = {
  globalRiskScore: 68,
  activeAlerts: 8,
  citiesMonitored: 1_240,
  co2ppm: 428.1,
  tempAnomaly: 1.34,
  seaLevelRiseMm: 59,
  renewableSharePct: 31.4,
  forestCoverLossKm2: 41_200,
};

export const carbonFactors = {
  electricityKgPerKwh: 0.42,
  carKgPerKm: 0.192,
  flightKgPerKm: 0.255,
  meatKgPerMeal: 3.3,
  vegKgPerMeal: 0.6,
};
