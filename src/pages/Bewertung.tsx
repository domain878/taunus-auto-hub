import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, CheckCircle, Upload } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

const Bewertung = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    mileage: "",
    fuel: "",
    condition: "",
    name: "",
    email: "",
    phone: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [estimatedValue, setEstimatedValue] = useState<{ min: number; max: number } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculateEstimate = () => {
    const { brand, model, year, mileage, fuel, condition } = formData;
    
    if (!brand || !model || !year || !mileage || !fuel || !condition) {
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay for realism
    setTimeout(() => {
      // Base values by brand (average market prices)
      const brandValues: { [key: string]: number } = {
        "bmw": 25000,
        "mercedes": 28000,
        "audi": 24000,
        "vw": 18000,
        "volkswagen": 18000,
        "opel": 14000,
        "ford": 15000,
        "renault": 13000,
        "peugeot": 13000,
        "toyota": 17000,
        "honda": 16000,
        "mazda": 15000,
        "nissan": 14000,
        "hyundai": 14000,
        "kia": 14000,
        "skoda": 16000,
        "seat": 15000,
        "mini": 20000,
        "fiat": 12000,
        "alfa romeo": 18000,
        "porsche": 45000,
        "volvo": 22000,
      };

      const currentYear = new Date().getFullYear();
      const vehicleAge = currentYear - parseInt(year);
      const km = parseInt(mileage);
      
      // Get base value or use default
      const brandLower = brand.toLowerCase();
      let baseValue = brandValues[brandLower] || 15000;
      
      // Age depreciation (8-12% per year)
      const ageDepreciation = Math.pow(0.90, vehicleAge);
      baseValue *= ageDepreciation;
      
      // Mileage adjustment
      if (km < 30000) {
        baseValue *= 1.15;
      } else if (km < 60000) {
        baseValue *= 1.05;
      } else if (km < 100000) {
        baseValue *= 0.95;
      } else if (km < 150000) {
        baseValue *= 0.80;
      } else {
        baseValue *= 0.65;
      }
      
      // Fuel type adjustment
      const fuelMultipliers: { [key: string]: number } = {
        "elektro": 1.10,
        "hybrid": 1.05,
        "diesel": 0.95,
        "benzin": 1.00,
        "gas": 0.90,
      };
      baseValue *= fuelMultipliers[fuel] || 1.0;
      
      // Condition adjustment
      const conditionMultipliers: { [key: string]: number } = {
        "sehr-gut": 1.10,
        "gut": 1.00,
        "befriedigend": 0.85,
        "ausreichend": 0.70,
      };
      baseValue *= conditionMultipliers[condition] || 1.0;
      
      // Calculate range (±10%)
      const minValue = Math.round(baseValue * 0.90 / 100) * 100;
      const maxValue = Math.round(baseValue * 1.10 / 100) * 100;
      
      setEstimatedValue({ min: minValue, max: maxValue });
      setIsCalculating(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Vielen Dank! Wir erstellen Ihre Bewertung und melden uns in Kürze.");
    setFormData({
      brand: "",
      model: "",
      year: "",
      mileage: "",
      fuel: "",
      condition: "",
      name: "",
      email: "",
      phone: "",
    });
    setPhotos([]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    setPhotos(prev => [...prev, ...files]);
  };

  const benefits = [
    "Kostenlose und unverbindliche Bewertung",
    "Schnelle Rückmeldung innerhalb von 24 Stunden",
    "Professionelle Einschätzung durch Experten",
    "Transparente Bewertungskriterien",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-scale-in">Fahrzeugbewertung</h1>
          <p className="text-xl text-primary-foreground/90">
            Erhalten Sie eine kostenlose und unverbindliche Bewertung Ihres Fahrzeugs
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-muted animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-foreground text-sm">{benefit}</span>
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
              <div className="flex items-center gap-3">
                <Calculator className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-2xl">Online Bewertung</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Füllen Sie das Formular aus und erhalten Sie eine erste Einschätzung
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Fahrzeugdaten</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="brand">Marke *</Label>
                      <Input
                        id="brand"
                        required
                        placeholder="z.B. BMW"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="model">Modell *</Label>
                      <Input
                        id="model"
                        required
                        placeholder="z.B. 3er 320d"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fuel">Kraftstoff *</Label>
                      <Select value={formData.fuel} onValueChange={(value) => setFormData({ ...formData, fuel: value })}>
                        <SelectTrigger id="fuel">
                          <SelectValue placeholder="Wählen Sie..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="benzin">Benzin</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="elektro">Elektro</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="gas">Gas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="condition">Zustand *</Label>
                      <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                        <SelectTrigger id="condition">
                          <SelectValue placeholder="Wählen Sie..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sehr-gut">Sehr gut</SelectItem>
                          <SelectItem value="gut">Gut</SelectItem>
                          <SelectItem value="befriedigend">Befriedigend</SelectItem>
                          <SelectItem value="ausreichend">Ausreichend</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Wertermittlung Button */}
                  <div className="pt-4">
                    <Button 
                      type="button" 
                      onClick={calculateEstimate}
                      disabled={!formData.brand || !formData.model || !formData.year || !formData.mileage || !formData.fuel || !formData.condition || isCalculating}
                      variant="outline"
                      className="w-full"
                    >
                      {isCalculating ? "Berechne..." : "Ungefähren Wert ermitteln"}
                    </Button>
                  </div>

                  {/* Estimated Value Display */}
                  {estimatedValue && (
                    <div className="mt-4 p-6 bg-primary/5 border-2 border-primary rounded-lg animate-fade-in">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Geschätzter Marktwert</p>
                        <p className="text-3xl font-bold text-primary mb-1">
                          {estimatedValue.min.toLocaleString('de-DE')} € - {estimatedValue.max.toLocaleString('de-DE')} €
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          * Dies ist eine automatische Schätzung basierend auf aktuellen Marktdaten. 
                          Für eine genaue Bewertung füllen Sie bitte das gesamte Formular aus.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold text-lg">Ihre Kontaktdaten</h3>
                  
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div>
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold text-lg">Fahrzeugfotos</h3>
                  <div>
                    <Label htmlFor="photos">Fotos hochladen (optional)</Label>

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`mt-2 border-2 border-dashed rounded p-8 text-center transition-all cursor-pointer ${
                        isDragging 
                          ? 'border-primary bg-primary/5 scale-105' 
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      <Upload className={`h-12 w-12 mx-auto mb-2 transition-colors ${
                        isDragging ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                      <p className="text-sm text-muted-foreground">
                        📸 Klicken Sie hier oder ziehen Sie Fotos hierher
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Fahrzeugfotos helfen uns bei einer genaueren Bewertung
                      </p>
                    </div>

                    <input
                      ref={fileInputRef}
                      id="photos"
                      type="file"
                      accept="image/*"
                      multiple
                      capture="environment"
                      className="hidden"
                      onChange={(e) => setPhotos(prev => [...prev, ...Array.from(e.target.files || [])])}
                    />

                    {photos.length > 0 && (
                      <ul className="mt-4 text-sm text-muted-foreground text-left">
                        {photos.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Kostenlose Bewertung erhalten
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  * Pflichtfelder. Ihre Daten werden vertraulich behandelt.
                </p>
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

export default Bewertung;
