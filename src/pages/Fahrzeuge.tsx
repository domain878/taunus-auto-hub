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
import hondaHrvImage from "@/assets/honda-hrv.jpg";
import fiat500cImage from "@/assets/fiat-500c.jpg";
import vwTouranImage from "@/assets/vw-touran.jpg";
import mazda3Image from "@/assets/mazda-3.jpg";

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
    },
    {
      id: "6",
      images: [hondaHrvImage],
      brand: "Honda",
      model: "HR-V Executive",
      year: 2017,
      price: 15890,
      mileage: 91000,
      fuel: "Benzin",
      transmission: "Automatik",
      color: "Weiß",
      doors: 5,
      seats: 5,
      power: "96 kW (130 PS)",
      co2Emissions: "132 g/km",
      features: ["Einparksensoren", "Klimaautomatik", "Multifunktionslenkrad", "Bluetooth"],
      condition: "Gebraucht",
      firstRegistration: "09/2017",
    },
    {
      id: "7",
      images: [fiat500cImage],
      brand: "Fiat",
      model: "500 C Hey Google",
      year: 2021,
      price: 12900,
      mileage: 26500,
      fuel: "Benzin",
      transmission: "Schaltgetriebe",
      color: "Weiß",
      doors: 3,
      seats: 4,
      power: "51 kW (69 PS)",
      co2Emissions: "115 g/km",
      features: ["Panorama-Stoffdach", "Klimaanlage", "Radio", "Zentralverriegelung"],
      condition: "Sehr gut",
      firstRegistration: "03/2021",
    },
    {
      id: "8",
      images: [vwTouranImage],
      brand: "VW",
      model: "Touran Comfortline",
      year: 2015,
      price: 12390,
      mileage: 170000,
      fuel: "Diesel",
      transmission: "Automatik",
      color: "Schwarz",
      doors: 5,
      seats: 7,
      power: "81 kW (110 PS)",
      co2Emissions: "119 g/km",
      features: ["7-Sitzer", "Navigationssystem", "Klimaautomatik", "Tempomat"],
      condition: "Gebraucht",
      firstRegistration: "05/2015",
    },
    {
      id: "9",
      images: [mazda3Image],
      brand: "Mazda",
      model: "3 Sport",
      year: 2013,
      price: 7290,
      mileage: 107000,
      fuel: "Benzin",
      transmission: "Schaltgetriebe",
      color: "Schwarz Metallic",
      doors: 5,
      seats: 5,
      power: "77 kW (105 PS)",
      co2Emissions: "139 g/km",
      features: ["Klimaanlage", "Multifunktionslenkrad", "Navi", "Alufelgen"],
      condition: "Gebraucht",
      firstRegistration: "07/2013",
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
    });
    setVehicleImages([]);
    setShowAddForm(false);
    toast.success("Fahrzeug erfolgreich hinzugefügt!");
  };

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
      <section className="py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-foreground">
                {vehicles.length} Fahrzeuge gefunden
              </p>
              <p className="text-sm text-muted-foreground">
                Alle Fahrzeuge wurden technisch geprüft
              </p>
            </div>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              {showAddForm ? "Formular schließen" : "Fahrzeug hinzufügen"}
            </Button>
          </div>

          {/* Add Vehicle Form */}
          {showAddForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Neues Fahrzeug hinzufügen</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddVehicle} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="newBrand">Marke *</Label>
                      <Input
                        id="newBrand"
                        value={newVehicle.brand}
                        onChange={(e) => setNewVehicle({...newVehicle, brand: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="newModel">Modell *</Label>
                      <Input
                        id="newModel"
                        value={newVehicle.model}
                        onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="newYear">Baujahr *</Label>
                      <Input
                        id="newYear"
                        type="number"
                        value={newVehicle.year}
                        onChange={(e) => setNewVehicle({...newVehicle, year: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="newPrice">Preis (€) *</Label>
                      <Input
                        id="newPrice"
                        type="number"
                        value={newVehicle.price}
                        onChange={(e) => setNewVehicle({...newVehicle, price: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="newMileage">Kilometerstand *</Label>
                      <Input
                        id="newMileage"
                        type="number"
                        value={newVehicle.mileage}
                        onChange={(e) => setNewVehicle({...newVehicle, mileage: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="newFuel">Kraftstoff *</Label>
                      <Select value={newVehicle.fuel} onValueChange={(value) => setNewVehicle({...newVehicle, fuel: value})}>
                        <SelectTrigger id="newFuel">
                          <SelectValue placeholder="Kraftstoff wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Benzin">Benzin</SelectItem>
                          <SelectItem value="Diesel">Diesel</SelectItem>
                          <SelectItem value="Elektro">Elektro</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="newTransmission">Getriebe *</Label>
                      <Select value={newVehicle.transmission} onValueChange={(value) => setNewVehicle({...newVehicle, transmission: value})}>
                        <SelectTrigger id="newTransmission">
                          <SelectValue placeholder="Getriebe wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Schaltgetriebe">Schaltgetriebe</SelectItem>
                          <SelectItem value="Automatik">Automatik</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="newColor">Farbe *</Label>
                      <Input
                        id="newColor"
                        value={newVehicle.color}
                        onChange={(e) => setNewVehicle({...newVehicle, color: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="newDoors">Türen *</Label>
                      <Input
                        id="newDoors"
                        type="number"
                        value={newVehicle.doors}
                        onChange={(e) => setNewVehicle({...newVehicle, doors: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="newSeats">Sitze *</Label>
                      <Input
                        id="newSeats"
                        type="number"
                        value={newVehicle.seats}
                        onChange={(e) => setNewVehicle({...newVehicle, seats: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="newPower">Leistung *</Label>
                      <Input
                        id="newPower"
                        placeholder="z.B. 140 kW (190 PS)"
                        value={newVehicle.power}
                        onChange={(e) => setNewVehicle({...newVehicle, power: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="newCo2">CO2 Emissionen *</Label>
                      <Input
                        id="newCo2"
                        placeholder="z.B. 119 g/km"
                        value={newVehicle.co2Emissions}
                        onChange={(e) => setNewVehicle({...newVehicle, co2Emissions: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="newCondition">Zustand *</Label>
                      <Select value={newVehicle.condition} onValueChange={(value) => setNewVehicle({...newVehicle, condition: value})}>
                        <SelectTrigger id="newCondition">
                          <SelectValue placeholder="Zustand wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Neuwertig">Neuwertig</SelectItem>
                          <SelectItem value="Sehr gut">Sehr gut</SelectItem>
                          <SelectItem value="Gebraucht">Gebraucht</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="newFirstReg">Erstzulassung *</Label>
                      <Input
                        id="newFirstReg"
                        placeholder="z.B. 03/2017"
                        value={newVehicle.firstRegistration}
                        onChange={(e) => setNewVehicle({...newVehicle, firstRegistration: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="newFeatures">Ausstattung *</Label>
                    <Input
                      id="newFeatures"
                      placeholder="z.B. Navigationssystem, Ledersitze, Klimaautomatik, Xenon"
                      value={newVehicle.features}
                      onChange={(e) => setNewVehicle({...newVehicle, features: e.target.value})}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Mehrere Features durch Komma trennen
                    </p>
                  </div>

                  {/* Image Upload Area */}
                  <div>
                    <Label>Bilder hochladen (max. 15) *</Label>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        isDragging ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'
                      }`}
                    >
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Bilder hierher ziehen oder klicken zum Auswählen
                      </p>
                      <Input
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
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Bilder auswählen
                      </Button>
                    </div>

                    {/* Image Preview */}
                    {vehicleImages.length > 0 && (
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                        {vehicleImages.map((file, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit">Fahrzeug hinzufügen</Button>
                    <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                      Abbrechen
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

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
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Fahrzeuge;
