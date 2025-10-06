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

const Fahrzeuge = () => {
  const [priceRange, setPriceRange] = useState("all");
  const [fuelType, setFuelType] = useState("all");
  const [brand, setBrand] = useState("all");

  // Vehicle data with your images
  const vehicles = [
    {
      id: "1",
      image: audiA4Image,
      brand: "Audi",
      model: "A4 Quattro",
      year: 2017,
      price: 20990,
      mileage: 135000,
      fuel: "Diesel",
      transmission: "Automatik",
    },
    {
      id: "2",
      image: miniCooperImage,
      brand: "Mini",
      model: "Cooper S JCW",
      year: 2022,
      price: 34990,
      mileage: 23400,
      fuel: "Benzin",
      transmission: "Automatik",
    },
    {
      id: "3",
      image: audiA8Image,
      brand: "Audi",
      model: "A8 4.2 TDI",
      year: 2011,
      price: 14990,
      mileage: 247500,
      fuel: "Diesel",
      transmission: "Automatik",
    },
    {
      id: "4",
      image: fordFocusImage,
      brand: "Ford",
      model: "Focus Titanium",
      year: 2011,
      price: 8890,
      mileage: 117000,
      fuel: "Diesel",
      transmission: "Schaltgetriebe",
    },
    {
      id: "5",
      image: opelInsigniaImage,
      brand: "Opel",
      model: "Insignia OPC Line",
      year: 2018,
      price: 19900,
      mileage: 64500,
      fuel: "Benzin",
      transmission: "Automatik",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Unsere Fahrzeuge</h1>
          <p className="text-xl text-primary-foreground/90">
            Entdecken Sie unsere große Auswahl an geprüften Gebrauchtwagen
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4">
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
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-muted-foreground">
              {vehicles.length} Fahrzeuge gefunden
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} {...vehicle} />
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
