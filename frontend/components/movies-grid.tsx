"use client";

import { Movie } from "@/lib/types";
import MovieCard from "./movie-card";
import EntityGrid from "./entity-grid";

interface MoviesGridProps {
  movies: Movie[];
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
            src={movie.imgSrc}
            title={movie.title}
            rating={movie.rating}
            description={movie.overview}
            alt={movie.alt}
          />
        </div>
      )}
    />
  );
}
