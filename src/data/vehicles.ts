import mercedesC200Image from "@/assets/current-vehicles/02-mercedes-c200.jpg";
import rangeRoverEvoqueImage from "@/assets/current-vehicles/07-range-rover-evoque.jpg";
import hyundaiI20NLineImage from "@/assets/current-vehicles/08-hyundai-i20-n-line.jpg";
import fordFocusTurnierImage from "@/assets/current-vehicles/10-ford-focus-turnier.jpg";
import landRoverDiscoverySportImage from "@/assets/current-vehicles/11-land-rover-discovery-sport.jpg";
import audiQ3EHybridImage from "@/assets/current-vehicles/13-audi-q3-e-hybrid.jpg";
import seatAronaImage from "@/assets/current-vehicles/14-seat-arona.jpg";
import mercedesE200TModellImage from "@/assets/current-vehicles/16-mercedes-e200-t-modell.jpg";

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

// Bestand geprüft am 13.11.2026 – Quelle: https://home.mobile.de/HOCHTAUNUSAUTOMOBILE
// Nur verifizierte Angaben. Fehlende Werte bleiben leer (nicht erfunden).
export const vehicles: Vehicle[] = [
  {
    id: "mercedes-c200-widescreen",
    images: [mercedesC200Image],
    brand: "Mercedes-Benz",
    model: "C 200 LED-Key-CarPlay-Vollleder-Widescreen",
    year: 2018,
    price: 23400,
    mileage: 45000,
    fuel: "Benzin",
    power: "135 kW (184 PS)",
    firstRegistration: "09/2018",
    condition: "Unfallfrei",
  },
  {
    id: "range-rover-evoque-se-dynamic",
    images: [rangeRoverEvoqueImage],
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
    images: [hyundaiI20NLineImage],
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
    id: "ford-focus-turnier-titanium",
    images: [fordFocusTurnierImage],
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
    images: [landRoverDiscoverySportImage],
    brand: "Land Rover",
    model: "Discovery Sport R-Dynamic SE-Meridian-Memory-360",
    year: 2023,
    price: 36490,
    mileage: 31000,
    fuel: "Benzin",
    power: "147 kW (200 PS)",
    firstRegistration: "04/2023",
    condition: "Unfallfrei",
  },
  {
    id: "audi-q3-e-hybrid",
    images: [audiQ3EHybridImage],
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
  {
    id: "seat-arona-xcellence",
    images: [seatAronaImage],
    brand: "Seat",
    model: "Arona Xcellence-CarPlay-AHK-NAVI-SHZ-RFK-KEY",
    year: 2019,
    price: 12890,
    mileage: 107300,
    fuel: "Diesel",
    power: "85 kW (116 PS)",
    firstRegistration: "01/2019",
    condition: "Gebraucht",
  },
  {
    id: "mercedes-e200-t-modell",
    images: [mercedesE200TModellImage],
    brand: "Mercedes-Benz",
    model: "E 200 T-Modell E 200-PANO-360-Widescreen",
    year: 2020,
    price: 23990,
    mileage: 102000,
    fuel: "Benzin",
    power: "145 kW (197 PS)",
    firstRegistration: "01/2020",
    condition: "Unfallfrei",
  },
];

export const featuredVehicleIds = [
  "audi-q3-e-hybrid",
  "mercedes-e200-t-modell",
  "land-rover-discovery-sport-r-dynamic-se",
];

export const featuredVehicles = featuredVehicleIds
  .map((id) => vehicles.find((v) => v.id === id))
  .filter((v): v is Vehicle => Boolean(v));
