import mercedesC200Image from "@/assets/mercedes-c200.jpg";

const placeholder = "/placeholder.svg";

export interface Vehicle {
  id: string;
  images: string[];
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  power: string;
  firstRegistration: string;
  condition: string;
  transmission?: string;
  color?: string;
  doors?: number;
  seats?: number;
  co2Emissions?: string;
  features?: string[];
  vatIncluded?: boolean;
}

// Bestand geprüft am 26.08.2026 – Quelle: https://home.mobile.de/HOCHTAUNUSAUTOMOBILE
// Nur verifizierte Angaben. Fehlende Werte bleiben leer (nicht erfunden).
export const vehicles: Vehicle[] = [
  {
    id: "vw-golf-sportsvan-lounge",
    images: [placeholder],
    brand: "Volkswagen",
    model: "Golf Sportsvan VII Lounge-PDC-RFK-Tempomat",
    year: 2015,
    price: 8990,
    mileage: 111485,
    fuel: "Benzin",
    power: "81 kW (110 PS)",
    firstRegistration: "12/2015",
    condition: "Gebraucht",
  },
  {
    id: "mercedes-c200-widescreen",
    images: [mercedesC200Image],
    brand: "Mercedes-Benz",
    model: "C 200 LED-Key-CarPlay-Vollleder-Widescreen",
    year: 2018,
    price: 23900,
    mileage: 45000,
    fuel: "Benzin",
    power: "135 kW (184 PS)",
    firstRegistration: "09/2018",
    condition: "Unfallfrei",
  },
  {
    id: "mercedes-a180d-limousine",
    images: [placeholder],
    brand: "Mercedes-Benz",
    model: "A 180 d Limousine-Widescreen-SHZ-Leder-PDC",
    year: 2019,
    price: 19990,
    mileage: 64500,
    fuel: "Diesel",
    power: "85 kW (116 PS)",
    firstRegistration: "07/2019",
    condition: "Unfallfrei",
  },
  {
    id: "bmw-m6-gran-coupe",
    images: [placeholder],
    brand: "BMW",
    model: "M6 Gran Coupé Competition-Carbon-360-B&O-TWA",
    year: 2014,
    price: 34990,
    mileage: 153000,
    fuel: "Benzin",
    power: "423 kW (575 PS)",
    firstRegistration: "04/2014",
    condition: "Unfallfrei",
  },
  {
    id: "mercedes-c43-amg-4matic",
    images: [placeholder],
    brand: "Mercedes-Benz",
    model: "C 43 AMG 4Matic-Night-Pano-ILS-RFK",
    year: 2017,
    price: 25990,
    mileage: 168000,
    fuel: "Benzin",
    power: "270 kW (367 PS)",
    firstRegistration: "03/2017",
    condition: "Gebraucht",
  },
  {
    id: "mercedes-cla-250",
    images: [placeholder],
    brand: "Mercedes-Benz",
    model: "CLA 250-TWA-Navi-Tempomat-PDC",
    year: 2016,
    price: 12790,
    mileage: 165400,
    fuel: "Benzin",
    power: "155 kW (211 PS)",
    firstRegistration: "01/2016",
    condition: "Gebraucht",
  },
  {
    id: "range-rover-evoque-se-dynamic",
    images: [placeholder],
    brand: "Land Rover",
    model: "Range Rover Evoque SE Dynamic-Bi-Xenon-Navi-Pano",
    year: 2016,
    price: 16999,
    mileage: 140000,
    fuel: "Diesel",
    power: "132 kW (179 PS)",
    firstRegistration: "05/2016",
    condition: "Unfallfrei",
  },
  {
    id: "hyundai-i20-n-line",
    images: [placeholder],
    brand: "Hyundai",
    model: "i20 N Line Mild-Hybrid-LED-ACC-RFK-Navi-CarPlay",
    year: 2022,
    price: 14990,
    mileage: 73500,
    fuel: "Benzin",
    power: "88 kW (120 PS)",
    firstRegistration: "06/2022",
    condition: "Unfallfrei",
  },
  {
    id: "kia-stonic-vision",
    images: [placeholder],
    brand: "Kia",
    model: "Stonic Vision-RFK-LHZ-Navi-SHZ-CarPlay",
    year: 2020,
    price: 11990,
    mileage: 117000,
    fuel: "Diesel",
    power: "85 kW (116 PS)",
    firstRegistration: "07/2020",
    condition: "Unfallfrei",
  },
  {
    id: "ford-focus-turnier-titanium",
    images: [placeholder],
    brand: "Ford",
    model: "Focus Turnier Titanium-CarPlay-Navi-PDC",
    year: 2024,
    price: 17490,
    mileage: 99900,
    fuel: "Hybrid Benzin/Elektro",
    power: "92 kW (125 PS)",
    firstRegistration: "02/2024",
    condition: "Unfallfrei",
    vatIncluded: true,
  },
  {
    id: "land-rover-discovery-sport-r-dynamic-se",
    images: [placeholder],
    brand: "Land Rover",
    model: "Discovery Sport R-Dynamic SE-Meridian-Memory-360",
    year: 2023,
    price: 36900,
    mileage: 31000,
    fuel: "Benzin",
    power: "147 kW (200 PS)",
    firstRegistration: "04/2023",
    condition: "Unfallfrei",
  },
  {
    id: "mercedes-gle-300d-4matic",
    images: [placeholder],
    brand: "Mercedes-Benz",
    model: "GLE 300 d 4Matic-AMG-Pano-7-Sitzer-SHZ-SBL-360",
    year: 2023,
    price: 62990,
    mileage: 49900,
    fuel: "Diesel",
    power: "200 kW (272 PS)",
    firstRegistration: "01/2023",
    condition: "Unfallfrei",
  },
  {
    id: "audi-q3-e-hybrid",
    images: [placeholder],
    brand: "Audi",
    model: "Q3 e-hybrid 200 kW-Matrix-S Line-RFK-Tech Plus",
    year: 2026,
    price: 51990,
    mileage: 4900,
    fuel: "Hybrid Benzin/Elektro",
    power: "200 kW (272 PS)",
    firstRegistration: "01/2026",
    condition: "Unfallfrei",
    vatIncluded: true,
  },
];

export const featuredVehicleIds = [
  "audi-q3-e-hybrid",
  "mercedes-gle-300d-4matic",
  "land-rover-discovery-sport-r-dynamic-se",
];

export const featuredVehicles = featuredVehicleIds
  .map((id) => vehicles.find((v) => v.id === id))
  .filter((v): v is Vehicle => Boolean(v));
