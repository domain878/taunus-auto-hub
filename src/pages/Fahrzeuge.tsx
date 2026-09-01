import { useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import VehicleCard from "@/components/VehicleCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { vehicles as allVehicles } from "@/data/vehicles";

const brandMatchers: Record<string, string[]> = {
  bmw: ["bmw"],
  mercedes: ["mercedes"],
  audi: ["audi"],
  vw: ["volkswagen", "vw"],
  landrover: ["land rover"],
  hyundai: ["hyundai"],
  kia: ["kia"],
  ford: ["ford"],
  seat: ["seat"],
};

const Fahrzeuge = () => {
  const [priceRange, setPriceRange] = useState("all");
  const [fuelType, setFuelType] = useState("all");
  const [brand, setBrand] = useState("all");
  const [search, setSearch] = useState("");

  const vehicles = useMemo(() => {
    return allVehicles.filter((vehicle) => {
      if (brand !== "all") {
        const matchers = brandMatchers[brand] ?? [brand];
        const brandText = `${vehicle.brand} ${vehicle.model}`.toLowerCase();
        if (!matchers.some((m) => brandText.includes(m))) return false;
      }

      if (fuelType !== "all") {
        const fuel = vehicle.fuel.toLowerCase();
        if (fuelType === "hybrid" && !fuel.includes("hybrid")) return false;
        if (fuelType === "benzin" && !(fuel.includes("benzin") && !fuel.includes("hybrid"))) return false;
        if (fuelType === "diesel" && !fuel.includes("diesel")) return false;
        if (fuelType === "elektro" && !(fuel.includes("elektro") && !fuel.includes("hybrid"))) return false;
      }

      if (priceRange !== "all") {
        const p = vehicle.price;
        if (priceRange === "0-20000" && p > 20000) return false;
        if (priceRange === "20000-30000" && (p < 20000 || p > 30000)) return false;
        if (priceRange === "30000-40000" && (p < 30000 || p > 40000)) return false;
        if (priceRange === "40000+" && p < 40000) return false;
      }

      const query = search.trim().toLowerCase();
      if (query) {
        const haystack = `${vehicle.brand} ${vehicle.model} ${vehicle.fuel} ${vehicle.firstRegistration} ${vehicle.power}`.toLowerCase();
        if (!query.split(/\s+/).every((term) => haystack.includes(term))) return false;
      }

      return true;
    });
  }, [brand, fuelType, priceRange, search]);


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
                  <SelectItem value="audi">Audi</SelectItem>
                  <SelectItem value="bmw">BMW</SelectItem>
                  <SelectItem value="ford">Ford</SelectItem>
                  <SelectItem value="hyundai">Hyundai</SelectItem>
                  <SelectItem value="kia">Kia</SelectItem>
                  <SelectItem value="landrover">Land Rover</SelectItem>
                  <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                  <SelectItem value="vw">Volkswagen</SelectItem>
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
              <Input
                id="search"
                type="text"
                placeholder="Fahrzeug suchen..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

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

          {vehicles.length === 0 && (
            <p className="text-muted-foreground">
              Für Ihre Auswahl haben wir aktuell kein passendes Fahrzeug. Bitte passen Sie die Filter an oder
              sprechen Sie uns direkt an.
            </p>
          )}

        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Fahrzeuge;
