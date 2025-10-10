import { useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, RotateCw } from "lucide-react";
import Car3DModel from "./Car3DModel";

interface DamagePoint {
  id: string;
  area: string;
  type: "kratzer" | "delle" | "rost" | "lackschaden";
}

interface Interactive3DCarProps {
  onDamageChange: (damagePoints: DamagePoint[]) => void;
}

const Interactive3DCar = ({ onDamageChange }: Interactive3DCarProps) => {
  const [damagePoints, setDamagePoints] = useState<DamagePoint[]>([]);
  const [selectedType, setSelectedType] = useState<DamagePoint["type"]>("kratzer");
  const [selectedArea, setSelectedArea] = useState("");

  const carAreas = [
    "Motorhaube",
    "Dach",
    "Kofferraum",
    "Vordere Stoßstange",
    "Hintere Stoßstange",
    "Linke Vordertür",
    "Rechte Vordertür",
    "Linke Hintertür",
    "Rechte Hintertür",
    "Windschutzscheibe",
    "Heckscheibe",
    "Linker Kotflügel vorne",
    "Rechter Kotflügel vorne",
    "Linker Kotflügel hinten",
    "Rechter Kotflügel hinten",
  ];

  const addDamage = () => {
    if (!selectedArea) return;

    const newPoint: DamagePoint = {
      id: `damage-${Date.now()}`,
      area: selectedArea,
      type: selectedType,
    };

    const updatedPoints = [...damagePoints, newPoint];
    setDamagePoints(updatedPoints);
    onDamageChange(updatedPoints);
    setSelectedArea("");
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
      {/* 3D Car View */}
      <div className="relative w-full h-[400px] bg-gradient-to-b from-sky-100 to-white rounded-lg border-2 border-border overflow-hidden">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[4, 2, 4]} />
          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.2}
          />
          
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <spotLight position={[-10, 10, -5]} intensity={0.3} />
          
          <Suspense fallback={null}>
            <Car3DModel />
          </Suspense>
          
          {/* Ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <shadowMaterial opacity={0.3} />
          </mesh>
        </Canvas>
        
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-md text-sm flex items-center gap-2">
          <RotateCw className="h-4 w-4" />
          Ziehen zum Drehen
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

      {/* Area Selection */}
      <div>
        <Label htmlFor="carArea">Bereich auswählen</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {carAreas.map((area) => (
            <Button
              key={area}
              type="button"
              variant={selectedArea === area ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedArea(area)}
              className="text-xs"
            >
              {area}
            </Button>
          ))}
        </div>
      </div>

      <Button
        type="button"
        onClick={addDamage}
        disabled={!selectedArea}
        className="w-full"
        size="sm"
      >
        Schaden hinzufügen
      </Button>

      {/* Damage List */}
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
                className="flex items-center justify-between bg-muted p-2 rounded-md text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${damageTypeColors[point.type]} flex-shrink-0`} />
                  <span className="font-medium">{damageTypeLabels[point.type]}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{point.area}</span>
                </div>
                <X
                  className="h-4 w-4 cursor-pointer hover:text-destructive flex-shrink-0"
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

export default Interactive3DCar;
