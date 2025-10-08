import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Ankauf = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    brand: "",
    model: "",
    year: "",
    mileage: "",
    condition: "",
    message: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Vielen Dank! Wir melden uns in Kürze bei Ihnen.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      brand: "",
      model: "",
      year: "",
      mileage: "",
      condition: "",
      message: "",
    });
  };

  const benefits = [
    "Schnelle und unkomplizierte Abwicklung",
    "Faire und transparente Preise",
    "Kostenlose Fahrzeugbewertung vor Ort",
    "Sofortige Barauszahlung möglich",
    "Übernahme aller Formalitäten",
    "Seriöse Abwicklung mit Vertrag",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-scale-in">Fahrzeugankauf</h1>
          <p className="text-xl text-primary-foreground/90">
            Wir kaufen Ihr Auto zu fairen Preisen – schnell, transparent und unkompliziert
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-muted animate-fade-in">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Ihre Vorteile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Fahrzeug anbieten</CardTitle>
              <p className="text-muted-foreground">
                Füllen Sie das Formular aus und laden Sie Fotos Ihres Fahrzeugs hoch. Wir melden uns
                schnellstmöglich bei Ihnen.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-Mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand">Marke *</Label>
                    <Input
                      id="brand"
                      required
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">Modell *</Label>
                    <Input
                      id="model"
                      required
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="year">Erstzulassung *</Label>
                    <Input
                      id="year"
                      type="number"
                      required
                      placeholder="z.B. 2019"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mileage">Kilometerstand *</Label>
                    <Input
                      id="mileage"
                      type="number"
                      required
                      placeholder="z.B. 50000"
                      value={formData.mileage}
                      onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="condition">Zustand</Label>
                  <Input
                    id="condition"
                    placeholder="z.B. Sehr gut, Unfallschäden, etc."
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="message">Zusätzliche Informationen</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Beschreiben Sie Ihr Fahrzeug..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div>
<Label htmlFor="photos">Fotos hochladen</Label>

<label
  htmlFor="photos"
  className="mt-2 border-2 border-dashed border-border rounded p-8 text-center hover:border-primary transition-colors cursor-pointer block"
>
 <input
    type="file"
    id="photos"
    accept="image/*"
    multiple
    capture="environment"
    className="hidden"
    onChange={(e) => setPhotos(Array.from(e.target.files || []))}
  />

  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
  <p className="text-sm text-muted-foreground">
    📸 Klicken Sie hier oder ziehen Sie Fotos hierher
  </p>
  <p className="text-xs text-muted-foreground mt-1">
    Fahrzeugschein und Fotos vom Fahrzeug (max. 10 MB pro Datei)
  </p>
</label>

{photos.length > 0 && (
  <ul className="mt-4 text-sm text-muted-foreground text-left">
    {photos.map((file, index) => (
      <li key={index}>{file.name}</li>
    ))}
  </ul>
)}

                <Button type="submit" size="lg" className="w-full">
                  Anfrage senden
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Ankauf;
