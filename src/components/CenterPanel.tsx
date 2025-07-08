import { useState } from "react";
import { Search, Play, Star, User, Sun, Moon, Menu } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { BottomNavigation } from "./BottomNavigation";
import { LocationWidget } from "./LocationWidget";
import { NearbyTheatersSection } from "./NearbyTheatersSection";
import { TrendingMoviesSection } from "./TrendingMoviesSection";
import { Theater3D } from "./Theater3D";
import { FoodDrinksCard } from "./FoodDrinksCard";
import shazamPoster from "@/assets/shazam-poster.jpg";
import screamPoster from "@/assets/scream-poster.jpg";
import mascaradePoster from "@/assets/mascarade-poster.jpg";
import ritualKillerPoster from "@/assets/ritual-killer-poster.jpg";

const movies = [
  {
    id: 1,
    title: "Shazam: Fury of the Gods",
    genre: "Action, Adventure",
    rating: 4,
    poster: shazamPoster
  },
  {
    id: 2,
    title: "Scream VI",
    genre: "Horror, Mystery",
    rating: 5,
    poster: screamPoster
  },
  {
    id: 3,
    title: "Mascarade",
    genre: "Comedy, Drama",
    rating: 4,
    poster: mascaradePoster
  },
  {
    id: 4,
    title: "The Ritual Killer",
    genre: "Mystery, Action Thriller",
    rating: 3,
    poster: ritualKillerPoster
  }
];

export function CenterPanel({ theme, toggleTheme }: { 
  theme: string; 
  toggleTheme: () => void; 
}) {
  const { user } = useUser();
  const [show3DTheater, setShow3DTheater] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ city: "Mumbai", state: "Maharashtra" });
  
  if (show3DTheater) {
    return <Theater3D onBack={() => setShow3DTheater(false)} />;
  }

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">{/* Added max-width constraint */}
      {/* Header with Search and Top-Right Elements */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
        {/* Glassmorphic Search Bar */}
        <div className="relative w-full lg:w-auto glass-searchbar xl:w-[600px] lg:w-[400px] max-w-full h-10" style={{background: 'rgba(255,255,255,0.015)', minHeight: 40, paddingTop: 0, paddingBottom: 0}}>
          <span className="search-icon">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Type to Search..."
            className="w-full h-10 rounded-xl text-cinema-text placeholder:text-cinema-text-muted bg-transparent focus:outline-none"
            style={{ paddingLeft: 36, height: 40 }}
          />
        </div>
        
        {/* Top-Right Elements Row */}
        <div className="flex items-center gap-4 flex-wrap">
          <LocationWidget onLocationChange={(city, state) => setCurrentLocation({ city, state })} />
          
          {/* Theme Toggle */}
          <div className="flex items-center gap-2 glass-card rounded-xl p-3 shadow-card">
            <Sun className={`w-4 h-4 ${theme === 'light' ? 'text-neon-green' : 'text-cinema-text-muted'}`} />
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-neon-green data-[state=unchecked]:bg-cinema-card"
            />
            <Moon className={`w-4 h-4 ${theme === 'dark' ? 'text-neon-green' : 'text-cinema-text-muted'}`} />
          </div>

          {/* Profile Section */}
          <SignedOut>
            <SignInButton>
              <Button variant="outline" className="border-neon-green text-neon-green hover:bg-neon-green hover:text-cinema-dark">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="glass-card rounded-xl p-3 shadow-card hover:shadow-glow transition-all duration-300">
              <div className="flex items-center gap-3">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                />
                <div className="hidden sm:block">
                  <div className="text-cinema-text font-semibold text-sm">
                    {user?.firstName || user?.username || 'User'}
                  </div>
                  <div className="text-cinema-text-muted text-xs">₹56.00</div>
                </div>
              </div>
            </div>
          </SignedIn>
        </div>
      </div>

      {/* Mavka Movie + Food & Drinks Horizontal Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mb-8 lg:mb-12">
        {/* Mavka Section (70%) */}
        <div className="lg:col-span-7">
          <div 
            className="relative w-full h-48 sm:h-64 lg:h-80 glass-card rounded-2xl lg:rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300"
            style={{
              backgroundImage: "url('/lovable-uploads/d33775cf-4021-4019-bc26-9117f7ac6a39.png')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-cinema-dark/80">
              <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-cinema-text mb-2 sm:mb-3 lg:mb-4">
                  Mavka: Forest Song
                </h2>
                <div className="flex gap-3">
                  <Button className="bg-neon-green hover:bg-neon-green-glow text-cinema-dark rounded-full px-4 sm:px-6 py-2 shadow-neon text-sm sm:text-base">
                    <Play className="w-4 h-4 mr-2" />
                    Watch trailer
                  </Button>
                  <Button 
                    onClick={() => setShow3DTheater(true)}
                    variant="outline" 
                    className="border-neon-green text-neon-green hover:bg-neon-green hover:text-cinema-dark rounded-full px-4 sm:px-6 py-2 text-sm sm:text-base"
                  >
                    🎭 3D Booking
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Food & Drinks Section (30%) */}
        <div className="lg:col-span-3">
          <FoodDrinksCard />
        </div>
      </div>

      {/* Nearby Theaters & Trending Movies Side by Side */}
      <div className="flex flex-col xl:flex-row gap-8 mb-12 items-stretch">
        <div className="flex-1 min-w-0 flex flex-col">
          <NearbyTheatersSection />
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <h2 className="text-xl font-bold text-cinema-text mb-6 flex items-center gap-2">
            🔥 <span className="text-neon-green">Trending</span> Now
          </h2>
          <TrendingMoviesSection />
        </div>
      </div>

      {/* All Movies Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-cinema-text mb-6">🍿 All Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div 
              key={movie.id}
              className="glass-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="aspect-[3/4] bg-cinema-card relative">
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-cinema-text font-semibold mb-1 line-clamp-2">
                  {movie.title}
                </h3>
                <p className="text-cinema-text-muted text-sm mb-2">
                  {movie.genre}
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-4 h-4 ${
                        i < movie.rating 
                          ? "text-neon-green fill-neon-green" 
                          : "text-cinema-text-muted"
                      }`}
                    />
                  ))}
                </div>
                <Button 
                  onClick={() => setShow3DTheater(true)}
                  className="w-full bg-gradient-neon hover:bg-neon-green-glow text-cinema-dark font-semibold rounded-xl"
                  size="sm"
                >
                  Book Tickets
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}