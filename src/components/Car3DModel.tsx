import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

const Car3DModel = () => {
  const carRef = useRef<Group>(null);

  useFrame(() => {
    if (carRef.current) {
      // Slight auto-rotation for visual appeal
      carRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={carRef}>
      {/* Car Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[2.5, 0.8, 1.2]} />
        <meshStandardMaterial color="#3498db" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Car Roof */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[1.5, 0.6, 1.1]} />
        <meshStandardMaterial color="#2980b9" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Front Hood */}
      <mesh position={[1.3, 0.35, 0]} castShadow>
        <boxGeometry args={[0.4, 0.5, 1.2]} />
        <meshStandardMaterial color="#3498db" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Wheels - Front Left */}
      <mesh position={[0.8, 0, 0.7]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 16]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Wheels - Front Right */}
      <mesh position={[0.8, 0, -0.7]} castShadow rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 16]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Wheels - Rear Left */}
      <mesh position={[-0.8, 0, 0.7]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 16]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Wheels - Rear Right */}
      <mesh position={[-0.8, 0, -0.7]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 16]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0.6, 1.15, 0]} castShadow>
        <boxGeometry args={[0.7, 0.5, 1.05]} />
        <meshStandardMaterial color="#85c1e9" transparent opacity={0.4} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Rear Window */}
      <mesh position={[-0.6, 1.15, 0]} castShadow>
        <boxGeometry args={[0.6, 0.4, 1.05]} />
        <meshStandardMaterial color="#85c1e9" transparent opacity={0.4} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Side Windows - Left */}
      <mesh position={[0, 0.95, 0.61]} castShadow>
        <boxGeometry args={[1.2, 0.4, 0.05]} />
        <meshStandardMaterial color="#85c1e9" transparent opacity={0.3} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Side Windows - Right */}
      <mesh position={[0, 0.95, -0.61]} castShadow>
        <boxGeometry args={[1.2, 0.4, 0.05]} />
        <meshStandardMaterial color="#85c1e9" transparent opacity={0.3} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Headlights - Left */}
      <mesh position={[1.5, 0.5, 0.45]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#f1c40f" emissive="#f1c40f" emissiveIntensity={0.5} />
      </mesh>

      {/* Headlights - Right */}
      <mesh position={[1.5, 0.5, -0.45]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#f1c40f" emissive="#f1c40f" emissiveIntensity={0.5} />
      </mesh>

      {/* Taillights - Left */}
      <mesh position={[-1.25, 0.5, 0.55]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#e74c3c" emissive="#e74c3c" emissiveIntensity={0.5} />
      </mesh>

      {/* Taillights - Right */}
      <mesh position={[-1.25, 0.5, -0.55]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#e74c3c" emissive="#e74c3c" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

export default Car3DModel;
