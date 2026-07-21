import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Modelos 3D estilizados (no fotorrealistas) de los tres ambientes.
 * Construidos sólo con primitivas para mantener la escena ligera y coherente
 * con la paleta: cal (#F7F2E9), añil (#1E3A4C), terracota (#B5502E) y maderas.
 *
 * Cada ambiente vive en su propia posición en X: Barril (-6), Salón (0), Terraza (+6),
 * de modo que la cámara viaja lateralmente entre ellos.
 */

const COL = {
  cal: '#F7F2E9',
  calDark: '#E3D6BE',
  anil: '#1E3A4C',
  anilLight: '#3C6178',
  terracota: '#B5502E',
  wood: '#8A5A3B',
  woodDark: '#5E3A22',
  hoop: '#42342A',
  vine: '#3F5E3A',
  vineLight: '#5C7E4E',
  wine: '#7C1E2B',
} as const;

function Mat({ color, ...props }: { color: string } & JSX.IntrinsicElements['meshStandardMaterial']) {
  return <meshStandardMaterial color={color} roughness={0.72} metalness={0.02} {...props} />;
}

/* ----------------------------------- Barril ----------------------------------- */

function Barrel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Cuerpo del barril */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.36, 1.0, 24]} />
        <Mat color={COL.wood} roughness={0.85} />
      </mesh>
      {/* Duelas oscuras marcadas con aros */}
      {[-0.32, 0, 0.32].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.4, 0.028, 8, 28]} />
          <Mat color={COL.hoop} roughness={0.5} metalness={0.3} />
        </mesh>
      ))}
      {/* Tapa superior a modo de mesa alta */}
      <mesh position={[0, 0.52, 0]} castShadow>
        <cylinderGeometry args={[0.46, 0.46, 0.05, 24]} />
        <Mat color={COL.woodDark} />
      </mesh>
    </group>
  );
}

function Stool({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.42, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.05, 16]} />
        <Mat color={COL.terracota} />
      </mesh>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.05, 0.42, 10]} />
        <Mat color={COL.anil} />
      </mesh>
    </group>
  );
}

function WineGlass({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.07, 0.02, 0.18, 12, 1, true]} />
        <meshStandardMaterial color={COL.cal} transparent opacity={0.35} roughness={0.1} side={THREE.DoubleSide} />
      </mesh>
      {/* Vino */}
      <mesh position={[0, 0.11, 0]}>
        <cylinderGeometry args={[0.05, 0.02, 0.07, 12]} />
        <Mat color={COL.wine} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.14, 8]} />
        <Mat color={COL.cal} transparent opacity={0.4} />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.01, 12]} />
        <Mat color={COL.cal} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export function BarrilScene({ x }: { x: number }) {
  return (
    <group position={[x, 0, 0]}>
      <Barrel position={[0, 0.5, 0]} />
      <WineGlass position={[0.12, 1.05, 0.1]} />
      <WineGlass position={[-0.14, 1.05, -0.05]} />
      <Stool position={[0.85, 0, 0.4]} />
      <Stool position={[-0.8, 0, 0.55]} />
      {/* Trozo de pared de cal al fondo */}
      <mesh position={[0, 1.1, -1.1]} receiveShadow>
        <boxGeometry args={[2.6, 2.4, 0.1]} />
        <Mat color={COL.cal} />
      </mesh>
      <FloorPatch />
    </group>
  );
}

/* ----------------------------------- Salón ----------------------------------- */

function Chair({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.28, 0]} castShadow>
        <boxGeometry args={[0.34, 0.05, 0.34]} />
        <Mat color={COL.anil} />
      </mesh>
      <mesh position={[0, 0.5, -0.15]} castShadow>
        <boxGeometry args={[0.34, 0.44, 0.05]} />
        <Mat color={COL.anil} />
      </mesh>
      {[
        [-0.14, 0.14, -0.14],
        [0.14, 0.14, -0.14],
        [-0.14, 0.14, 0.14],
        [0.14, 0.14, 0.14],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.04, 0.28, 0.04]} />
          <Mat color={COL.woodDark} />
        </mesh>
      ))}
    </group>
  );
}

function Plate({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} castShadow>
      <cylinderGeometry args={[0.16, 0.14, 0.03, 20]} />
      <Mat color={COL.cal} roughness={0.4} />
    </mesh>
  );
}

