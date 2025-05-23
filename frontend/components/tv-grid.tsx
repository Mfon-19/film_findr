"use client";

import { Show } from "@/lib/types";
import MovieCard from "./movie-card";
import EntityGrid from "./entity-grid";

interface TVGridProps {
  shows: Show[];
}

export default function TVGrid({ shows }: TVGridProps) {
  return (
    <EntityGrid
      items={shows}
      renderItem={(show) => (
        <div key={show.id} className="relative">
          <MovieCard
            type="tv"
            id={show.id}
            src={show.posterPath}
            title={show.name}
            rating={show.voteAverage}
            description={show.overview}
            alt={show.alt || "show"}
          />
        </div>
      )}
    />
  );
}
