import { useRef, useState, useCallback } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text, Box, RoundedBox, Plane } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import * as THREE from "three";
import { TextureLoader, RepeatWrapping, LinearFilter } from 'three';

interface SeatProps {
  position: [number, number, number];
  seatNumber: string;
  status: 'available' | 'selected' | 'booked';
  onSelect: (seatNumber: string) => void;
}

function Seat({ position, seatNumber, status, onSelect }: SeatProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      // Gentle floating animation for selected seats
      if (status === 'selected') {
        meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.003) * 0.1;
      } else {
        meshRef.current.position.y = position[1];
      }
    }
  });

  const getColor = () => {
    if (status === 'booked') return '#ff4444';
    if (status === 'selected') return '#B9FF00';
    if (hovered && status === 'available') return '#55E7FC';
    return '#666666';
  };

  const handleClick = () => {
    if (status === 'available') {
      onSelect(seatNumber);
    }
  };

  return (
    <group>
      {/* Seat base: rounded, cushion-like */}
      <RoundedBox
        ref={meshRef}
        position={[position[0], position[1], position[2]]}
        args={[0.9, 0.32, 0.9]}
        radius={0.16}
        smoothness={6}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color={getColor()} 
          roughness={0.45}
          metalness={0.18}
          emissive={status === 'selected' ? '#B9FF00' : hovered ? '#55E7FC' : '#000000'}
          emissiveIntensity={status === 'selected' ? 0.45 : hovered ? 0.18 : 0}
        />
      </RoundedBox>
      {/* Seat backrest: small box behind, slightly curved */}
      <Box
        position={[position[0], position[1] + 0.36, position[2] - 0.28]}
        args={[0.78, 0.54, 0.16]}
        rotation={[0.12, 0, 0]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color={getColor()} 
          roughness={0.38}
          metalness={0.12}
          emissive={status === 'selected' ? '#B9FF00' : hovered ? '#55E7FC' : '#000000'}
          emissiveIntensity={status === 'selected' ? 0.45 : hovered ? 0.18 : 0}
        />
      </Box>
      {/* Seat Number (optional, on hover/selected) */}
      {(hovered || status === 'selected') && (
        <Text
          position={[position[0], position[1] + 1.1, position[2]]}
          fontSize={0.28}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineColor="#000"
          outlineWidth={0.03}
        >
          {seatNumber}
        </Text>
      )}
    </group>
  );
}

function TheaterEnvironment({ poster, rowLabels }: { poster: string, rowLabels: string[] }) {
  // Use TMDb poster if available, else fallback
  const tmdbPoster = poster?.startsWith('http') ? poster : undefined;
  const texture = useLoader(TextureLoader, tmdbPoster || poster);
  if (texture) {
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.minFilter = LinearFilter;
  }
  return (
    <group>
      {/* Theater Floor */}
      <Box position={[0, -1, 0]} args={[24, 0.2, 22]}>
        <meshStandardMaterial color="#232323" />
      </Box>
      {/* Stage Lighting (subtle) */}
      <spotLight position={[0, 7, -8]} angle={0.45} penumbra={1} intensity={1.1} color="#B9FF00" castShadow />
      <spotLight position={[-6, 6, -7]} angle={0.5} penumbra={1} intensity={0.5} color="#55E7FC" />
      <spotLight position={[6, 6, -7]} angle={0.5} penumbra={1} intensity={0.5} color="#55E7FC" />
      {/* Ambient and fill lights */}
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 10, 0]} intensity={0.3} color="#B9FF00" />
      {/* Movie Poster Screen (Plane) */}
      <Plane args={[13, 7]} position={[0, 3.5, -10]} rotation={[-0.01, 0, 0]}>
        <meshStandardMaterial map={texture} emissive="#ffffff" emissiveIntensity={0.18} />
      </Plane>
      {/* Screen Frame (neon) */}
      <Box position={[0, 3.5, -10.36]} args={[13.4, 7.4, 0.1]}>
        <meshStandardMaterial color="#B9FF00" emissive="#B9FF00" emissiveIntensity={0.12} />
      </Box>
      {/* Row Labels (glowing letters on left wall) */}
      {rowLabels.map((label, i) => (
        <Text
          key={label}
          position={[-7.5, 0.2 + i * 1.2, -6 + i * 1.2]}
          fontSize={0.6}
          color="#B9FF00"
          anchorX="center"
          anchorY="middle"
          outlineColor="#B9FF00"
          outlineWidth={0.04}
          fillOpacity={0.8}
        >
          {label}
        </Text>
      ))}
    </group>
  );
}

interface Theater3DProps {
  onBack: () => void;
  movie?: { poster: string };
  theater?: { seatLayout: { row: string, seats: number[] }[] };
}

