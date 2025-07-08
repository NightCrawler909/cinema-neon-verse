import { useState, useEffect } from "react";
import { MapPin, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LocationWidgetProps {
  onLocationChange?: (city: string, state: string) => void;
}

const popularCities = [
  { city: "Mumbai", state: "Maharashtra" },
  { city: "Delhi", state: "Delhi" },
  { city: "Bangalore", state: "Karnataka" },
  { city: "Chennai", state: "Tamil Nadu" },
  { city: "Kolkata", state: "West Bengal" },
  { city: "Pune", state: "Maharashtra" },
  { city: "Hyderabad", state: "Telangana" },
  { city: "Ahmedabad", state: "Gujarat" },
];

export function LocationWidget({ onLocationChange }: LocationWidgetProps) {
  const [currentLocation, setCurrentLocation] = useState({ city: "Mumbai", state: "Maharashtra" });
  const [isDetecting, setIsDetecting] = useState(false);

  const detectLocation = async () => {
    setIsDetecting(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      // In a real app, you'd use reverse geocoding API
      // For demo purposes, we'll just set a default location
      const newLocation = { city: "Detected City", state: "Detected State" };
      setCurrentLocation(newLocation);
      onLocationChange?.(newLocation.city, newLocation.state);
    } catch (error) {
      console.error("Geolocation failed:", error);
      // Fallback to default location
    } finally {
      setIsDetecting(false);
    }
  };

  const selectLocation = (city: string, state: string) => {
    setCurrentLocation({ city, state });
    onLocationChange?.(city, state);
  };

  return (
    <div className="glass-card rounded-xl p-3 shadow-card hover:shadow-glow transition-all duration-300">
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-neon-green" />
        <div className="flex-1">
          <div className="text-xs text-cinema-text-muted">Your Location</div>
          <div className="text-sm font-medium text-cinema-text">
            {currentLocation.city}, {currentLocation.state}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 hover:bg-neon-green hover:text-cinema-dark"
            >
              <Edit3 className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="glass-card border-cinema-card">
            <DropdownMenuItem 
              onClick={detectLocation}
              disabled={isDetecting}
              className="hover:bg-cinema-card-hover"
            >
              <MapPin className="w-4 h-4 mr-2" />
              {isDetecting ? "Detecting..." : "Use Current Location"}
            </DropdownMenuItem>
            {popularCities.map((location) => (
              <DropdownMenuItem
                key={`${location.city}-${location.state}`}
                onClick={() => selectLocation(location.city, location.state)}
                className="hover:bg-cinema-card-hover"
              >
                {location.city}, {location.state}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}