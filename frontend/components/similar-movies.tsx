import { movieData } from "@/lib/movie-data";
import MovieCard from "./movie-card";
import Link from "next/link";

interface SimilarMoviesProps {
  currentMovieId: number;
  limit?: number;
}

export default function SimilarMovies({
  currentMovieId,
  limit = 4,
}: SimilarMoviesProps) {
  const similarMovies = movieData
    .filter((movie) => movie.id !== currentMovieId)
    .slice(0, limit);

  return (
    <div className="py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">Similar Movies</h2>
        <Link
          href="/discover"
          className="text-sm text-gray-400 hover:text-white transition-colors">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {similarMovies.map((movie) => (
          <div key={movie.id} className="relative">
            <MovieCard
              id={movie.id}
              src={movie.imgSrc}
              title={movie.title}
              rating={3}
              description={movie.overview}
              alt={movie.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
