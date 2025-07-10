const TMDB_API_KEY = '02ce753f43955ce90d49adac175db8f7';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  original_language: string;
  popularity: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

class TMDBService {
  private async fetchFromTMDB(endpoint: string, params: Record<string, string | number> = {}): Promise<any> {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    url.searchParams.append('api_key', TMDB_API_KEY);
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }
    
    return response.json();
  }

  async getTrendingMovies(): Promise<Movie[]> {
    const response = await this.fetchFromTMDB('/trending/movie/day');
    return response.results.slice(0, 10);
  }

  async getPopularBollywoodMovies(): Promise<Movie[]> {
    const response = await this.fetchFromTMDB('/discover/movie', {
      region: 'IN',
      with_original_language: 'hi',
      sort_by: 'popularity.desc'
    });
    return response.results.slice(0, 10);
  }

  async getPopularHollywoodMovies(): Promise<Movie[]> {
    const response = await this.fetchFromTMDB('/discover/movie', {
      with_original_language: 'en',
      sort_by: 'popularity.desc'
    });
    return response.results.slice(0, 10);
  }

  async getMarvelMovies(): Promise<Movie[]> {
    const response = await this.fetchFromTMDB('/discover/movie', {
      with_keywords: '180547',
      sort_by: 'popularity.desc'
    });
    return response.results.slice(0, 10);
  }

  async getDCMovies(): Promise<Movie[]> {
    const response = await this.fetchFromTMDB('/discover/movie', {
      with_keywords: '8828',
      sort_by: 'popularity.desc'
    });
    return response.results.slice(0, 10);
  }

  async getF1Movies(): Promise<Movie[]> {
    const response = await this.fetchFromTMDB('/search/movie', {
      query: 'formula 1 racing',
      sort_by: 'popularity.desc'
    });
    return response.results.slice(0, 10);
  }

  async getFastFuriousMovies(): Promise<Movie[]> {
    const response = await this.fetchFromTMDB('/search/movie', {
      query: 'fast and furious',
      sort_by: 'popularity.desc'
    });
    return response.results.slice(0, 10);
  }

  async searchMovies(query: string): Promise<Movie[]> {
    const response = await this.fetchFromTMDB('/search/movie', {
      query,
      sort_by: 'popularity.desc'
    });
    return response.results.slice(0, 10);
  }

  async getGenres(): Promise<Genre[]> {
    const response = await this.fetchFromTMDB('/genre/movie/list');
    return response.genres;
  }

  async getMoviesByGenre(genreId: number): Promise<Movie[]> {
    const response = await this.fetchFromTMDB('/discover/movie', {
      with_genres: genreId.toString(),
      sort_by: 'popularity.desc'
    });
    return response.results.slice(0, 10);
  }

  getPosterUrl(posterPath: string): string {
    return posterPath ? `${TMDB_IMAGE_BASE_URL}${posterPath}` : '';
  }

  getBackdropUrl(backdropPath: string): string {
    return backdropPath ? `https://image.tmdb.org/t/p/w1280${backdropPath}` : '';
  }

  formatRating(rating: number): number {
    return Math.round((rating / 2) * 10) / 10; // Convert 10-point to 5-point scale
  }
}

export const tmdbService = new TMDBService();