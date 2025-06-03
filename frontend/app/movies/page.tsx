/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import PageHeader from "@/components/page-header";
import PageFilter from "@/components/page-filter";
import MoviesGrid from "@/components/movies-grid";
import Pagination from "@/components/pagination";
import { Movie } from "@/lib/types";
import { getMovies } from "@/lib/actions";

interface MoviesPageProps {
  searchParams: {
    sortBy?: string;
    genres?: string;
    rating?: string;
    year?: string;
    language?: string;
    page?: string;
  };
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const filters = {
    sortBy: searchParams.sortBy || "popularity.desc",
    genres: searchParams.genres ? searchParams.genres.split(",") : [],
    rating: searchParams.rating ? parseFloat(searchParams.rating) : 0,
    year: searchParams.year ? parseInt(searchParams.year) : 2025,
    language: searchParams.language || "en",
    page: searchParams.page ? parseInt(searchParams.page) : 1
  };

  const filteredMovies = await getMovies(filters);
  if (!filteredMovies) throw Error();

  return (
    <main className="flex gap-8 px-4 pt-8 md:px-12">
      {/* left column */}
      <PageFilter type="movies"/>

      {/* right column */}
      <section className="flex-1">
        <PageHeader
          title="Movies"
          start={((filters.page - 1) * 20) + 1}
          end={((filters.page - 1) * 20) + filteredMovies.length}
          total={100}
        />
        <div className="mt-6 px-4 md:px-12">
          <MoviesGrid movies={filteredMovies} />
        </div>
        
        <Pagination 
          currentPage={filters.page}
          maxPages={5}
        />
      </section>
    </main>
  );
}