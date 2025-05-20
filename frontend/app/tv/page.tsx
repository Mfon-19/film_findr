/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { movieData as tvData } from "@/lib/movie-data";
import PageFilter from "@/components/page-filter";
import TVGrid from "@/components/tv-grid";
import { Movie, Show } from "@/lib/types";
import TvPageHeader from "@/components/tv-page-header";

type Genre =
  | "Action"
  | "Adventure"
  | "Animation"
  | "Comedy"
  | "Crime"
  | "Documentary"
  | "Drama"
  | "Family"
  | "Fantasy"
  | "History"
  | "Horror"
  | "Music"
  | "Mystery"
  | "Romance"
  | "Science Fiction"
  | "Thriller"
  | "War"
  | "Western";

export default function TVPage() {
  const [filteredShows, setFilteredShows] = useState<Show[]>();

  const applyFilters = ({
    sortBy,
    genres,
    rating,
    year,
    language,
  }: {
    sortBy: string;
    genres: Genre[];
    rating: number;
    year: number;
    language: string;
  }) => {
    const filtered = tvData.filter((show) => show.rating >= rating);
    setFilteredShows(filtered);
  };

  return (
    <main className="flex gap-8 px-4 pt-8 md:px-12">
      {/* left column */}
      <PageFilter onApply={applyFilters} />

      {/* right column */}
      <section className="flex-1">
        <TvPageHeader
          start={1}
          end={filteredShows.length}
          total={tvData.length}
        />
        <div className="mt-6 px-4 md:px-12">
          <TVGrid shows={filteredShows} />
        </div>
      </section>
    </main>
  );
}
