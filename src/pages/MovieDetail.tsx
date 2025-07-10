import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { tmdbService } from "../services/tmdbService";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = Number(id);
  const [reviewExpanded, setReviewExpanded] = useState<{ [key: string]: boolean }>({});

  // Fetch all data in parallel
  const { data: details, isLoading: loadingDetails } = useQuery(["movie", movieId], () => tmdbService.getMovieDetails(movieId), { enabled: !!movieId });
  const { data: videos } = useQuery(["movieVideos", movieId], () => tmdbService.getMovieVideos(movieId), { enabled: !!movieId });
  const { data: credits } = useQuery(["movieCredits", movieId], () => tmdbService.getMovieCredits(movieId), { enabled: !!movieId });
  const { data: reviews } = useQuery(["movieReviews", movieId], () => tmdbService.getMovieReviews(movieId), { enabled: !!movieId });
  const { data: recommendations } = useQuery(["movieRecs", movieId], () => tmdbService.getMovieRecommendations(movieId), { enabled: !!movieId });

  if (loadingDetails) return <div className="flex justify-center items-center min-h-screen text-cinema-text">Loading...</div>;
  if (!details) return <div className="flex justify-center items-center min-h-screen text-cinema-text">Movie not found.</div>;

  // Find trailer
  const trailer = videos?.results?.find((v: any) => v.type === "Trailer" && v.site === "YouTube");
  // Top 6 cast
  const topCast = credits?.cast?.slice(0, 6) || [];
  // Recommendations
  const recs = recommendations?.results?.slice(0, 8) || [];

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 text-cinema-text">
      <Button variant="outline" className="mb-6 border-neon-green text-neon-green hover:bg-neon-green hover:text-cinema-dark" onClick={() => navigate(-1)}>
        ← Back to All Movies
      </Button>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <img
          src={tmdbService.getPosterUrl(details.poster_path)}
          alt={details.title}
          className="w-56 h-auto rounded-2xl shadow-glow mb-4 md:mb-0"
        />
        <div className="flex-1 flex flex-col gap-2">
          <h1 className="text-3xl font-bold mb-1">{details.title}</h1>
          <div className="flex flex-wrap gap-2 mb-2">
            {details.genres?.map((g: any) => (
              <span key={g.id} className="px-3 py-1 rounded-full bg-cinema-card text-neon-green text-xs font-semibold">
                {g.name}
              </span>
            ))}
          </div>
          <div className="flex gap-4 text-cinema-text-muted text-sm mb-2">
            <span>Release: {details.release_date}</span>
            <span>Runtime: {details.runtime} min</span>
            <span>IMDb: {details.vote_average?.toFixed(1)}</span>
          </div>
          {details.homepage && (
            <a href={details.homepage} target="_blank" rel="noopener noreferrer" className="text-neon-green underline text-sm mb-2">Official Website</a>
          )}
          <div className="text-cinema-text-muted text-base mb-2 line-clamp-4">{details.overview}</div>
          {trailer && (
            <Button className="bg-neon-green hover:bg-neon-green-glow text-cinema-dark rounded-full px-6 py-2 shadow-neon w-fit" onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}>
              ▶ Play Trailer
            </Button>
          )}
        </div>
      </div>
      {/* Tabs for Overview, Cast, Trailer, Reviews, Facts */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4 bg-cinema-card/80">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cast">Cast</TabsTrigger>
          {trailer && <TabsTrigger value="trailer">Trailer</TabsTrigger>}
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="facts">Facts</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="text-base leading-relaxed mb-2">{details.overview}</div>
          <div className="flex flex-wrap gap-2 mt-2">
            {details.production_companies?.map((c: any) => (
              <span key={c.id} className="text-xs text-cinema-text-muted bg-cinema-card px-2 py-1 rounded">
                {c.name}
              </span>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="cast">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {topCast.map((actor: any) => (
              <div key={actor.id} className="flex flex-col items-center bg-cinema-card rounded-xl p-2">
                <img
                  src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : '/placeholder.svg'}
                  alt={actor.name}
                  className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-neon-green"
                />
                <div className="text-xs font-semibold text-cinema-text text-center line-clamp-2">{actor.name}</div>
                <div className="text-xs text-cinema-text-muted text-center">{actor.character}</div>
              </div>
            ))}
          </div>
        </TabsContent>
        {trailer && (
          <TabsContent value="trailer">
            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-glow mb-4">
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                frameBorder="0"
                allowFullScreen
                title="Trailer"
              />
            </div>
          </TabsContent>
        )}
        <TabsContent value="reviews">
          <div className="flex flex-col gap-4">
            {reviews?.results?.length ? reviews.results.slice(0, 5).map((review: any) => (
              <div key={review.id} className="bg-cinema-card rounded-xl p-4 shadow-card">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-neon-green">{review.author}</span>
                  {review.author_details?.rating && (
                    <span className="text-xs text-cinema-text-muted">Rating: {review.author_details.rating}/10</span>
                  )}
                </div>
                <div className="text-cinema-text-muted text-sm">
                  {reviewExpanded[review.id] ? review.content : review.content.slice(0, 200)}
                  {review.content.length > 200 && (
                    <button
                      className="ml-2 text-neon-green underline text-xs"
                      onClick={() => setReviewExpanded((prev) => ({ ...prev, [review.id]: !prev[review.id] }))}
                    >
                      {reviewExpanded[review.id] ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </div>
              </div>
            )) : <div className="text-cinema-text-muted">No reviews found.</div>}
          </div>
        </TabsContent>
        <TabsContent value="facts">
          <div className="bg-cinema-card rounded-xl p-4 text-cinema-text-muted">
            <ul className="list-disc pl-6">
              <li>This movie was released in {details.release_date?.slice(0, 4)}.</li>
              <li>Original language: {details.original_language?.toUpperCase()}.</li>
              <li>Popularity score: {details.popularity}.</li>
              <li>Vote count: {details.vote_count}.</li>
              {/* Optionally, add more trivia or use AI-generated facts here. */}
            </ul>
          </div>
        </TabsContent>
      </Tabs>
      {/* Recommendations */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4 text-neon-green">You Might Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4">
          {recs.map((rec: any) => (
            <div
              key={rec.id}
              className="glass-card rounded-xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/movie/${rec.id}`)}
            >
              <img
                src={tmdbService.getPosterUrl(rec.poster_path)}
                alt={rec.title}
                className="w-full aspect-[2/3] object-cover"
              />
              <div className="p-2">
                <div className="text-cinema-text font-semibold text-sm line-clamp-2">{rec.title}</div>
                <div className="text-cinema-text-muted text-xs">{rec.release_date?.slice(0, 4)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail; 