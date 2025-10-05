import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import VehicleCard from "@/components/VehicleCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Fahrzeuge = () => {
  const [priceRange, setPriceRange] = useState("all");
  const [fuelType, setFuelType] = useState("all");
  const [brand, setBrand] = useState("all");

  // Mock vehicle data
  const vehicles = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800",
      brand: "BMW",
      model: "3er 320d",
      year: 2020,
      price: 32990,
      mileage: 45000,
      fuel: "Diesel",
      transmission: "Automatik",
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
      brand: "Mercedes-Benz",
      model: "C 200",
      year: 2019,
      price: 28900,
      mileage: 52000,
      fuel: "Benzin",
      transmission: "Automatik",
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800",
      brand: "Audi",
      model: "A4 2.0 TFSI",
      year: 2021,
      price: 35500,
      mileage: 38000,
      fuel: "Benzin",
      transmission: "Automatik",
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800",
      brand: "VW",
      model: "Golf 8 GTI",
      year: 2021,
      price: 33900,
      mileage: 25000,
      fuel: "Benzin",
      transmission: "Automatik",
    },
    {
      id: "5",
      image: "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=800",
      brand: "Porsche",
      model: "Cayenne",
      year: 2018,
      price: 54900,
      mileage: 68000,
      fuel: "Diesel",
      transmission: "Automatik",
    },
    {
      id: "6",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
      brand: "Audi",
      model: "Q5 45 TFSI",
      year: 2020,
      price: 42500,
      mileage: 41000,
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
