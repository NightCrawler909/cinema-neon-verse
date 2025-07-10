import { useRef, useState, useCallback, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Box, Plane, useTexture } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, X, Eye, EyeOff } from "lucide-react";
import * as THREE from "three";

// Theater types with different configurations
type TheaterType = 'regular' | 'imax' | 'recliner';

interface TheaterConfig {
  rows: string[];
  seatsPerRow: number[];
  seatSpacing: number;
  rowSpacing: number;
  curvature: number;
  aisleWidth: number;
}

const theaterConfigs: Record<TheaterType, TheaterConfig> = {
  regular: {
    rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    seatsPerRow: [10, 12, 12, 14, 14, 16, 16, 18],
    seatSpacing: 1.0,
    rowSpacing: 1.2,
    curvature: 0,
    aisleWidth: 1.5
  },
  imax: {
    rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    seatsPerRow: [16, 18, 20, 22, 24, 24, 26, 28, 30, 32],
    seatSpacing: 1.1,
    rowSpacing: 1.4,
    curvature: 0.3,
    aisleWidth: 2.0
  },
  recliner: {
    rows: ['A', 'B', 'C', 'D', 'E', 'F'],
    seatsPerRow: [6, 8, 8, 10, 10, 12],
    seatSpacing: 1.8,
    rowSpacing: 2.0,
    curvature: 0.1,
    aisleWidth: 2.5
  }
};

interface SeatProps {
  position: [number, number, number];
  seatNumber: string;
  status: 'available' | 'selected' | 'booked';
  theaterType: TheaterType;
  onSelect: (seatNumber: string) => void;
}

// Realistic 3D Seat Component
function RealisticSeat({ position, seatNumber, status, theaterType, onSelect }: SeatProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation for selected seats
      if (status === 'selected') {
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
      } else {
        groupRef.current.position.y = position[1];
        groupRef.current.rotation.y = 0;
      }
      
      // Scale animation on hover
      const targetScale = hovered ? 1.05 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const getColors = () => {
    const baseColor = theaterType === 'recliner' ? '#D2B48C' : '#E5E7EB'; // Light gray for better visibility
    const accentColor = theaterType === 'recliner' ? '#F4A460' : '#D1D5DB';
    
    if (status === 'booked') return { base: '#EF4444', accent: '#DC2626' }; // Bright red
    if (status === 'selected') return { base: '#B9FF00', accent: '#9AE600' }; // Bright green
    if (hovered && status === 'available') return { base: '#55E7FC', accent: '#33C7E8' }; // Cyan glow
    return { base: baseColor, accent: accentColor };
  };

  const colors = getColors();
  const seatScale = theaterType === 'recliner' ? 1.2 : 1.0;

  const handleClick = () => {
    if (status === 'available' || status === 'selected') {
      onSelect(seatNumber);
    }
  };

  return (
    <group 
      ref={groupRef} 
      position={position}
      rotation={[0, Math.PI, 0]} // Rotate 180° to face the screen
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = status === 'booked' ? 'not-allowed' : 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Seat Base */}
      <Box args={[0.7 * seatScale, 0.1, 0.7 * seatScale]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color={colors.base}
          metalness={0.1}
          roughness={0.5}
          emissive={status === 'selected' ? '#B9FF00' : hovered ? '#55E7FC' : '#000000'}
          emissiveIntensity={status === 'selected' ? 0.3 : hovered ? 0.2 : 0}
        />
      </Box>
      
      {/* Seat Cushion */}
      <Box args={[0.6 * seatScale, 0.15, 0.5 * seatScale]} position={[0, 0.125, 0.05]}>
        <meshStandardMaterial 
          color={colors.accent}
          metalness={0.05}
          roughness={0.6}
        />
      </Box>
      
      {/* Seat Back */}
      <Box args={[0.6 * seatScale, 0.6, 0.1]} position={[0, 0.3, -0.25]}>
        <meshStandardMaterial 
          color={colors.base}
          metalness={0.1}
          roughness={0.5}
        />
      </Box>
      
      {/* Armrests */}
      <Box args={[0.1, 0.3, 0.4]} position={[-0.3 * seatScale, 0.15, 0]}>
        <meshStandardMaterial color={colors.accent} metalness={0.3} roughness={0.6} />
      </Box>
      <Box args={[0.1, 0.3, 0.4]} position={[0.3 * seatScale, 0.15, 0]}>
        <meshStandardMaterial color={colors.accent} metalness={0.3} roughness={0.6} />
      </Box>
      
      {/* Seat Number Display */}
      {(hovered || status === 'selected') && (
        <Text
          position={[0, 0.8, 0]}
          fontSize={0.25}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {seatNumber}
        </Text>
      )}
      
      {/* Selection glow effect */}
      {(status === 'selected' || hovered) && (
        <Plane args={[1.2 * seatScale, 1.2 * seatScale]} position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshBasicMaterial 
            color={status === 'selected' ? '#B9FF00' : '#55E7FC'}
            transparent
            opacity={0.3}
          />
        </Plane>
      )}
    </group>
  );
}

