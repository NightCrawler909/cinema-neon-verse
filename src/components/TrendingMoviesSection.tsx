import { Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { tmdbService, Movie } from "@/services/tmdbService";

export function TrendingMoviesSection() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const trendingMovies = await tmdbService.getTrendingMovies();
        setMovies(trendingMovies.slice(0, 3)); // Show only top 3
      } catch (error) {
        console.error('Failed to fetch trending movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-[200px] md:w-[200px] xl:w-[220px]">
            <div className="aspect-[3/4] bg-cinema-card rounded-xl animate-pulse mb-4"></div>
            <div className="h-4 bg-cinema-card rounded animate-pulse mb-2"></div>
            <div className="h-3 bg-cinema-card rounded animate-pulse w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
      {movies.map((movie) => (
        <Card 
          key={movie.id} 
          className="w-[200px] md:w-[200px] xl:w-[220px] glass-card border-0 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer relative flex flex-col"
        >
          {movie.popularity > 1000 && (
            <div className="absolute -top-2 -right-2 bg-gradient-neon text-cinema-dark text-xs font-bold px-2 py-1 rounded-full z-10">
              HOT 🔥
            </div>
          )}
          <CardContent className="p-0 flex-1 flex flex-col">
            <div className="aspect-[3/4] bg-cinema-card relative rounded-t-xl overflow-hidden">
              <img 
                src={tmdbService.getPosterUrl(movie.poster_path) || '/placeholder.svg'} 
                alt={movie.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
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
                  {new Date(movie.release_date).getFullYear()} • {movie.original_language.toUpperCase()}
                </p>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.round(movie.vote_average / 2) 
                          ? "text-neon-green fill-neon-green" 
                          : "text-cinema-text-muted"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-cinema-text-muted ml-1">
                    ({tmdbService.formatRating(movie.vote_average)})
                  </span>
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