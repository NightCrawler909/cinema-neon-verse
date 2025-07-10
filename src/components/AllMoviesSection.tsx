import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { tmdbService, Movie } from "@/services/tmdbService";

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  loading: boolean;
}

function MovieCarousel({ title, movies, loading }: MovieCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 300;
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  if (loading) {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-bold text-cinema-text mb-4">{title}</h3>
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex-shrink-0 w-[180px]">
              <div className="aspect-[3/4] bg-cinema-card rounded-xl animate-pulse mb-2"></div>
              <div className="h-4 bg-cinema-card rounded animate-pulse mb-1"></div>
              <div className="h-3 bg-cinema-card rounded animate-pulse w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-cinema-text">{title}</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('left')}
            className="border-cinema-card text-cinema-text hover:bg-cinema-card"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('right')}
            className="border-cinema-card text-cinema-text hover:bg-cinema-card"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map((movie) => (
          <Card 
            key={movie.id}
            className="flex-shrink-0 w-[180px] glass-card border-0 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <CardContent className="p-0">
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
              <div className="p-3 space-y-2">
                <h4 className="font-semibold text-cinema-text text-sm line-clamp-2 leading-tight">
                  {movie.title}
                </h4>
                <p className="text-cinema-text-muted text-xs">
                  {new Date(movie.release_date).getFullYear()} • {movie.original_language.toUpperCase()}
                </p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-2.5 h-2.5 ${
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
    </div>
  );
}

export function AllMoviesSection() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [bollywoodMovies, setBollywoodMovies] = useState<Movie[]>([]);
  const [hollywoodMovies, setHollywoodMovies] = useState<Movie[]>([]);
  const [marvelMovies, setMarvelMovies] = useState<Movie[]>([]);
  const [dcMovies, setDCMovies] = useState<Movie[]>([]);
  const [fastFuriousMovies, setFastFuriousMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const [trending, bollywood, hollywood, marvel, dc, fastFurious] = await Promise.all([
          tmdbService.getTrendingMovies(),
          tmdbService.getPopularBollywoodMovies(),
          tmdbService.getPopularHollywoodMovies(),
          tmdbService.getMarvelMovies(),
          tmdbService.getDCMovies(),
          tmdbService.getFastFuriousMovies()
        ]);

        setTrendingMovies(trending);
        setBollywoodMovies(bollywood);
        setHollywoodMovies(hollywood);
        setMarvelMovies(marvel);
        setDCMovies(dc);
        setFastFuriousMovies(fastFurious);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  return (
    <div className="space-y-8">
      <MovieCarousel 
        title="🔥 Trending Now" 
        movies={trendingMovies} 
        loading={loading} 
      />
      <MovieCarousel 
        title="🇮🇳 Popular Bollywood" 
        movies={bollywoodMovies} 
        loading={loading} 
      />
      <MovieCarousel 
        title="🇺🇸 Hollywood Blockbusters" 
        movies={hollywoodMovies} 
        loading={loading} 
      />
      <MovieCarousel 
        title="🦸‍♂️ Marvel Universe" 
        movies={marvelMovies} 
        loading={loading} 
      />
      <MovieCarousel 
        title="🦇 DC Comics" 
        movies={dcMovies} 
        loading={loading} 
      />
      <MovieCarousel 
        title="🏎️ Fast & Furious Franchise" 
        movies={fastFuriousMovies} 
        loading={loading} 
      />
    </div>
  );
}