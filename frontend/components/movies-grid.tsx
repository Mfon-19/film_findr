"use client";

import { MovieResult } from "@/lib/types";
import MovieCard from "./movie-card";
import EntityGrid from "./entity-grid";

interface MoviesGridProps {
  movies: MovieResult[];
}

export default function MoviesGrid({ movies }: MoviesGridProps) {
  return (
    <EntityGrid
      items={movies}
      renderItem={(movie) => (
        <div key={movie.id} className="relative">
          <MovieCard
            type="movies"
            id={movie.id}
            src={movie.posterPath}
            title={movie.title}
            rating={movie.voteAverage}
            description={movie.overview}
            alt={movie.alt || "movie"}
          />
        </div>
      )}
    />
  );
}
