import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import carSideView from "@/assets/car-side-view.jpg";
import carFrontView from "@/assets/car-front-view.jpg";
import carRearView from "@/assets/car-rear-view.jpg";
import carTopView from "@/assets/car-top-view.jpg";

interface DamagePoint {
  id: string;
  x: number;
  y: number;
  view: string;
  type: "kratzer" | "delle" | "rost" | "lackschaden";
}

interface RealisticCarDamageSelectorProps {
  onDamageChange: (damagePoints: DamagePoint[]) => void;
}

const RealisticCarDamageSelector = ({ onDamageChange }: RealisticCarDamageSelectorProps) => {
  const [damagePoints, setDamagePoints] = useState<DamagePoint[]>([]);
  const [selectedType, setSelectedType] = useState<DamagePoint["type"]>("kratzer");
  const [currentView, setCurrentView] = useState<"side" | "front" | "rear" | "top">("side");
  const imageRef = useRef<HTMLDivElement>(null);

  const views = {
    side: { img: carSideView, label: "Seitenansicht" },
    front: { img: carFrontView, label: "Frontansicht" },
    rear: { img: carRearView, label: "Heckansicht" },
    top: { img: carTopView, label: "Draufsicht" },
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newPoint: DamagePoint = {
      id: `damage-${Date.now()}`,
      x,
      y,
      view: currentView,
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
      {/* View Selection */}
      <div>
        <Label>Ansicht wählen</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
          {(Object.keys(views) as Array<keyof typeof views>).map((view) => (
            <Button
              key={view}
              type="button"
              variant={currentView === view ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentView(view)}
            >
              {views[view].label}
            </Button>
          ))}
        </div>
      </div>

      {/* Damage Type Selection */}
      <div>
        <Label>Schadensart auswählen</Label>
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

      {/* Car Image with Damage Points */}
      <div className="relative">
        <div
          ref={imageRef}
          onClick={handleImageClick}
          className="relative cursor-crosshair border-2 border-border rounded-lg overflow-hidden bg-white"
        >
          <img
            src={views[currentView].img}
            alt={views[currentView].label}
            className="w-full h-auto select-none"
            draggable={false}
          />
          {damagePoints
            .filter((point) => point.view === currentView)
            .map((point) => (
              <div
                key={point.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
              >
                <div
                  className={`w-5 h-5 rounded-full ${damageTypeColors[point.type]} border-2 border-white shadow-lg animate-pulse cursor-pointer hover:scale-125 transition-transform`}
                  onClick={(e) => {
                    e.stopPropagation();
                    removePoint(point.id);
                  }}
                />
                <div className="absolute hidden group-hover:block -top-10 left-1/2 -translate-x-1/2 bg-background border border-border px-3 py-1 rounded text-xs whitespace-nowrap shadow-lg z-10">
                  {damageTypeLabels[point.type]}
                </div>
              </div>
            ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Klicken Sie auf das Fahrzeug, um Schäden zu markieren. Klicken Sie auf einen Punkt, um ihn zu entfernen.
        </p>
      </div>

      {/* Damage Summary */}
      {damagePoints.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Markierte Schäden ({damagePoints.length})</Label>
            <Button type="button" variant="ghost" size="sm" onClick={clearAll}>
              Alle entfernen
            </Button>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {damagePoints.map((point) => (
              <div
                key={point.id}
                className="flex items-center justify-between bg-muted p-2 rounded-md text-sm hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${damageTypeColors[point.type]} flex-shrink-0`} />
                  <span className="font-medium">{damageTypeLabels[point.type]}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground text-xs">{views[point.view as keyof typeof views].label}</span>
                </div>
                <X
                  className="h-4 w-4 cursor-pointer hover:text-destructive flex-shrink-0 transition-colors"
                  onClick={() => removePoint(point.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RealisticCarDamageSelector;
