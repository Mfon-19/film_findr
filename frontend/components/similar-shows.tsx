import { movieData as showData } from "@/lib/movie-data";
import MovieCard from "./movie-card";
import Link from "next/link";

interface SimilarMoviesProps {
  currentShowId: number;
  limit?: number;
}

export default function SimilarShows({
  currentShowId,
  limit = 4,
}: SimilarMoviesProps) {
  const similarShows = showData
    .filter((show) => show.id !== currentShowId)
    .slice(0, limit);

  return (
    <div className="py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">Similar TV Shows</h2>
        <Link
          href="/discover"
          className="text-sm text-gray-400 hover:text-white transition-colors">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {similarShows.map((show) => (
          <div key={show.id} className="relative">
            <MovieCard
              type="tv"
              id={show.id}
              src={show.imgSrc}
              title={show.title}
              rating={show.rating}
              description={show.overview}
              alt={show.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
