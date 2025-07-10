import { useRef, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Box } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import * as THREE from "three";

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
      <Box
        ref={meshRef}
        position={position}
        args={[0.8, 0.8, 0.8]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={getColor()} 
          emissive={status === 'selected' ? '#B9FF00' : hovered ? '#55E7FC' : '#000000'}
          emissiveIntensity={status === 'selected' ? 0.3 : hovered ? 0.1 : 0}
        />
      </Box>
      
      {/* Seat Number */}
      {(hovered || status === 'selected') && (
        <Text
          position={[position[0], position[1] + 1.2, position[2]]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {seatNumber}
        </Text>
      )}
    </group>
  );
}

function TheaterEnvironment() {
  return (
    <group>
      {/* Theater Floor */}
      <Box position={[0, -1, 0]} args={[20, 0.2, 15]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>
      
      {/* Theater Screen */}
      <Box position={[0, 3, -8]} args={[12, 6, 0.2]}>
        <meshStandardMaterial color="#000000" emissive="#111111" emissiveIntensity={0.2} />
      </Box>
      
      {/* Screen Frame */}
      <Box position={[0, 3, -8.2]} args={[13, 7, 0.1]}>
        <meshStandardMaterial color="#B9FF00" emissive="#B9FF00" emissiveIntensity={0.1} />
      </Box>
      
      {/* Ambient Theater Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 8, 0]} intensity={0.5} color="#B9FF00" />
      <spotLight 
        position={[0, 10, -5]} 
        angle={0.3} 
        penumbra={1} 
        intensity={0.5} 
        color="#55E7FC"
      />
    </group>
  );
}

interface Theater3DProps {
  onBack: () => void;
}

export function Theater3D({ onBack }: Theater3DProps) {
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

  const generateSeats = () => {
    const seats = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex];
      for (let seatIndex = 1; seatIndex <= 10; seatIndex++) {
        const seatNumber = `${row}${seatIndex}`;
        const x = (seatIndex - 5.5) * 1.2;
        const z = (rowIndex - 3.5) * 1.5;
        const y = 0;
        
        seats.push(
          <Seat
            key={seatNumber}
            position={[x, y, z]}
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
          gl={{ preserveDrawingBuffer: true, antialias: true }}
          onCreated={({ gl }) => {
            gl.setClearColor('#1a1a1a');
          }}
        >
          <TheaterEnvironment />
          {generateSeats()}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={25}
            maxPolarAngle={Math.PI / 2}
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