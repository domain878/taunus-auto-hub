import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import RealisticCarDamageSelector from "@/components/RealisticCarDamageSelector";
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
    power: "",
    damage: "",
    serviceBook: "",
    previousOwners: "",
    name: "",
    email: "",
    phone: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [damagePoints, setDamagePoints] = useState<any[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [estimatedValue, setEstimatedValue] = useState<{ min: number; max: number } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculateEstimate = () => {
    const { brand, model, year, mileage, fuel, condition, power, damage, serviceBook, previousOwners } = formData;

    if (!brand || !model || !year || !mileage || !fuel || !condition) {
      return;
    }

    setIsCalculating(true);

    setTimeout(() => {
      // Verkaufspreise (angepasst für realistischen Ankaufspreis)
      const brandValues: { [key: string]: number } = {
        bmw: 28000,
        "mercedes": 30000,
        "mercedes-benz": 30000,
        audi: 26000,
        vw: 19000,
        volkswagen: 19000,
        opel: 14000,
        ford: 16000,
        renault: 14000,
        peugeot: 14000,
        toyota: 21000,
        honda: 18000,
        mazda: 17000,
        nissan: 16000,
        hyundai: 16000,
        kia: 16000,
        skoda: 18000,
        seat: 16000,
        mini: 22000,
        fiat: 12000,
        "alfa romeo": 18000,
        porsche: 55000,
        volvo: 24000,
        tesla: 38000,
        citroen: 14000,
        dacia: 11000,
        suzuki: 14000,
        subaru: 19000,
        lexus: 32000,
        jaguar: 28000,
        "land rover": 38000,
        jeep: 26000,
        chevrolet: 17000,
      };

      const currentYear = new Date().getFullYear();
      const rawYear = parseInt(year);
      const safeYear = isNaN(rawYear) ? currentYear : Math.min(Math.max(rawYear, 1998), currentYear);
      const vehicleAge = currentYear - safeYear;
      const km = Math.max(0, parseInt(mileage));

      const brandLower = brand.toLowerCase().trim();
      const modelLower = model.toLowerCase().trim();

      // Basiswert (Default höher, um zu niedrige Schätzungen zu vermeiden)
      let baseValue = brandValues[brandLower] || 17000;

      // Performance-/Ausstattungsfaktoren
      let performanceFactor = 1;
      if (/(amg|\bm[0-9]{1,3}\b|\brs\b|gti\b|gts\b|gtr\b|quadrifoglio|type\s*r|cupra|abarth|srt)/.test(modelLower)) {
        performanceFactor *= 1.2;
      }
      if (/(quattro|xdrive|4matic|awd|allrad)/.test(modelLower)) {
        performanceFactor *= 1.05;
      }
      if (/(touran|sharan|kodiaq|karoq|tiguan|x[1-7]\b|q[2-8]\b|gl[abces]|suv)/.test(modelLower)) {
        performanceFactor *= 1.05;
      }

      // Altersfaktor (tabellarisch für realistischere Verläufe)
      const ageTable = [
        0.98, 0.94, 0.90, 0.86, 0.82, 0.78, 0.74, 0.70, 0.66, 0.62, 0.58, 0.55, 0.52,
      ];
      const ageFactor = vehicleAge < ageTable.length ? ageTable[vehicleAge] : 0.48;

      // Kilometerfaktor
      let kmFactor = 1;
      if (km < 15000) kmFactor = 1.25;
      else if (km < 30000) kmFactor = 1.18;
      else if (km < 60000) kmFactor = 1.1;
      else if (km < 90000) kmFactor = 1.05;
      else if (km < 120000) kmFactor = 1.0;
      else if (km < 160000) kmFactor = 0.92;
      else if (km < 200000) kmFactor = 0.85;
      else kmFactor = 0.78;

      // Kraftstofffaktor (altersabhängig)
      let fuelFactor = 1.0;
      switch (fuel) {
        case "elektro":
          fuelFactor = vehicleAge <= 4 ? 1.18 : 1.05;
          break;
        case "hybrid":
          fuelFactor = vehicleAge <= 8 ? 1.08 : 1.0;
          break;
        case "diesel":
          fuelFactor = 0.92;
          break;
        case "benzin":
          fuelFactor = 1.0;
          break;
        case "gas":
          fuelFactor = 0.85;
          break;
      }

      // Zustandsfaktor
      const conditionMultipliers: { [key: string]: number } = {
        "sehr-gut": 1.15,
        gut: 1.0,
        befriedigend: 0.82,
        ausreichend: 0.65,
      };
      const conditionFactor = conditionMultipliers[condition] || 1.0;

      // Leistungsfaktor (höhere PS = höherer Wert)
      let powerFactor = 1.0;
      if (power) {
        const ps = parseInt(power);
        if (!isNaN(ps)) {
          if (ps < 80) powerFactor = 0.92;
          else if (ps < 120) powerFactor = 0.98;
          else if (ps < 180) powerFactor = 1.05;
          else if (ps < 250) powerFactor = 1.12;
          else powerFactor = 1.20;
        }
      }

      // Beschädigungsfaktor (basierend auf Anzahl und Art der Schäden)
      let damageFactor = 1.0;
      if (damagePoints.length === 0) {
        damageFactor = 1.0; // Keine Schäden
      } else {
        const damageCount = damagePoints.length;
        const hasSevere = damagePoints.some((p: any) => p.type === "rost" || p.type === "delle");
        
        if (damageCount === 1 && !hasSevere) {
          damageFactor = 0.95; // Ein kleiner Schaden
        } else if (damageCount <= 2 && !hasSevere) {
          damageFactor = 0.90; // Wenige leichte Schäden
        } else if (damageCount <= 4 || (damageCount <= 2 && hasSevere)) {
          damageFactor = 0.82; // Mehrere Schäden oder schwere Schäden
        } else {
          damageFactor = 0.70; // Viele Schäden
        }
      }
      
      // Falls das alte Dropdown-Feld noch genutzt wird
      if (damage && damage !== "keine" && damagePoints.length === 0) {
        if (damage === "leicht") damageFactor = 0.88;
        else if (damage === "mittel") damageFactor = 0.72;
        else if (damage === "schwer") damageFactor = 0.55;
      }

      // Scheckheftfaktor
      let serviceBookFactor = 1.0;
      if (serviceBook === "ja-vollstaendig") serviceBookFactor = 1.08;
      else if (serviceBook === "ja-teilweise") serviceBookFactor = 1.02;
      else if (serviceBook === "nein") serviceBookFactor = 0.94;

      // Vorbesitzerfaktor
      let ownersFactor = 1.0;
      if (previousOwners) {
        const owners = parseInt(previousOwners);
        if (!isNaN(owners)) {
          if (owners === 1) ownersFactor = 1.05;
          else if (owners === 2) ownersFactor = 1.0;
          else if (owners === 3) ownersFactor = 0.96;
          else if (owners >= 4) ownersFactor = 0.90;
        }
      }

      // Marktanpassung (Angepasst für realistischen Verkaufspreis)
      const marketFactor = 0.95;

      // Wert berechnen
      let value = baseValue * ageFactor * kmFactor * fuelFactor * performanceFactor * marketFactor * conditionFactor * powerFactor * damageFactor * serviceBookFactor * ownersFactor;

      // Mindestwerte zur Vermeidung unrealistisch niedriger Ergebnisse
      const premium = new Set([
        "audi",
        "bmw",
        "mercedes",
        "mercedes-benz",
        "porsche",
        "volvo",
        "lexus",
        "jaguar",
        "land rover",
        "mini",
      ]);
      let floor = 2500;
      if (premium.has(brandLower)) floor = 4000;
      if (brandLower === "porsche") floor = 15000;
      value = Math.max(value, floor);

      // Spannweite berechnen (leicht dynamisch nach Zustand/Alter)
      const minValue = Math.round((value * 0.92) / 100) * 100;
      const maxMultiplier = vehicleAge <= 2 && km < 40000 ? 1.16 : 1.10;
      const maxValue = Math.round((value * maxMultiplier) / 100) * 100;

      setEstimatedValue({ min: minValue, max: maxValue });
      setIsCalculating(false);
    }, 1200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Convert photos to base64
      const photoPromises = photos.map(async (file) => {
        return new Promise<{ name: string; data: string }>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              name: file.name,
              data: reader.result as string
            });
          };
          reader.readAsDataURL(file);
        });
      });
      
      const photoData = await Promise.all(photoPromises);
      
      // Prepare email data
      const emailData = {
        vehicleData: {
          marke: formData.brand,
          modell: formData.model,
          erstzulassung: formData.year,
          kilometerstand: formData.mileage,
          kraftstoff: formData.fuel,
          getriebe: "Nicht angegeben", // Add if you have a transmission field
          leistung: formData.power || "Nicht angegeben",
          farbe: "Nicht angegeben", // Add if you have a color field
          vorbesitzer: formData.previousOwners || "Nicht angegeben",
          tuv: "Nicht angegeben", // Add if you have a TÜV field
          zustand: formData.condition,
        },
        contactData: {
          vorname: formData.name.split(' ')[0] || formData.name,
          nachname: formData.name.split(' ').slice(1).join(' ') || "",
          email: formData.email,
          telefon: formData.phone,
          nachricht: "",
        },
        photos: photoData,
        damagePoints: damagePoints,
        estimatedValue: estimatedValue,
      };
      
      // Send to edge function
      const { supabase } = await import("@/integrations/supabase/client");
      const { data, error } = await supabase.functions.invoke('send-valuation-email', {
        body: emailData
      });
      
      if (error) {
        console.error("Error sending email:", error);
        toast.error("Fehler beim Senden der Anfrage. Bitte versuchen Sie es später erneut.");
        return;
      }
      
      toast.success("Vielen Dank! Ihre Bewertungsanfrage wurde versendet.");
      
      // Reset form
      setFormData({
        brand: "",
        model: "",
        year: "",
        mileage: "",
        fuel: "",
        condition: "",
        power: "",
        damage: "",
        serviceBook: "",
        previousOwners: "",
        name: "",
        email: "",
        phone: "",
      });
      setPhotos([]);
      setDamagePoints([]);
      setEstimatedValue(null);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    }
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="power">Leistung (PS)</Label>
                      <Input
                        id="power"
                        type="number"
                        placeholder="z.B. 150"
                        value={formData.power}
                        onChange={(e) => setFormData({ ...formData, power: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="previousOwners">Vorbesitzer</Label>
                      <Input
                        id="previousOwners"
                        type="number"
                        placeholder="z.B. 2"
                        value={formData.previousOwners}
                        onChange={(e) => setFormData({ ...formData, previousOwners: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Schäden markieren (optional)</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Wählen Sie die Ansicht und markieren Sie Schäden direkt auf dem Fahrzeug
                    </p>
                    <RealisticCarDamageSelector onDamageChange={setDamagePoints} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="serviceBook">Scheckheft</Label>
                      <Select value={formData.serviceBook} onValueChange={(value) => setFormData({ ...formData, serviceBook: value })}>
                        <SelectTrigger id="serviceBook">
                          <SelectValue placeholder="Wählen Sie..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ja-vollstaendig">Ja, vollständig</SelectItem>
                          <SelectItem value="ja-teilweise">Ja, teilweise</SelectItem>
                          <SelectItem value="nein">Nein</SelectItem>
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
