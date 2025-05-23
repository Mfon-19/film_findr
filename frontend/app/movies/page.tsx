/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import { movieData } from "@/lib/movie-data";
import MoviesPageHeader from "@/components/movies-page-header";
import PageFilter from "@/components/page-filter";
import MoviesGrid from "@/components/movies-grid";
import { Movie } from "@/lib/types";
import { getMovies } from "@/lib/actions";

export default async function MoviesPage() {
  const filteredMovies = await getMovies();
  if (!filteredMovies) throw Error();

  return (
    <main className="flex gap-8 px-4 pt-8 md:px-12">
      {/* left column */}
      <PageFilter />

      {/* right column */}
      <section className="flex-1">
        <MoviesPageHeader
          start={1}
          end={filteredMovies?.length || 5}
          total={movieData.length}
        />
        <div className="mt-6 px-4 md:px-12">
          <MoviesGrid movies={filteredMovies} />
        </div>
      </section>
    </main>
  );
}
