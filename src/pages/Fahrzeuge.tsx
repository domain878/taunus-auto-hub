import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import VehicleCard from "@/components/VehicleCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import opelInsigniaImage from "@/assets/opel-insignia.jpg";
import bmw225xeImage from "@/assets/bmw-225xe.jpg";
import mercedesE300Image from "@/assets/mercedes-e300.jpg";
import mercedesE200CabrioImage from "@/assets/mercedes-e200-cabrio.jpg";
import mercedesC200Image from "@/assets/mercedes-c200.jpg";
import bmwM850iImage from "@/assets/bmw-m850i.jpg";
import alfaRomeoStelvioImage from "@/assets/alfa-romeo-stelvio.jpg";
import audiA1Image from "@/assets/audi-a1.jpg";

const Fahrzeuge = () => {
  const [priceRange, setPriceRange] = useState("all");
  const [fuelType, setFuelType] = useState("all");
  const [brand, setBrand] = useState("all");

  // Vehicle data with your images
  const [vehicles, setVehicles] = useState([
    {
      id: "2",
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
      id: "4",
      images: [bmw225xeImage],
      brand: "BMW",
      model: "225 xe Active Tourer",
      year: 2020,
      price: 15990,
      mileage: 89990,
      fuel: "Hybrid",
      transmission: "Automatik",
      color: "Schwarz",
      doors: 5,
      seats: 5,
      power: "100 kW (136 PS)",
      co2Emissions: "46 g/km",
      features: ["2-Zonen-Klimaautomatik", "Einparkhilfe vorne & hinten", "Euro6", "Unfallfrei"],
      condition: "Gebraucht",
      firstRegistration: "06/2020",
    },
    {
      id: "7",
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
    {
      id: "11",
      images: [mercedesE200CabrioImage],
      brand: "Mercedes",
      model: "E 200 Cabrio AMG Line",
      year: 2019,
      price: 36490,
      mileage: 23500,
      fuel: "Benzin",
      transmission: "Automatik",
      color: "Weiß",
      doors: 2,
      seats: 4,
      power: "135 kW (184 PS)",
      co2Emissions: "145 g/km",
      features: ["AMG Line", "Airscarf", "LED-Scheinwerfer", "Rückfahrkamera", "TWA", "CarPlay"],
      condition: "Sehr gut",
      firstRegistration: "04/2019",
    },
    {
      id: "14",
      images: [mercedesC200Image],
      brand: "Mercedes",
      model: "C 200",
      year: 2018,
      price: 24990,
      mileage: 45000,
      fuel: "Benzin",
      transmission: "Automatik",
      color: "Weiß",
      doors: 5,
      seats: 5,
      power: "135 kW (184 PS)",
      co2Emissions: "149 g/km",
      features: ["LED-Scheinwerfer", "Keyless Go", "CarPlay", "Vollleder", "Widescreen Cockpit"],
      condition: "Unfallfrei",
      firstRegistration: "09/2018",
    },
    {
      id: "15",
      images: [bmwM850iImage],
      brand: "BMW",
      model: "M850i xDrive Gran Coupé",
      year: 2021,
      price: 61990,
      mileage: 89990,
      fuel: "Benzin",
      transmission: "Automatik",
      color: "Schwarz",
      doors: 4,
      seats: 4,
      power: "390 kW (530 PS)",
      co2Emissions: "224 g/km",
      features: ["M Carbon Paket", "Panoramadach", "B&W Sound", "360° Kamera", "E10-geeignet"],
      condition: "Unfallfrei",
      firstRegistration: "03/2021",
      vatIncluded: true,
    },
    {
      id: "16",
      images: [alfaRomeoStelvioImage],
      brand: "Alfa Romeo",
      model: "Stelvio Super",
      year: 2019,
      price: 21990,
      mileage: 92900,
      fuel: "Diesel",
      transmission: "Automatik",
      color: "Grau",
      doors: 5,
      seats: 5,
      power: "140 kW (190 PS)",
      co2Emissions: "N/A",
      features: ["CarPlay", "Sitzheizung", "Memory", "Navi", "LED", "Lenkradheizung"],
      condition: "Gebraucht",
      firstRegistration: "2019",
    },
    {
      id: "17",
      images: [audiA1Image],
      brand: "Audi",
      model: "A1",
      year: 2015,
      price: 11090,
      mileage: 97500,
      fuel: "Benzin",
      transmission: "Schaltgetriebe",
      color: "Schwarz",
      doors: 3,
      seats: 4,
      power: "92 kW (125 PS)",
      co2Emissions: "N/A",
      features: ["Navi", "Tempomat", "Sitzheizung", "PDC", "MMI", "Xenon", "Bluetooth"],
      condition: "Gebraucht",
      firstRegistration: "04/2015",
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
