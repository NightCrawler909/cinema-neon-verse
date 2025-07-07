import React from "react";
import { ArrowLeft, Heart, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BottomNavigation } from "@/components/BottomNavigation";
import shazamPoster from "@/assets/shazam-poster.jpg";
import screamPoster from "@/assets/scream-poster.jpg";
import mascaradePoster from "@/assets/mascarade-poster.jpg";
import ritualKillerPoster from "@/assets/ritual-killer-poster.jpg";

const favouriteMovies = [
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

const Favourites = () => {
  const removeFavourite = (id: number) => {
    // Handle remove favourite logic
    console.log("Remove favourite:", id);
  };

  return (
    <div className="min-h-screen bg-gradient-main pb-20 lg:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-cinema-sidebar/80 backdrop-blur-md border-b border-cinema-card">
        <div className="flex items-center gap-4 p-4 lg:p-6">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-cinema-text hover:bg-cinema-card">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl lg:text-2xl font-bold text-cinema-text">My Favourites</h1>
        </div>
      </div>

      <div className="p-4 lg:p-8 max-w-6xl mx-auto">
        {favouriteMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favouriteMovies.map((movie) => (
              <Card key={movie.id} className="bg-gradient-card border-0 shadow-card hover:shadow-glow transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4] bg-cinema-card rounded-t-lg overflow-hidden">
                    <img 
                      src={movie.poster} 
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <Button 
                        className="bg-neon-green hover:bg-neon-green-glow text-cinema-dark rounded-full px-4 py-2 shadow-neon"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Watch Trailer
                      </Button>
                    </div>
                    
                    {/* Heart icon */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-red-500 hover:bg-black/20"
                      onClick={() => removeFavourite(movie.id)}
                    >
                      <Heart className="w-5 h-5 fill-red-500" />
                    </Button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-cinema-text font-semibold mb-1 line-clamp-2 text-sm lg:text-base">
                      {movie.title}
                    </h3>
                    <p className="text-cinema-text-muted text-xs lg:text-sm mb-2">
                      {movie.genre}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-3 h-3 lg:w-4 lg:h-4 ${
                              i < movie.rating 
                                ? "text-neon-green fill-neon-green" 
                                : "text-cinema-text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:bg-red-500/10 text-xs lg:text-sm px-2"
                          onClick={() => removeFavourite(movie.id)}
                        >
                          Remove
                        </Button>
                        <Button
                          size="sm"
                          className="bg-neon-green hover:bg-neon-green-glow text-cinema-dark text-xs lg:text-sm px-3"
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-cinema-text-muted mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-cinema-text mb-2">No Favourites Yet</h2>
            <p className="text-cinema-text-muted mb-6">
              Start adding movies to your favourites to see them here
            </p>
            <Link to="/">
              <Button className="bg-neon-green hover:bg-neon-green-glow text-cinema-dark">
                Browse Movies
              </Button>
            </Link>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Favourites;