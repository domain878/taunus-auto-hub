import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Shield, Heart } from "lucide-react";

const UeberUns = () => {
  const values = [
    {
      icon: Award,
      title: "Erfahrung",
      description: "Über 10 Jahre Erfahrung im Automobilhandel und hunderte zufriedene Kunden",
    },
    {
      icon: Shield,
      title: "Vertrauen",
      description: "Seriöse Beratung und transparente Geschäftsabwicklung sind unsere Priorität",
    },
    {
      icon: Users,
      title: "Persönlich",
      description: "Individuelle Beratung und persönlicher Service für jeden Kunden",
    },
    {
      icon: Heart,
      title: "Leidenschaft",
      description: "Unsere Leidenschaft für Automobile spüren Sie in jedem Detail",
    },
  ];

  const reviews = [
    {
      name: "Michael Schmidt",
      rating: 5,
      text: "Sehr professionelle Beratung und faire Preise. Habe hier meinen Traumwagen gefunden!",
    },
    {
      name: "Sandra Müller",
      rating: 5,
      text: "Toller Service! Die Probefahrt war super organisiert und der Kaufprozess völlig unkompliziert.",
    },
    {
      name: "Thomas Weber",
      rating: 5,
      text: "Kann ich nur weiterempfehlen. Ehrliche Beratung und top Fahrzeuge zu fairen Preisen.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Über uns</h1>
          <p className="text-xl text-primary-foreground/90">
            Ihr zuverlässiger Partner für Gebrauchtwagen im Hochtaunuskreis
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">Unsere Geschichte</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Seit über 10 Jahren sind wir Ihre erste Adresse für hochwertige Gebrauchtwagen im Hochtaunuskreis. Vertrauen, Qualität und ehrliche Beratung stehen bei Hochtaunusautomobile im Mittelpunkt.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Unser erfahrenes Team lebt seine Leidenschaft für Autos – und das spüren Sie bei jedem Besuch. Jedes Fahrzeug in unserem Bestand wird mit größter Sorgfalt ausgewählt, geprüft und aufbereitet.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Wir nehmen uns Zeit für Ihre Wünsche und finden gemeinsam das Auto, das wirklich zu Ihnen passt.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Unsere Werte</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Das sagen unsere Kunden
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-primary text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
                  <p className="font-semibold">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10+</div>
              <div className="text-sm md:text-base text-primary-foreground/90">Jahre Erfahrung</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">400+</div>
              <div className="text-sm md:text-base text-primary-foreground/90">Zufriedene Kunden</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-sm md:text-base text-primary-foreground/90">Qualitätsgeprüft</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default UeberUns;
