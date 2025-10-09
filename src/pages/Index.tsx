import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, Wrench, Euro, Clock, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import VehicleCard from "@/components/VehicleCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useParallax } from "@/hooks/useScrollAnimation";
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

  const { ref: heroRef, offsetY } = useParallax(0.3);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlay, setShowPlay] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section with Parallax */}
      <section 
        ref={heroRef}
        className="relative h-[90vh] flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-75"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            transform: `translateY(${offsetY * 0.5}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
              Ihr zuverlässiger Partner für
              <span className="block bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent mt-3">
                Gebrauchtwagen im Hochtaunuskreis
              </span>
            </h1>
          </div>
          <ScrollReveal animation="fade-in-up" delay={200}>
            <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto font-light">
              Hochwertige Fahrzeuge, faire Preise und persönliche Beratung
            </p>
          </ScrollReveal>
          <ScrollReveal animation="scale-in" delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/fahrzeuge">
                <Button 
                  variant="hero" 
                  size="xl"
                  className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                >
                  Fahrzeuge ansehen
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </Link>
              <Link to="/kontakt">
                <Button 
                  variant="outline" 
                  size="xl" 
                  className="border-white/30 text-white hover:bg-white hover:text-secondary glass hover:scale-105 transition-all duration-300"
                >
                  Termin buchen
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Showreel Video Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Einblicke in unseren Showroom</h2>
            <p className="text-center text-muted-foreground mb-8">Kurzer Eindruck in 20 Sekunden</p>
          </ScrollReveal>
          <ScrollReveal animation="scale-in" delay={150}>
            <div className="relative rounded-xl overflow-hidden shadow-xl border bg-card">
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                poster={heroImage}
                onLoadedData={() => {
                  const v = videoRef.current;
                  if (!v) return;
                  const p = v.play();
                  if (p !== undefined) {
                    p.catch(() => setShowPlay(true));
                  }
                }}
                onPlay={() => setShowPlay(false)}
                onPause={() => setShowPlay(true)}
                className="w-full h-auto aspect-video object-cover saturate-125 contrast-110"
              >
                <source src="https://cdn.pixabay.com/video/2023/07/25/173195-849838825_large.mp4" type="video/mp4" />
                Ihr Browser unterstützt das Video-Tag nicht.
              </video>
              {showPlay && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm">
                  <Button size="lg" onClick={() => videoRef.current?.play()}>
                    Video abspielen
                  </Button>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* Benefits Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Warum Hochtaunus-Automobile?
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
              Ihr vertrauensvoller Partner für Qualität und Service
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <ScrollReveal 
                key={index} 
                animation="fade-in-up" 
                delay={index * 100}
              >
                <Card className="hover-lift border-none shadow-lg h-full group cursor-pointer">
                  <CardContent className="p-8">
                    <div className="mb-6 relative">
                      <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                      <benefit.icon className="h-14 w-14 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      {/* Featured Vehicles */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-in-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Aktuelle Fahrzeuge</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Entdecken Sie unsere handverlesenen Premium-Gebrauchtwagen
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredVehicles.map((vehicle, index) => (
              <ScrollReveal 
                key={vehicle.id}
                animation="zoom-in"
                delay={index * 150}
              >
                <VehicleCard {...vehicle} />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal animation="scale-in" delay={450}>
            <div className="text-center">
              <Link to="/fahrzeuge">
                <Button 
                  size="lg"
                  className="group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Alle Fahrzeuge anzeigen
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-orange-500 to-primary opacity-95" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal animation="fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Verkaufen Sie Ihr Fahrzeug?
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-in-up" delay={150}>
            <p className="text-xl md:text-2xl mb-10 text-white/95 max-w-3xl mx-auto font-light leading-relaxed">
              Wir kaufen Ihr Auto zu fairen Preisen – schnell, transparent und unkompliziert
            </p>
          </ScrollReveal>
          <ScrollReveal animation="scale-in" delay={300}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/ankauf">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group"
                >
                  Jetzt Fahrzeug anbieten
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </Link>
              <Link to="/bewertung">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary glass hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  Kostenlose Bewertung
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
