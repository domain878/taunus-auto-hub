import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, Wrench, Euro, Clock, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import VehicleCard from "@/components/VehicleCard";
import heroImage from "@/assets/hero-car.jpg";
import audiA4Image from "@/assets/audi-a4.jpg";
import miniCooperImage from "@/assets/mini-cooper.jpg";
import audiA8Image from "@/assets/audi-a8.jpg";

const Index = () => {
  // Featured vehicle data
  const featuredVehicles = [
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
      previousOwners: 1,
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
      previousOwners: 1,
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
      previousOwners: 2,
    },
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Geprüfte Fahrzeuge",
      description: "Alle Fahrzeuge werden von uns sorgfältig geprüft und aufbereitet",
    },
    {
      icon: Shield,
      title: "Garantie & Sicherheit",
      description: "Profitieren Sie von unserer Gewährleistung und Garantie",
    },
    {
      icon: Wrench,
      title: "Werkstatt-Check",
      description: "Jedes Fahrzeug durchläuft unsere professionelle Werkstatt",
    },
    {
      icon: Euro,
      title: "Faire Preise",
      description: "Transparente Preisgestaltung und faire Konditionen",
    },
    {
      icon: Clock,
      title: "Online Terminvergabe",
      description: "Buchen Sie bequem online einen Termin für Probefahrten",
    },
    {
      icon: Star,
      title: "Zufriedene Kunden",
      description: "Über 500 zufriedene Kunden vertrauen auf unsere Expertise",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-scale-in">
            Ihr zuverlässiger Partner für
            <span className="block text-primary mt-2">Gebrauchtwagen im Hochtaunuskreis</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Hochwertige Fahrzeuge, faire Preise und persönliche Beratung
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/fahrzeuge">
              <Button variant="hero" size="xl">
                Fahrzeuge ansehen
              </Button>
            </Link>
            <Link to="/kontakt">
              <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-secondary">
                Termin buchen
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in">
            Warum Hochtaunus-Automobile?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <benefit.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Aktuelle Fahrzeuge</h2>
            <p className="text-muted-foreground text-lg">
              Entdecken Sie unsere ausgewählten Gebrauchtwagen
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} {...vehicle} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/fahrzeuge">
              <Button size="lg">Alle Fahrzeuge anzeigen</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground animate-fade-in">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-scale-in">
            Verkaufen Sie Ihr Fahrzeug?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Wir kaufen Ihr Auto zu fairen Preisen – schnell, transparent und unkompliziert
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ankauf">
              <Button variant="secondary" size="lg">
                Jetzt Fahrzeug anbieten
              </Button>
            </Link>
            <Link to="/bewertung">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Kostenlose Bewertung
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