export function Theater3D({ onBack, movie, theater }: Theater3DProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seatStatuses, setSeatStatuses] = useState<Record<string, 'available' | 'selected' | 'booked'>>({
    'A1': 'booked', 'A2': 'booked', 'B3': 'booked', 'C5': 'booked', 'D7': 'booked',
    'E2': 'booked', 'F8': 'booked', 'G4': 'booked', 'H6': 'booked'
  });

  const handleSeatSelect = useCallback((seatNumber: string) => {
    setSeatStatuses(prev => {
      const newStatuses = { ...prev };
      
      if (newStatuses[seatNumber] === 'selected') {
        newStatuses[seatNumber] = 'available';
        setSelectedSeats(current => current.filter(seat => seat !== seatNumber));
      } else {
        newStatuses[seatNumber] = 'selected';
        setSelectedSeats(current => [...current, seatNumber]);
      }
      
      return newStatuses;
    });
  }, []);

  // Realistic stadium layout: 10 rows, 12 seats per row, center aisle, slight curve
  const defaultLayout = [
    { row: 'A', seats: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { row: 'B', seats: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { row: 'C', seats: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { row: 'D', seats: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { row: 'E', seats: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { row: 'F', seats: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { row: 'G', seats: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { row: 'H', seats: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { row: 'I', seats: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { row: 'J', seats: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ];
  const seatLayout = theater?.seatLayout || defaultLayout;

  const rowLabels = seatLayout.map(r => r.row);

  const generateSeats = () => {
    const seats = [];
    const rowCount = seatLayout.length;
    const seatDepth = 1.2;
    const seatWidth = 1.1;
    const aisleWidth = 1.8;
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const row = seatLayout[rowIndex];
      // Stadium elevation: each row is higher
      const y = 0.2 + rowIndex * 0.18;
      // Curve: seats are slightly fanned out
      const curve = 0.18 * (rowIndex - rowCount / 2);
      const seatsPerRow = row.seats.length;
      for (let seatPos = 0; seatPos < seatsPerRow; seatPos++) {
        // Center aisle between seats 5/6 (for 12 seats: after 6)
        let x = (seatPos - (seatsPerRow - 1) / 2) * seatWidth;
        if (seatPos >= 6) x += aisleWidth;
        // Curve: fan out
        const angle = (seatPos - (seatsPerRow - 1) / 2) * 0.04;
        const z = rowIndex * seatDepth - 7;
        const seatNumber = `${row.row}${row.seats[seatPos]}`;
        seats.push(
          <Seat
            key={seatNumber}
            position={[x * Math.cos(curve) - z * Math.sin(curve), y, z * Math.cos(curve) + x * Math.sin(curve)]}
            seatNumber={seatNumber}
            status={seatStatuses[seatNumber] || 'available'}
            onSelect={handleSeatSelect}
          />
        );
      }
    }
    return seats;
  };

  return (
    <div className="fixed inset-0 bg-cinema-dark z-50 flex flex-col">
      {/* Header Controls */}
      <div className="flex items-center justify-between p-4 glass-card m-4 rounded-xl">
        <Button
          onClick={onBack}
          variant="outline"
          className="border-neon-green text-neon-green hover:bg-neon-green hover:text-cinema-dark"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to 2D View
        </Button>
        
        <h2 className="text-xl font-bold text-cinema-text">3D Theater Experience</h2>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-cinema-card text-cinema-text hover:bg-cinema-card"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset View
          </Button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="flex-1 relative">
        <Canvas
          camera={{ position: [0, 8, 12], fov: 60 }}
          className="w-full h-full"
          shadows
        >
          <TheaterEnvironment poster={movie?.poster} rowLabels={rowLabels} />
          {generateSeats()}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={8}
            maxDistance={32}
            maxPolarAngle={Math.PI / 2}
            target={[0, 2, -2]}
          />
        </Canvas>
        
        {/* Seat Legend */}
        <div className="absolute top-4 right-4 glass-card p-4 rounded-xl space-y-2">
          <h3 className="text-sm font-semibold text-cinema-text mb-3">Seat Legend</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-600 rounded"></div>
              <span className="text-cinema-text">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-neon-green rounded shadow-neon"></div>
              <span className="text-cinema-text">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-cinema-text">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-400 rounded"></div>
              <span className="text-cinema-text">Hovered</span>
            </div>
          </div>
        </div>

        {/* Selected Seats Summary */}
        {selectedSeats.length > 0 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass-card p-4 rounded-xl">
            <div className="text-center space-y-3">
              <h3 className="font-semibold text-cinema-text">
                Selected Seats: {selectedSeats.join(', ')}
              </h3>
              <p className="text-sm text-cinema-text-muted">
                Total: ₹{selectedSeats.length * 250}
              </p>
              <Button className="bg-neon-green hover:bg-neon-green-glow text-cinema-dark rounded-full px-6 shadow-neon">
                Confirm & Continue
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="p-4 text-center text-sm text-cinema-text-muted">
        Click and drag to rotate • Scroll to zoom • Click seats to select
      </div>
    </div>
  );
}