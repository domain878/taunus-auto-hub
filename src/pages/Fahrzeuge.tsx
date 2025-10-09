import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import VehicleCard from "@/components/VehicleCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Plus, X } from "lucide-react";
import { toast } from "sonner";
import audiA4Image from "@/assets/audi-a4.jpg";
import miniCooperImage from "@/assets/mini-cooper.jpg";
import audiA8Image from "@/assets/audi-a8.jpg";
import fordFocusImage from "@/assets/ford-focus.jpg";
import opelInsigniaImage from "@/assets/opel-insignia.jpg";

const Fahrzeuge = () => {
  const [priceRange, setPriceRange] = useState("all");
  const [fuelType, setFuelType] = useState("all");
  const [brand, setBrand] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [vehicleImages, setVehicleImages] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [newVehicle, setNewVehicle] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    fuel: "",
    transmission: "",
    color: "",
    doors: "",
    seats: "",
    power: "",
    co2Emissions: "",
    features: "",
    condition: "",
    firstRegistration: "",
    previousOwners: "",
  });

  // Vehicle data with your images
  const [vehicles, setVehicles] = useState([
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
      previousOwners: 2,
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
      previousOwners: 3,
    },
    {
      id: "4",
      images: [fordFocusImage],
      brand: "Ford",
      model: "Focus Titanium",
      year: 2011,
      price: 8890,
      mileage: 117000,
      fuel: "Diesel",
      transmission: "Schaltgetriebe",
      color: "Blau",
      doors: 5,
      seats: 5,
      power: "85 kW (115 PS)",
      co2Emissions: "109 g/km",
      features: ["Klimaanlage", "Einparkhilfe", "Tempomat"],
      condition: "Gebraucht",
      firstRegistration: "08/2011",
      previousOwners: 2,
    },
    {
      id: "5",
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
      previousOwners: 1,
      },
       {
      id: "6",
      images: [bmwImage],
      brand: "BMW",
      model: "320d Touring",
      year: 2021,
      price: 32900,
      mileage: 48500,
      fuel: "Diesel",
      transmission: "Automatik",
      color: "Blau",
      doors: 5,
      seats: 5,
      power: "190 kW (258 PS)",
      co2Emissions: "129 g/km",
      features: ["M Sportpaket", "Navigationssystem Professional", "LED-Scheinwerfer", "Sportsitze"],
      condition: "Gebraucht",
      firstRegistration: "03/2021",
      previousOwners: 1,
    },
  ]);

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
    if (vehicleImages.length + files.length <= 15) {
      setVehicleImages(prev => [...prev, ...files]);
    } else {
      toast.error("Maximal 15 Bilder erlaubt");
    }
  };

  const removeImage = (index: number) => {
    setVehicleImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (vehicleImages.length === 0) {
      toast.error("Bitte laden Sie mindestens ein Bild hoch");
      return;
    }

    const imageUrls = vehicleImages.map(file => URL.createObjectURL(file));
    
    const vehicle = {
      id: Date.now().toString(),
      images: imageUrls,
      brand: newVehicle.brand,
      model: newVehicle.model,
      year: parseInt(newVehicle.year),
      price: parseInt(newVehicle.price),
      mileage: parseInt(newVehicle.mileage),
      fuel: newVehicle.fuel,
      transmission: newVehicle.transmission,
      color: newVehicle.color,
      doors: parseInt(newVehicle.doors),
      seats: parseInt(newVehicle.seats),
      power: newVehicle.power,
      co2Emissions: newVehicle.co2Emissions,
      features: newVehicle.features.split(',').map(f => f.trim()),
      condition: newVehicle.condition,
      firstRegistration: newVehicle.firstRegistration,
      previousOwners: parseInt(newVehicle.previousOwners),
    };

    setVehicles(prev => [vehicle, ...prev]);
    
    setNewVehicle({
      brand: "",
      model: "",
      year: "",
      price: "",
      mileage: "",
      fuel: "",
      transmission: "",
      color: "",
      doors: "",
      seats: "",
      power: "",
      co2Emissions: "",
      features: "",
      condition: "",
      firstRegistration: "",
      previousOwners: "",
    });
    setVehicleImages([]);
    setShowAddForm(false);
    toast.success("Fahrzeug erfolgreich hinzugefügt!");
  };