export function SalonScene({ x }: { x: number }) {
  return (
    <group position={[x, 0, 0]}>
      {/* Mesa larga con mantel de cal */}
      <mesh position={[0, 0.62, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.06, 0.9]} />
        <Mat color={COL.cal} />
      </mesh>
      {/* Faldón del mantel */}
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[1.96, 0.36, 0.86]} />
        <Mat color={COL.calDark} />
      </mesh>
      {[-0.55, 0, 0.55].map((px) => (
        <Plate key={px} position={[px, 0.67, 0.16]} />
      ))}
      {[-0.55, 0, 0.55].map((px) => (
        <Plate key={`b${px}`} position={[px, 0.67, -0.16]} />
      ))}
      <Chair position={[-0.55, 0, 0.62]} />
      <Chair position={[0.1, 0, 0.62]} />
      <Chair position={[-0.25, 0, -0.62]} rotation={[0, Math.PI, 0]} />
      <Chair position={[0.4, 0, -0.62]} rotation={[0, Math.PI, 0]} />
      {/* Lámpara colgante sobre la mesa */}
      <group position={[0, 1.55, 0]}>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.5, 6]} />
          <Mat color={COL.anil} />
        </mesh>
        <mesh castShadow>
          <coneGeometry args={[0.22, 0.2, 20, 1, true]} />
          <Mat color={COL.terracota} side={THREE.DoubleSide} />
        </mesh>
        <pointLight position={[0, -0.1, 0]} intensity={6} distance={3} color="#ffd9a8" />
        <mesh position={[0, -0.08, 0]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial color="#ffd9a8" emissive="#ffb870" emissiveIntensity={2} />
        </mesh>
      </group>
      {/* Pared de cal */}
      <mesh position={[0, 1.2, -1.2]} receiveShadow>
        <boxGeometry args={[3.4, 2.6, 0.1]} />
        <Mat color={COL.cal} />
      </mesh>
      <FloorPatch wide />
    </group>
  );
}

/* ----------------------------------- Terraza ----------------------------------- */

function Foliage({ position, scale = 1, color }: { position: [number, number, number]; scale?: number; color: string }) {
  return (
    <mesh position={position} scale={scale} castShadow>
      <icosahedronGeometry args={[0.22, 0]} />
      <Mat color={color} flatShading roughness={0.9} />
    </mesh>
  );
}

export function TerrazaScene({ x }: { x: number }) {
  // Posiciones de follaje de la parra, memorizadas para que no salten en cada render
  const leaves = useMemo(
    () =>
      Array.from({ length: 14 }, () => ({
        pos: [
          (Math.random() - 0.5) * 2.2,
          1.72 + (Math.random() - 0.5) * 0.18,
          (Math.random() - 0.5) * 1.4,
        ] as [number, number, number],
        scale: 0.7 + Math.random() * 0.8,
        color: Math.random() > 0.5 ? COL.vine : COL.vineLight,
      })),
    [],
  );

  return (
    <group position={[x, 0, 0]}>
      {/* Mesa redonda */}
      <mesh position={[0, 0.62, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.55, 0.05, 28]} />
        <Mat color={COL.calDark} />
      </mesh>
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 0.6, 12]} />
        <Mat color={COL.anil} />
      </mesh>
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.04, 20]} />
        <Mat color={COL.anil} />
      </mesh>
      <Plate position={[0.18, 0.66, 0.1]} />
      <Plate position={[-0.2, 0.66, -0.05]} />
      <Chair position={[0.7, 0, 0.2]} rotation={[0, -Math.PI / 2.4, 0]} />
      <Chair position={[-0.7, 0, 0.1]} rotation={[0, Math.PI / 2.4, 0]} />

      {/* Pérgola / parra: postes y vigas */}
      {[
        [-1.1, 0, -0.9],
        [1.1, 0, -0.9],
        [-1.1, 0, 0.9],
        [1.1, 0, 0.9],
      ].map((p, i) => (
        <mesh key={i} position={[p[0], 0.9, p[2]]} castShadow>
          <boxGeometry args={[0.08, 1.8, 0.08]} />
          <Mat color={COL.woodDark} />
        </mesh>
      ))}
      {/* Vigas superiores */}
      {[-0.7, -0.2, 0.3, 0.8].map((z) => (
        <mesh key={z} position={[0, 1.82, z]} castShadow>
          <boxGeometry args={[2.3, 0.05, 0.05]} />
          <Mat color={COL.wood} />
        </mesh>
      ))}
      {/* Follaje de la parra */}
      {leaves.map((l, i) => (
        <Foliage key={i} position={l.pos} scale={l.scale} color={l.color} />
      ))}

      <FloorPatch />
    </group>
  );
}

/* --------------------------------- Compartido --------------------------------- */

function FloorPatch({ wide = false }: { wide?: boolean }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]} receiveShadow>
      <circleGeometry args={[wide ? 2.4 : 1.9, 40]} />
      <Mat color={COL.calDark} roughness={0.95} />
    </mesh>
  );
}
