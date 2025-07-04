import { Search, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export function CenterPanel() {
  return (
    <div className="flex-1 p-8 bg-gradient-main">
      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cinema-text-muted w-5 h-5" />
        <Input 
          placeholder="Type to Search..."
          className="w-full max-w-md mx-auto block bg-cinema-card border-0 pl-12 h-12 rounded-xl text-cinema-text placeholder:text-cinema-text-muted"
        />
      </div>

      {/* Featured Movie */}
      <div className="mb-12">
        <div 
          className="relative w-full h-96 bg-gradient-card rounded-3xl overflow-hidden shadow-card"
          style={{
            backgroundImage: "url('/lovable-uploads/d33775cf-4021-4019-bc26-9117f7ac6a39.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-dark/80 via-transparent to-cinema-dark/60">
            <div className="absolute bottom-8 left-8">
              <h2 className="text-4xl font-bold text-cinema-text mb-4">
                Mavka: Forest Song
              </h2>
              <Button className="bg-neon-green hover:bg-neon-green-glow text-cinema-dark rounded-full px-8 shadow-neon">
                <Play className="w-5 h-5 mr-2" />
                Watch the trailer
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Carousel */}
      <div className="grid grid-cols-4 gap-6">
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
    </div>
  );
}