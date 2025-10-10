import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

const Car3DModel = () => {
  const carRef = useRef<Group>(null);

  useFrame(() => {
    if (carRef.current) {
      carRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={carRef} scale={1.2}>
      {/* Unterboden / Chassis */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[4.2, 0.15, 1.8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Hauptkarosserie - Unterer Teil */}
      <mesh position={[0, 0.65, 0]} castShadow>
        <boxGeometry args={[4, 0.8, 1.75]} />
        <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Motorhaube */}
      <mesh position={[1.5, 0.72, 0]} castShadow>
        <boxGeometry args={[1.2, 0.08, 1.7]} />
        <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.15} />
      </mesh>

      {/* Dach/Kabine */}
      <mesh position={[-0.2, 1.2, 0]} castShadow>
        <boxGeometry args={[2.2, 0.7, 1.65]} />
        <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Kofferraum */}
      <mesh position={[-1.6, 0.72, 0]} castShadow>
        <boxGeometry args={[0.8, 0.08, 1.7]} />
        <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.15} />
      </mesh>

      {/* Windschutzscheibe */}
      <mesh position={[0.7, 1.25, 0]} rotation={[0, 0, -0.15]} castShadow>
        <boxGeometry args={[0.9, 0.75, 1.6]} />
        <meshStandardMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.3} 
          metalness={0.9} 
          roughness={0.05}
          envMapIntensity={1}
        />
      </mesh>

      {/* Heckscheibe */}
      <mesh position={[-1.1, 1.25, 0]} rotation={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[0.7, 0.65, 1.6]} />
        <meshStandardMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.3} 
          metalness={0.9} 
          roughness={0.05}
        />
      </mesh>

      {/* Seitenfenster Links Vorne */}
      <mesh position={[0.4, 1.15, 0.88]} castShadow>
        <boxGeometry args={[0.9, 0.5, 0.02]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.25} metalness={0.9} roughness={0.05} />
      </mesh>

      {/* Seitenfenster Rechts Vorne */}
      <mesh position={[0.4, 1.15, -0.88]} castShadow>
        <boxGeometry args={[0.9, 0.5, 0.02]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.25} metalness={0.9} roughness={0.05} />
      </mesh>

      {/* Seitenfenster Links Hinten */}
      <mesh position={[-0.6, 1.15, 0.88]} castShadow>
        <boxGeometry args={[0.8, 0.5, 0.02]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.25} metalness={0.9} roughness={0.05} />
      </mesh>

      {/* Seitenfenster Rechts Hinten */}
      <mesh position={[-0.6, 1.15, -0.88]} castShadow>
        <boxGeometry args={[0.8, 0.5, 0.02]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.25} metalness={0.9} roughness={0.05} />
      </mesh>

      {/* Räder - Vorne Links */}
      <group position={[1.3, 0.3, 1]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.38, 0.38, 0.25, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.27, 32]} />
          <meshStandardMaterial color="#4a5568" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Räder - Vorne Rechts */}
      <group position={[1.3, 0.3, -1]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.38, 0.38, 0.25, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.27, 32]} />
          <meshStandardMaterial color="#4a5568" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Räder - Hinten Links */}
      <group position={[-1.3, 0.3, 1]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.38, 0.38, 0.25, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.27, 32]} />
          <meshStandardMaterial color="#4a5568" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Räder - Hinten Rechts */}
      <group position={[-1.3, 0.3, -1]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.38, 0.38, 0.25, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.27, 32]} />
          <meshStandardMaterial color="#4a5568" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Scheinwerfer Links */}
      <mesh position={[2.1, 0.65, 0.6]} castShadow>
        <boxGeometry args={[0.15, 0.2, 0.3]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffeb3b" 
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Scheinwerfer Rechts */}
      <mesh position={[2.1, 0.65, -0.6]} castShadow>
        <boxGeometry args={[0.15, 0.2, 0.3]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffeb3b" 
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Rücklichter Links */}
      <mesh position={[-2.05, 0.65, 0.7]} castShadow>
        <boxGeometry args={[0.1, 0.15, 0.25]} />
        <meshStandardMaterial 
          color="#ff0000" 
          emissive="#ff0000" 
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Rücklichter Rechts */}
      <mesh position={[-2.05, 0.65, -0.7]} castShadow>
        <boxGeometry args={[0.1, 0.15, 0.25]} />
        <meshStandardMaterial 
          color="#ff0000" 
          emissive="#ff0000" 
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Kühlergrill */}
      <mesh position={[2.15, 0.55, 0]} castShadow>
        <boxGeometry args={[0.05, 0.3, 1.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Vordere Stoßstange */}
      <mesh position={[2.1, 0.25, 0]} castShadow>
        <boxGeometry args={[0.2, 0.15, 1.9]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Hintere Stoßstange */}
      <mesh position={[-2.1, 0.25, 0]} castShadow>
        <boxGeometry args={[0.2, 0.15, 1.9]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Außenspiegel Links */}
      <mesh position={[0.8, 1.05, 1.05]} castShadow>
        <boxGeometry args={[0.15, 0.12, 0.08]} />
        <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Außenspiegel Rechts */}
      <mesh position={[0.8, 1.05, -1.05]} castShadow>
        <boxGeometry args={[0.15, 0.12, 0.08]} />
        <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

export default Car3DModel;