// Movie Screen with Poster
function MovieScreen({ moviePoster }: { moviePoster?: string }) {
  let posterTexture;
  try {
    posterTexture = useTexture(moviePoster || '/lovable-uploads/d33775cf-4021-4019-bc26-9117f7ac6a39.png');
  } catch (error) {
    console.warn('Failed to load poster texture:', error);
    posterTexture = null;
  }
  
  return (
    <group>
      {/* Screen Frame */}
      <Box position={[0, 3, -8.2]} args={[13, 7.5, 0.15]}>
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#B9FF00" 
          emissiveIntensity={0.05}
        />
      </Box>
      
      {/* Movie Poster */}
      <Plane args={[12, 6.8]} position={[0, 3, -8.1]}>
        <meshStandardMaterial 
          map={posterTexture || undefined}
          color={posterTexture ? "#ffffff" : "#000000"}
          emissive="#ffffff"
          emissiveIntensity={posterTexture ? 0.1 : 0.05}
        />
      </Plane>
      
      {/* Screen lighting effect */}
      <pointLight 
        position={[0, 3, -7]} 
        intensity={0.5} 
        color="#ffffff" 
        distance={15}
        decay={2}
      />
    </group>
  );
}

// Enhanced Theater Environment
function TheaterEnvironment({ theaterType, moviePoster }: { theaterType: TheaterType; moviePoster?: string }) {
  return (
    <group>
      {/* Theater Floor with carpet texture */}
      <Plane args={[25, 20]} position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color="#2a1810" 
          roughness={0.9}
          metalness={0.1}
        />
      </Plane>
      
      {/* Walls */}
      <Plane args={[25, 8]} position={[0, 4, -10]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Plane>
      
      {/* Side walls */}
      <Plane args={[20, 8]} position={[-12.5, 4, 0]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Plane>
      <Plane args={[20, 8]} position={[12.5, 4, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Plane>
      
      {/* Movie Screen */}
      <MovieScreen moviePoster={moviePoster} />
      
      {/* Theater Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 8, 0]} intensity={0.3} color="#B9FF00" />
      <spotLight 
        position={[0, 10, -5]} 
        angle={0.5} 
        penumbra={1} 
        intensity={0.4} 
        color="#55E7FC"
        target-position={[0, 0, 0]}
      />
      
      {/* Exit signs */}
      <Box args={[1.5, 0.5, 0.1]} position={[-10, 6, -9]}>
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.3} />
      </Box>
      <Box args={[1.5, 0.5, 0.1]} position={[10, 6, -9]}>
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.3} />
      </Box>
    </group>
  );
}

interface Theater3DProps {
  onBack: () => void;
  moviePoster?: string;
  movieTitle?: string;
}

export function Theater3D({ onBack, moviePoster, movieTitle = "Mavka: Forest Song" }: Theater3DProps) {
  const [theaterType, setTheaterType] = useState<TheaterType>('regular');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seatStatuses, setSeatStatuses] = useState<Record<string, 'available' | 'selected' | 'booked'>>({
    'A1': 'booked', 'A2': 'booked', 'B3': 'booked', 'C5': 'booked', 'D7': 'booked',
    'E2': 'booked', 'F8': 'booked', 'G4': 'booked', 'H6': 'booked', 'D12': 'booked'
  });
  const [showLegend, setShowLegend] = useState(true);
  const orbitControlsRef = useRef<any>();

  const config = theaterConfigs[theaterType];

  const handleSeatSelect = useCallback((seatNumber: string) => {
    setSeatStatuses(prev => {
      const newStatuses = { ...prev };
      
      if (newStatuses[seatNumber] === 'selected') {
        // Deselect seat
        newStatuses[seatNumber] = 'available';
        setSelectedSeats(current => current.filter(seat => seat !== seatNumber));
      } else if (newStatuses[seatNumber] !== 'booked') {
        // Select seat
        newStatuses[seatNumber] = 'selected';
        setSelectedSeats(current => [...current, seatNumber]);
      }
      
      return newStatuses;
    });
  }, []);

  const clearAllSelections = useCallback(() => {
    setSeatStatuses(prev => {
      const newStatuses = { ...prev };
      selectedSeats.forEach(seat => {
        newStatuses[seat] = 'available';
      });
      return newStatuses;
    });
    setSelectedSeats([]);
  }, [selectedSeats]);

  const resetView = useCallback(() => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.reset();
    }
  }, []);

  const generateSeats = useMemo(() => {
    const seats = [];
    const maxSeats = Math.max(...config.seatsPerRow);
    const theaterWidth = maxSeats * config.seatSpacing + config.aisleWidth;
    const scaleFactor = theaterType === 'imax' ? 0.8 : 1.0; // Scale down IMAX for better fit
    
    for (let rowIndex = 0; rowIndex < config.rows.length; rowIndex++) {
      const row = config.rows[rowIndex];
      const seatsInRow = config.seatsPerRow[rowIndex];
      
      // Calculate row position with curvature - scale for IMAX
      const baseZ = (rowIndex - config.rows.length / 2) * config.rowSpacing * scaleFactor;
      
      for (let seatIndex = 1; seatIndex <= seatsInRow; seatIndex++) {
        const seatNumber = `${row}${seatIndex}`;
        
        // Create center aisle by skipping middle seats
        const isLeftSide = seatIndex <= Math.floor(seatsInRow / 2);
        const isRightSide = seatIndex > Math.ceil(seatsInRow / 2);
        
        if (!isLeftSide && !isRightSide) continue; // Skip center aisle
        
        // Calculate X position with proper mirroring and scaling
        let x: number;
        if (isLeftSide) {
          x = -(Math.floor(seatsInRow / 2) - seatIndex + 1) * config.seatSpacing * scaleFactor - (config.aisleWidth * scaleFactor) / 2;
        } else {
          x = (seatIndex - Math.ceil(seatsInRow / 2)) * config.seatSpacing * scaleFactor + (config.aisleWidth * scaleFactor) / 2;
        }
        
        // Apply curvature for IMAX theaters with scaling
        const curveOffset = config.curvature * Math.pow(x, 2) * 0.01 * scaleFactor;
        const z = baseZ + curveOffset;
        const y = 0;
        
        seats.push(
          <RealisticSeat
            key={seatNumber}
            position={[x, y, z]}
            seatNumber={seatNumber}
            status={seatStatuses[seatNumber] || 'available'}
            theaterType={theaterType}
            onSelect={handleSeatSelect}
          />
        );
      }
    }
    return seats;
  }, [config, seatStatuses, theaterType, handleSeatSelect]);

  // Calculate seat statistics
  const seatStats = useMemo(() => {
    const total = Object.keys(seatStatuses).length + (generateSeats.length - Object.keys(seatStatuses).length);
    const booked = Object.values(seatStatuses).filter(s => s === 'booked').length;
    const selected = selectedSeats.length;
    const available = total - booked - selected;
    
    return { total, available, selected, booked };
  }, [seatStatuses, selectedSeats, generateSeats.length]);

  return (
    <div className="fixed inset-0 bg-cinema-dark z-50 flex flex-col">
      {/* Enhanced Header Controls */}
      <div className="flex items-center justify-between p-4 glass-card m-4 rounded-xl">
        <div className="flex items-center gap-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-neon-green text-neon-green hover:bg-neon-green hover:text-cinema-dark"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to 2D View
          </Button>
          
          {/* Theater Type Selector */}
          <div className="flex gap-2">
            {(Object.keys(theaterConfigs) as TheaterType[]).map((type) => (
              <Button
                key={type}
                variant={theaterType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setTheaterType(type)}
                className={theaterType === type 
                  ? "bg-neon-green text-cinema-dark" 
                  : "border-cinema-card text-cinema-text hover:bg-cinema-card"
                }
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-cinema-text hidden md:block">
          3D Theater - {movieTitle}
        </h2>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowLegend(!showLegend)}
            variant="outline"
            size="sm"
            className="border-cinema-card text-cinema-text hover:bg-cinema-card"
          >
            {showLegend ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
          <Button
            onClick={resetView}
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
          camera={{ 
            position: theaterType === 'imax' ? [0, 15, 20] : [0, 12, 15], 
            fov: theaterType === 'imax' ? 70 : 60 
          }}
          className="w-full h-full"
          gl={{ 
            preserveDrawingBuffer: true, 
            antialias: true,
            powerPreference: "high-performance"
          }}
          onCreated={({ gl }) => {
            gl.setClearColor('#0a0a0a');
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
        >
          <TheaterEnvironment theaterType={theaterType} moviePoster={moviePoster} />
          {generateSeats}
          <OrbitControls 
            ref={orbitControlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={8}
            maxDistance={30}
            maxPolarAngle={Math.PI / 2.2}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Canvas>
        
        {/* Enhanced Seat Legend */}
        {showLegend && (
          <div className="absolute top-4 right-4 glass-card p-4 rounded-xl space-y-3" role="region" aria-label="Seat Legend">
            <h3 className="text-sm font-semibold text-cinema-text mb-3">Seat Legend</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-600 rounded"></div>
                  <span className="text-cinema-text">Available</span>
                </div>
                <span className="text-cinema-text-muted">{seatStats.available}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-neon-green rounded shadow-neon"></div>
                  <span className="text-cinema-text">Selected</span>
                </div>
                <span className="text-cinema-text-muted">{seatStats.selected}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-cinema-text">Booked</span>
                </div>
                <span className="text-cinema-text-muted">{seatStats.booked}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-400 rounded"></div>
                <span className="text-cinema-text">Hovered</span>
              </div>
            </div>
          </div>
        )}

        {/* Selected Seats Summary */}
        {selectedSeats.length > 0 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass-card p-4 rounded-xl max-w-md w-full mx-4">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-cinema-text">
                  Selected: {selectedSeats.join(', ')}
                </h3>
                <Button
                  onClick={clearAllSelections}
                  variant="ghost"
                  size="sm"
                  className="text-cinema-text-muted hover:text-cinema-text p-1"
                  aria-label="Clear all selections"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-cinema-text-muted">
                Total: ₹{selectedSeats.length * (theaterType === 'recliner' ? 450 : theaterType === 'imax' ? 350 : 250)}
              </p>
              <div className="flex gap-2">
                <Button 
                  onClick={clearAllSelections}
                  variant="outline" 
                  className="flex-1 border-cinema-card text-cinema-text hover:bg-cinema-card"
                >
                  Clear All
                </Button>
                <Button className="flex-1 bg-neon-green hover:bg-neon-green-glow text-cinema-dark rounded-xl px-6 shadow-neon">
                  Confirm & Continue
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Instructions */}
      <div className="p-4 text-center text-sm text-cinema-text-muted space-y-1">
        <div>🖱️ Click and drag to rotate • 🔍 Scroll to zoom • 👆 Click seats to select/deselect</div>
        <div>💺 {theaterType.charAt(0).toUpperCase() + theaterType.slice(1)} Theater • {seatStats.total} total seats</div>
      </div>
    </div>
  );
}