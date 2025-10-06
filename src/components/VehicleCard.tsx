import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Gauge, Fuel, Settings } from "lucide-react";
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
}
const VehicleCard = ({
  image,
  brand,
  model,
  year,
  price,
  mileage,
  fuel,
  transmission
}: VehicleCardProps) => {
  return <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-video overflow-hidden">
        
      </div>
      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-bold text-lg text-foreground">
            {brand} {model}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="text-xs">
              {year}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
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
            <span>EZ {year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span>{transmission}</span>
          </div>
        </div>
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