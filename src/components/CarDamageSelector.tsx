import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import carDiagram from "@/assets/car-damage-diagram.png";

interface DamagePoint {
  id: string;
  x: number;
  y: number;
  type: "kratzer" | "delle" | "rost" | "lackschaden";
}

interface CarDamageSelectorProps {
  onDamageChange: (damagePoints: DamagePoint[]) => void;
}

const CarDamageSelector = ({ onDamageChange }: CarDamageSelectorProps) => {
  const [damagePoints, setDamagePoints] = useState<DamagePoint[]>([]);
  const [selectedType, setSelectedType] = useState<DamagePoint["type"]>("kratzer");
  const imageRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newPoint: DamagePoint = {
      id: `damage-${Date.now()}`,
      x,
      y,
      type: selectedType,
    };

    const updatedPoints = [...damagePoints, newPoint];
    setDamagePoints(updatedPoints);
    onDamageChange(updatedPoints);
  };

  const removePoint = (id: string) => {
    const updatedPoints = damagePoints.filter((p) => p.id !== id);
    setDamagePoints(updatedPoints);
    onDamageChange(updatedPoints);
  };

  const clearAll = () => {
    setDamagePoints([]);
    onDamageChange([]);
  };

  const damageTypeColors = {
    kratzer: "bg-yellow-500",
    delle: "bg-orange-500",
    rost: "bg-red-600",
    lackschaden: "bg-blue-500",
  };

  const damageTypeLabels = {
    kratzer: "Kratzer",
    delle: "Delle",
    rost: "Rost",
    lackschaden: "Lackschaden",
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Schadensart auswählen und auf Bild klicken</Label>
        <div className="flex gap-2 mt-2 flex-wrap">
          {(Object.keys(damageTypeLabels) as Array<DamagePoint["type"]>).map((type) => (
            <Button
              key={type}
              type="button"
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type)}
              className="gap-2"
            >
              <span className={`w-3 h-3 rounded-full ${damageTypeColors[type]}`} />
              {damageTypeLabels[type]}
            </Button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div
          ref={imageRef}
          onClick={handleImageClick}
          className="relative cursor-crosshair border-2 border-dashed border-border rounded-lg overflow-hidden bg-muted"
        >
          <img
            src={carDiagram}
            alt="Auto Schadensdiagramm"
            className="w-full h-auto select-none"
            draggable={false}
          />
          {damagePoints.map((point) => (
            <div
              key={point.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              <div
                className={`w-4 h-4 rounded-full ${damageTypeColors[point.type]} border-2 border-white shadow-lg animate-pulse cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation();
                  removePoint(point.id);
                }}
              />
              <div className="absolute hidden group-hover:block -top-8 left-1/2 -translate-x-1/2 bg-background border border-border px-2 py-1 rounded text-xs whitespace-nowrap shadow-md">
                {damageTypeLabels[point.type]}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Klicken Sie auf das Bild, um Schäden zu markieren. Klicken Sie auf einen Punkt, um ihn zu entfernen.
        </p>
      </div>

      {damagePoints.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Markierte Schäden ({damagePoints.length})</Label>
            <Button type="button" variant="ghost" size="sm" onClick={clearAll}>
              Alle entfernen
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {damagePoints.map((point) => (
              <Badge key={point.id} variant="secondary" className="gap-1">
                <span className={`w-2 h-2 rounded-full ${damageTypeColors[point.type]}`} />
                {damageTypeLabels[point.type]}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => removePoint(point.id)}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDamageSelector;
