"use client";

import { Movie } from "@/utils/types";
import MovieCard from "./movie-card";
import EntityGrid from "./entity-grid";

interface TVGridProps {
  shows: Movie[];
}

export default function TVGrid({ shows }: TVGridProps) {
  return (
    <EntityGrid
      items={shows}
      renderItem={(show) => (
        <div key={show.id} className="relative">
          <MovieCard
            src={show.imgSrc}
            title={show.title}
            rating={show.rating}
            description={show.overview}
            alt={show.alt}
          />
        </div>
      )}
    />
  );
}
