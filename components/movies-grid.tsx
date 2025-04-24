"use client";

import { Movie } from "@/utils/types";
import MovieCard from "./movie-card";

interface MoviesGridProps {
  movies: Movie[];
}

export default function MoviesGrid({ movies }: MoviesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-8">
      {movies.map((movie) => (
        <div key={movie.id} className="relative">
          <MovieCard
            src={movie.imgSrc}
            title={movie.title}
            rating={movie.rating}
            description={movie.overview}
            alt={movie.alt}
          />
        </div>
      ))}
    </div>
  );
}
