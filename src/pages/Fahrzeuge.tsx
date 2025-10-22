import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import VehicleCard from "@/components/VehicleCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import audiA4Image from "@/assets/audi-a4.jpg";
import miniCooperImage from "@/assets/mini-cooper.jpg";
import audiA8Image from "@/assets/audi-a8.jpg";
import fordFocusImage from "@/assets/ford-focus.jpg";
import opelInsigniaImage from "@/assets/opel-insignia.jpg";
import hondaHrvImage from "@/assets/honda-hrv.jpg";
import fiat500cImage from "@/assets/fiat-500c.jpg";
import vwTouranImage from "@/assets/vw-touran.jpg";
import mazda3Image from "@/assets/mazda-3.jpg";
import bmw225xeImage from "@/assets/bmw-225xe.jpg";
import toyotaCorollaImage from "@/assets/toyota-corolla.jpg";
import nissanQashqaiImage from "@/assets/nissan-qashqai.jpg";
import mercedesE300Image from "@/assets/mercedes-e300.jpg";

const Fahrzeuge = () => {
  const [priceRange, setPriceRange] = useState("all");
  const [fuelType, setFuelType] = useState("all");
  const [brand, setBrand] = useState("all");

  // Vehicle data with your images
  const [vehicles, setVehicles] = useState([
    {
      id: "1",
      images: [audiA4Image],
      brand: "Audi",
      model: "A4 Quattro",
      year: 2017,
      price: 20990,
      mileage: 135000,
      fuel: "Diesel",
      transmission: "Automatik",
      color: "Schwarz",
      doors: 4,
      seats: 5,
      power: "140 kW (190 PS)",
      co2Emissions: "119 g/km",
      features: ["Navigationssystem", "Ledersitze", "Klimaautomatik", "Xenon"],
      condition: "Gebraucht",
      firstRegistration: "03/2017",
    },
    {
      id: "2",
      images: [miniCooperImage],
      brand: "Mini",
      model: "Cooper S JCW",
      year: 2022,
      price: 34990,
      mileage: 23400,
      fuel: "Benzin",
      transmission: "Automatik",
      color: "Rot",
      doors: 2,
      seats: 4,
      power: "178 kW (242 PS)",
      co2Emissions: "154 g/km",
      features: ["Panoramadach", "JCW Sportpaket", "Harman Kardon", "LED"],
      condition: "Neuwertig",
      firstRegistration: "06/2022",
    },
    {
      id: "3",
      images: [audiA8Image],
      brand: "Audi",
      model: "A8 4.2 TDI",
      year: 2011,
      price: 14990,
      mileage: 247500,
      fuel: "Diesel",
      transmission: "Automatik",
      color: "Grau Metallic",
      doors: 4,
      seats: 5,
      power: "258 kW (351 PS)",
      co2Emissions: "189 g/km",
      features: ["Luftfederung", "Standheizung", "Massage", "B&O Sound"],
      condition: "Gebraucht",
      firstRegistration: "11/2011",
    },
    {
      id: "4",
      images: [fordFocusImage],
      brand: "Ford",
      model: "Focus Titanium",
      year: 2011,
      price: 8890,
      mileage: 117000,
      fuel: "Diesel",
      transmission: "Schaltgetriebe",
      color: "Blau",
      doors: 5,
      seats: 5,
      power: "85 kW (115 PS)",
      co2Emissions: "109 g/km",
      features: ["Klimaanlage", "Einparkhilfe", "Tempomat"],
      condition: "Gebraucht",
      firstRegistration: "08/2011",
    },
    {
      id: "5",
      images: [opelInsigniaImage],
      brand: "Opel",
      model: "Insignia OPC Line",
      year: 2018,
      price: 19900,
      mileage: 64500,
      fuel: "Benzin",
      transmission: "Automatik",
      color: "Weiß",
      doors: 5,
      seats: 5,
      power: "191 kW (260 PS)",
      co2Emissions: "159 g/km",
      features: ["Matrix LED", "Rückfahrkamera", "Navi", "Sitzheizung"],
      condition: "Sehr gut",
      firstRegistration: "04/2018",
    },
    {
      id: "6",
      images: [hondaHrvImage],
      brand: "Honda",
      model: "HR-V Executive",
      year: 2017,
      price: 15890,
      mileage: 91000,
      fuel: "Benzin",
      transmission: "Automatik",
      color: "Weiß",
      doors: 5,
      seats: 5,
      power: "96 kW (130 PS)",
      co2Emissions: "132 g/km",
      features: ["Einparksensoren", "Klimaautomatik", "Multifunktionslenkrad", "Bluetooth"],
      condition: "Gebraucht",
      firstRegistration: "09/2017",
    },
    {
      id: "7",
      images: [fiat500cImage],
      brand: "Fiat",
      model: "500 C Hey Google",
      year: 2021,
      price: 12900,
      mileage: 26500,
      fuel: "Benzin",
      transmission: "Schaltgetriebe",
      color: "Weiß",
      doors: 3,
      seats: 4,
      power: "51 kW (69 PS)",
      co2Emissions: "115 g/km",
      features: ["Panorama-Stoffdach", "Klimaanlage", "Radio", "Zentralverriegelung"],
      condition: "Sehr gut",
      firstRegistration: "03/2021",
    },
    {
      id: "8",
      images: [vwTouranImage],
      brand: "VW",
      model: "Touran Comfortline",
      year: 2015,
      price: 12390,
      mileage: 170000,
      fuel: "Diesel",
      transmission: "Automatik",
      color: "Schwarz",
      doors: 5,
      seats: 7,
      power: "81 kW (110 PS)",
      co2Emissions: "119 g/km",
      features: ["7-Sitzer", "Navigationssystem", "Klimaautomatik", "Tempomat"],
      condition: "Gebraucht",
      firstRegistration: "05/2015",
    },
    {
      id: "9",
      images: [mazda3Image],
      brand: "Mazda",
      model: "3 Sport",
      year: 2013,
      price: 7290,
      mileage: 107000,
      fuel: "Benzin",
      transmission: "Schaltgetriebe",
      color: "Schwarz Metallic",
      doors: 5,
      seats: 5,
      power: "77 kW (105 PS)",
      co2Emissions: "139 g/km",
      features: ["Klimaanlage", "Multifunktionslenkrad", "Navi", "Alufelgen"],
      condition: "Gebraucht",
      firstRegistration: "07/2013",
    },
    {
      id: "10",
      images: [bmw225xeImage],
      brand: "BMW",
      model: "225 xe Active Tourer",
      year: 2017,
      price: 14990,
      mileage: 96000,
      fuel: "Hybrid",
      transmission: "Automatik",
      color: "Schwarz",
      doors: 5,
      seats: 5,
      power: "100 kW (136 PS)",
      co2Emissions: "46 g/km",
      features: ["2-Zonen-Klimaautomatik", "Einparkhilfe vorne & hinten", "Euro6", "Unfallfrei"],
      condition: "Gebraucht",
      firstRegistration: "06/2017",
    },
    {
      id: "11",
      images: [toyotaCorollaImage],
      brand: "Toyota",
      model: "Corolla Team dD",
      year: 2024,
      price: 17290,
      mileage: 178900,
      fuel: "Hybrid",
      transmission: "Automatik",
      color: "Weiß",
      doors: 5,
      seats: 5,
      power: "103 kW (140 PS)",
      co2Emissions: "98 g/km",
      features: ["Voll ausgestattet", "Garantie", "1.8 Hybrid", "Team dD"],
      condition: "Neuwertig",
      firstRegistration: "01/2024",
    },
    {
      id: "12",
      images: [nissanQashqaiImage],
      brand: "Nissan",
      model: "Qashqai e-Power Tekna",
      year: 2024,
      price: 23990,
      mileage: 105000,
      fuel: "Hybrid",
      transmission: "Automatik",
      color: "Schwarz",
      doors: 5,
      seats: 5,
      power: "140 kW (190 PS)",
      co2Emissions: "119 g/km",
      features: ["Tekna Ausstattung", "e-Power Hybrid", "Navigationssystem", "Sicherheitspaket"],
      condition: "Neuwertig",
      firstRegistration: "04/2024",
    },
    {
      id: "13",
      images: [mercedesE300Image],
      brand: "Mercedes",
      model: "E 300 CDI",
      year: 2015,
      price: 13290,
      mileage: 250000,
      fuel: "Diesel",
      transmission: "Automatik",
      color: "Silber Metallic",
      doors: 4,
      seats: 5,
      power: "170 kW (231 PS)",
      co2Emissions: "139 g/km",
      features: ["Euro 6", "Navigationssystem", "Klimaautomatik", "Einparkhilfe"],
      condition: "Gebraucht",
      firstRegistration: "2015",
    },
  ]);

return (
  <div className="min-h-screen flex flex-col">
    <Navigation />

      {/* Header ohne Video */}
      <section className="py-16 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-scale-in">
            Unsere Fahrzeuge
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Entdecken Sie unsere große Auswahl an geprüften Gebrauchtwagen. Jedes Fahrzeug wird sorgfältig ausgewählt und geprüft.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <div className="bg-card/80 backdrop-blur-sm rounded-lg px-6 py-3 border">
              <p className="font-semibold">✓ Geprüfte Qualität</p>
            </div>
            <div className="bg-card/80 backdrop-blur-sm rounded-lg px-6 py-3 border">
              <p className="font-semibold">✓ Faire Preise</p>
            </div>
            <div className="bg-card/80 backdrop-blur-sm rounded-lg px-6 py-3 border">
              <p className="font-semibold">✓ Persönliche Beratung</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">Finden Sie Ihr Traumauto</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
              <Label htmlFor="brand">Marke</Label>
              <Select value={brand} onValueChange={setBrand}>
                <SelectTrigger id="brand">
                  <SelectValue placeholder="Alle Marken" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Marken</SelectItem>
                  <SelectItem value="bmw">BMW</SelectItem>
                  <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                  <SelectItem value="audi">Audi</SelectItem>
                  <SelectItem value="vw">VW</SelectItem>
                  <SelectItem value="porsche">Porsche</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="fuel">Kraftstoff</Label>
              <Select value={fuelType} onValueChange={setFuelType}>
                <SelectTrigger id="fuel">
                  <SelectValue placeholder="Alle Kraftstoffe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Kraftstoffe</SelectItem>
                  <SelectItem value="benzin">Benzin</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="elektro">Elektro</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Preisklasse</Label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger id="price">
                  <SelectValue placeholder="Alle Preise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Preise</SelectItem>
                  <SelectItem value="0-20000">bis 20.000 €</SelectItem>
                  <SelectItem value="20000-30000">20.000 - 30.000 €</SelectItem>
                  <SelectItem value="30000-40000">30.000 - 40.000 €</SelectItem>
                  <SelectItem value="40000+">ab 40.000 €</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="search">Suche</Label>
              <Input id="search" type="text" placeholder="Fahrzeug suchen..." />
            </div>
          </div>
        </div>
      </section>


      {/* Vehicle Grid */}
      <section className="py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-lg font-semibold text-foreground">
              {vehicles.length} Fahrzeuge gefunden
            </p>
            <p className="text-sm text-muted-foreground">
              Alle Fahrzeuge wurden technisch geprüft
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle, index) => (
              <div 
                key={vehicle.id} 
                className="animate-fade-in hover-scale" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <VehicleCard {...vehicle} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Fahrzeuge;