return (
  <div className="min-h-screen flex flex-col">
    <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-scale-in">Unsere Fahrzeuge</h1>
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
         );     
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

      {/* Add Vehicle Form */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Fahrzeug hinzufügen</h2>
            <Button onClick={() => setShowAddForm(!showAddForm)} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              {showAddForm ? 'Formular schließen' : 'Neues Fahrzeug'}
            </Button>
          </div>

          {showAddForm && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Neues Fahrzeug erstellen</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddVehicle} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="new-brand">Marke *</Label>
                      <Input
                        id="new-brand"
                        required
                        value={newVehicle.brand}
                        onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-model">Modell *</Label>
                      <Input
                        id="new-model"
                        required
                        value={newVehicle.model}
                        onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="new-year">Baujahr *</Label>
                      <Input
                        id="new-year"
                        type="number"
                        required
                        value={newVehicle.year}
                        onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-price">Preis (€) *</Label>
                      <Input
                        id="new-price"
                        type="number"
                        required
                        value={newVehicle.price}
                        onChange={(e) => setNewVehicle({ ...newVehicle, price: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="new-mileage">Kilometerstand *</Label>
                      <Input
                        id="new-mileage"
                        type="number"
                        required
                        value={newVehicle.mileage}
                        onChange={(e) => setNewVehicle({ ...newVehicle, mileage: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-fuel">Kraftstoff *</Label>
                      <Input
                        id="new-fuel"
                        required
                        value={newVehicle.fuel}
                        onChange={(e) => setNewVehicle({ ...newVehicle, fuel: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="new-transmission">Getriebe *</Label>
                      <Input
                        id="new-transmission"
                        required
                        value={newVehicle.transmission}
                        onChange={(e) => setNewVehicle({ ...newVehicle, transmission: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-color">Farbe *</Label>
                      <Input
                        id="new-color"
                        required
                        value={newVehicle.color}
                        onChange={(e) => setNewVehicle({ ...newVehicle, color: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="new-doors">Türen *</Label>
                      <Input
                        id="new-doors"
                        type="number"
                        required
                        value={newVehicle.doors}
                        onChange={(e) => setNewVehicle({ ...newVehicle, doors: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-seats">Sitze *</Label>
                      <Input
                        id="new-seats"
                        type="number"
                        required
                        value={newVehicle.seats}
                        onChange={(e) => setNewVehicle({ ...newVehicle, seats: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="new-power">Leistung *</Label>
                      <Input
                        id="new-power"
                        required
                        placeholder="z.B. 150 PS"
                        value={newVehicle.power}
                        onChange={(e) => setNewVehicle({ ...newVehicle, power: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-co2">CO2-Emissionen *</Label>
                      <Input
                        id="new-co2"
                        required
                        placeholder="z.B. 120 g/km"
                        value={newVehicle.co2Emissions}
                        onChange={(e) => setNewVehicle({ ...newVehicle, co2Emissions: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="new-condition">Zustand *</Label>
                      <Input
                        id="new-condition"
                        required
                        placeholder="z.B. Neuwertig, Gebraucht"
                        value={newVehicle.condition}
                        onChange={(e) => setNewVehicle({ ...newVehicle, condition: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-firstRegistration">Erstzulassung *</Label>
                      <Input
                        id="new-firstRegistration"
                        required
                        placeholder="z.B. 05/2020"
                        value={newVehicle.firstRegistration}
                        onChange={(e) => setNewVehicle({ ...newVehicle, firstRegistration: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="new-previousOwners">Vorbesitzer *</Label>
                    <Input
                      id="new-previousOwners"
                      type="number"
                      required
                      value={newVehicle.previousOwners}
                      onChange={(e) => setNewVehicle({ ...newVehicle, previousOwners: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="new-features">Ausstattung (mit Komma getrennt) *</Label>
                    <Textarea
                      id="new-features"
                      required
                      placeholder="z.B. Navigationssystem, Ledersitze, Klimaautomatik"
                      value={newVehicle.features}
                      onChange={(e) => setNewVehicle({ ...newVehicle, features: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Fahrzeugbilder (max. 15) *</Label>
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
                        📸 Klicken Sie hier oder ziehen Sie bis zu 15 Bilder hierher
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {vehicleImages.length}/15 Bilder hochgeladen
                      </p>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (vehicleImages.length + files.length <= 15) {
                          setVehicleImages(prev => [...prev, ...files]);
                        } else {
                          toast.error("Maximal 15 Bilder erlaubt");
                        }
                      }}
                    />

                    {vehicleImages.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-2">
                        {vehicleImages.map((file, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Vorschau ${index + 1}`}
                              className="w-full h-24 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Fahrzeug hinzufügen
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
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
            {vehicles.map((vehicle, index) => (
              <div key={vehicle.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
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
