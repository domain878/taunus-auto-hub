import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Gauge, Fuel, Settings, Palette, DoorOpen, Users, Zap, Leaf, Award, UserCheck } from "lucide-react";

interface VehicleCardProps {
  id: string;
  image: string;
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
  image,
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
  return <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={`${brand} ${model}`}
          className="w-full h-full object-cover"
        />
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
        <Button variant="outline">Details</Button>
      </CardFooter>
    </Card>;
};
export default VehicleCard;