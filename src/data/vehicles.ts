import vwGolfSportsvanImage from "@/assets/current-vehicles/01-vw-golf-sportsvan.jpg";
import mercedesC200Image from "@/assets/current-vehicles/02-mercedes-c200.jpg";
import mercedesA180dImage from "@/assets/current-vehicles/03-mercedes-a180d.jpg";
import bmwM6GranCoupeImage from "@/assets/current-vehicles/04-bmw-m6-gran-coupe.jpg";
import mercedesC43AmgImage from "@/assets/current-vehicles/05-mercedes-c43-amg.jpg";
import mercedesCla250Image from "@/assets/current-vehicles/06-mercedes-cla250.jpg";
import rangeRoverEvoqueImage from "@/assets/current-vehicles/07-range-rover-evoque.jpg";
import hyundaiI20NLineImage from "@/assets/current-vehicles/08-hyundai-i20-n-line.jpg";
import kiaStonicImage from "@/assets/current-vehicles/09-kia-stonic.jpg";
import fordFocusTurnierImage from "@/assets/current-vehicles/10-ford-focus-turnier.jpg";
import landRoverDiscoverySportImage from "@/assets/current-vehicles/11-land-rover-discovery-sport.jpg";
import mercedesGle300dImage from "@/assets/current-vehicles/12-mercedes-gle300d.jpg";
import audiQ3EHybridImage from "@/assets/current-vehicles/13-audi-q3-e-hybrid.jpg";
import seatAronaImage from "@/assets/current-vehicles/14-seat-arona.jpg";
import kiaSorentoImage from "@/assets/current-vehicles/15-kia-sorento.jpg";

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

// Bestand geprüft am 01.09.2026 – Quelle: https://home.mobile.de/HOCHTAUNUSAUTOMOBILE
// Nur verifizierte Angaben. Fehlende Werte bleiben leer (nicht erfunden).
export const vehicles: Vehicle[] = [
  {
    id: "vw-golf-sportsvan-lounge",
    images: [vwGolfSportsvanImage],
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
    price: 23400,
    mileage: 45000,
    fuel: "Benzin",
    power: "135 kW (184 PS)",
    firstRegistration: "09/2018",
    condition: "Unfallfrei",
  },
  {
    id: "mercedes-a180d-limousine",
    images: [mercedesA180dImage],
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
    images: [bmwM6GranCoupeImage],
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
    images: [mercedesC43AmgImage],
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
    images: [mercedesCla250Image],
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
    id: "kia-stonic-vision",
    images: [kiaStonicImage],
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
    price: 36900,
    mileage: 31000,
    fuel: "Benzin",
    power: "147 kW (200 PS)",
    firstRegistration: "04/2023",
    condition: "Unfallfrei",
  },
  {
    id: "mercedes-gle-300d-4matic",
    images: [mercedesGle300dImage],
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
    model: "Arona Xcellence-CarPlay-AHK-NAVI-SHZ-RFK",
    year: 2019,
    price: 12890,
    mileage: 107300,
    fuel: "Diesel",
    power: "85 kW (116 PS)",
    firstRegistration: "01/2019",
    condition: "Gebraucht",
  },
  {
    id: "kia-sorento-2-5-crdi-vgt-ex",
    images: [kiaSorentoImage],
    brand: "Kia",
    model: "Sorento 2.5 CRDi VGT EX-LEDER-SHZ-DVD-SD-PDC",
    year: 2009,
    price: 3790,
    mileage: 190000,
    fuel: "Diesel",
    power: "125 kW (170 PS)",
    firstRegistration: "07/2009",
    condition: "Unfallfrei",
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
