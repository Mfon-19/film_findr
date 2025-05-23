import MovieCard from "./movie-card";
import Link from "next/link";
import { MovieResult } from "@/lib/types";

export default async function SimilarMovies({ similarMovies }: { similarMovies: MovieResult[] }) {
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
              type="shows"
              id={movie.id}
              src={movie.posterPath}
              title={movie.title}
              rating={movie.voteAverage}
              description={movie.overview}
              alt={movie.alt || "movie poster"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
