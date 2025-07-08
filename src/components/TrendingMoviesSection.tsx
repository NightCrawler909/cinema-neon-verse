import { Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import shazamPoster from "@/assets/shazam-poster.jpg";
import screamPoster from "@/assets/scream-poster.jpg";
import mascaradePoster from "@/assets/mascarade-poster.jpg";
import ritualKillerPoster from "@/assets/ritual-killer-poster.jpg";

const trendingMovies = [
  {
    id: 1,
    title: "Oppenheimer",
    genre: "Biography, Drama",
    rating: 5,
    poster: shazamPoster,
    isHot: true
  },
  {
    id: 2,
    title: "Barbie",
    genre: "Comedy, Adventure",
    rating: 4,
    poster: screamPoster,
    isHot: true
  },
  {
    id: 3,
    title: "Spider-Man: Across",
    genre: "Animation, Action",
    rating: 5,
    poster: mascaradePoster,
    isHot: false
  },
  {
    id: 4,
    title: "Fast X",
    genre: "Action, Crime",
    rating: 4,
    poster: ritualKillerPoster,
    isHot: false
  },
  {
    id: 5,
    title: "Guardians Galaxy 3",
    genre: "Action, Adventure",
    rating: 4,
    poster: shazamPoster,
    isHot: true
  },
  {
    id: 6,
    title: "John Wick 4",
    genre: "Action, Crime",
    rating: 5,
    poster: screamPoster,
    isHot: false
  },
  {
    id: 7,
    title: "The Flash",
    genre: "Action, Adventure",
    rating: 3,
    poster: mascaradePoster,
    isHot: false
  },
  {
    id: 8,
    title: "Transformers: Rise",
    genre: "Action, Sci-Fi",
    rating: 4,
    poster: ritualKillerPoster,
    isHot: true
  }
];

export function TrendingMoviesSection() {
  // Show only top 3 trending movies
  const topTrendingMovies = trendingMovies.slice(0, 3);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
      {topTrendingMovies.map((movie) => (
        <Card 
          key={movie.id} 
          className="w-[200px] md:w-[200px] xl:w-[220px] glass-card border-0 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer relative flex flex-col"
        >
          {movie.isHot && (
            <div className="absolute -top-2 -right-2 bg-gradient-neon text-cinema-dark text-xs font-bold px-2 py-1 rounded-full z-10">
              HOT 🔥
            </div>
          )}
          <CardContent className="p-0 flex-1 flex flex-col">
            <div className="aspect-[3/4] bg-cinema-card relative rounded-t-xl overflow-hidden">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <Button 
                  size="sm"
                  className="bg-neon-green hover:bg-neon-green-glow text-cinema-dark rounded-full shadow-neon"
                >
                  <Play className="w-3 h-3 mr-1" />
                  Trailer
                </Button>
              </div>
            </div>
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-cinema-text line-clamp-2 leading-tight mb-1">
                  {movie.title}
                </h3>
                <p className="text-cinema-text-muted text-xs mb-2">
                  {movie.genre}
                </p>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-3 h-3 ${
                        i < movie.rating 
                          ? "text-neon-green fill-neon-green" 
                          : "text-cinema-text-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <Button 
                className="w-full bg-gradient-neon hover:bg-neon-green-glow text-cinema-dark font-semibold rounded-xl mt-2"
                size="sm"
              >
                Book Now
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}