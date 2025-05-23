import MovieCard from "./movie-card";
import Link from "next/link";
import { Show } from "@/lib/types";

export default function SimilarShows({
  similarShows,
}: {
  similarShows: Show[];
}) {
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
              src={show.posterPath}
              title={show.name}
              rating={show.voteAverage}
              description={show.overview}
              alt={show.alt || "show poster"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
