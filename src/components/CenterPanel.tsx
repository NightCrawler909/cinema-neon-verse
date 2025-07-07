import { Search, Play, Star, User, Sun, Moon, Menu } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { BottomNavigation } from "./BottomNavigation";
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
  
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-main">
      {/* Header with Search and User Info */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cinema-text-muted w-5 h-5" />
          <Input 
            placeholder="Type to Search..."
            className="w-full sm:w-80 lg:w-96 xl:w-[500px] bg-cinema-card border-0 pl-12 h-12 rounded-xl text-cinema-text placeholder:text-cinema-text-muted"
          />
        </div>
        
        {/* Theme Switcher and User Authentication Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sun className={`w-4 h-4 ${theme === 'light' ? 'text-neon-green' : 'text-cinema-text-muted'}`} />
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-neon-green data-[state=unchecked]:bg-cinema-card"
            />
            <Moon className={`w-4 h-4 ${theme === 'dark' ? 'text-neon-green' : 'text-cinema-text-muted'}`} />
          </div>
          <SignedOut>
            <SignInButton>
              <Button variant="outline" className="border-neon-green text-neon-green hover:bg-neon-green hover:text-cinema-dark">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-3">
              <span className="text-cinema-text hidden sm:inline">Hi {user?.firstName || user?.username || 'User'}!</span>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            </div>
          </SignedIn>
        </div>
      </div>

      {/* Featured Movie */}
      <div className="mb-8 lg:mb-12">
        <div 
          className="relative w-full h-48 sm:h-64 lg:h-96 bg-gradient-card rounded-2xl lg:rounded-3xl overflow-hidden shadow-card"
          style={{
            backgroundImage: "url('/lovable-uploads/d33775cf-4021-4019-bc26-9117f7ac6a39.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-dark/80 via-transparent to-cinema-dark/60">
            <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8">
              <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-cinema-text mb-2 sm:mb-3 lg:mb-4">
                Mavka: Forest Song
              </h2>
              <Button className="bg-neon-green hover:bg-neon-green-glow text-cinema-dark rounded-full px-4 sm:px-6 lg:px-8 py-2 lg:py-3 shadow-neon text-sm sm:text-base">
                <Play className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Watch the trailer
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Carousel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div 
            key={movie.id}
            className="bg-gradient-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer"
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
              <div className="flex items-center gap-1">
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
            </div>
          </div>
        ))}
      </div>

      <BottomNavigation />
    </div>
  );
}