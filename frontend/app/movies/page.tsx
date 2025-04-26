/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { movieData } from "@/utils/movie-data";
import MoviesPageHeader from "@/components/movies-page-header";
import PageFilter from "@/components/page-filter";
import MoviesGrid from "@/components/movies-grid";
import { Movie } from "@/utils/types";

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

export default function MoviesPage() {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movieData);

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
    const filtered = movieData.filter((movie) => movie.rating >= rating);
    setFilteredMovies(filtered);
  };

  return (
    <main className="flex gap-8 px-4 pt-8 md:px-12">
      {/* left column */}
      <PageFilter onApply={applyFilters} />

      {/* right column */}
      <section className="flex-1">
        <MoviesPageHeader
          start={1}
          end={filteredMovies.length}
          total={movieData.length}
        />
        <div className="mt-6 px-4 md:px-12">
          <MoviesGrid movies={filteredMovies} />
        </div>
      </section>
    </main>
  );
}
