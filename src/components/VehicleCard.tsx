import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Gauge, Fuel, Settings, Palette, DoorOpen, Users, Zap, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface VehicleCardProps {
  id: string;
  images: string[];
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  color: string;
  doors: number;
  seats: number;
  power: string;
  co2Emissions: string;
  features: string[];
  condition: string;
  firstRegistration: string;
  previousOwners: number;
}
const VehicleCard = ({
  images,
  brand,
  model,
  year,
  price,
  mileage,
  fuel,
  transmission,
  color,
  doors,
  seats,
  power,
  co2Emissions,
  features,
  condition,
  firstRegistration,
  previousOwners
}: VehicleCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] animate-fade-in">
      <div className="aspect-video overflow-hidden relative group">
        <img 
          src={images[currentImageIndex]} 
          alt={`${brand} ${model}`}
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentImageIndex ? 'w-6 bg-primary' : 'w-1.5 bg-background/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-bold text-lg text-foreground">
            {brand} {model}
          </h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              {year}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {condition}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {previousOwners} Vorbesitzer
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Gauge className="h-4 w-4" />
            <span>{mileage.toLocaleString("de-DE")} km</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-4 w-4" />
            <span>{fuel}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>EZ {firstRegistration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span>{transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <Palette className="h-4 w-4" />
            <span>{color}</span>
          </div>
          <div className="flex items-center gap-1">
            <DoorOpen className="h-4 w-4" />
            <span>{doors} Türen</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{seats} Sitze</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            <span>{power}</span>
          </div>
          <div className="flex items-center gap-1">
            <Leaf className="h-4 w-4" />
            <span>{co2Emissions}</span>
          </div>
        </div>

        {features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {features.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{features.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-primary">
            {price.toLocaleString("de-DE")} €
          </p>
        </div>
        <Button variant="outline" className="hover:scale-105 transition-transform duration-200">Details</Button>
      </CardFooter>
    </Card>;
};
export default VehicleCard;