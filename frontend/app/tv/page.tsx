/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import PageFilter from "@/components/page-filter";
import TVGrid from "@/components/tv-grid";
import TvPageHeader from "@/components/tv-page-header";
import { getShows } from "@/lib/actions";
import Pagination from "@/components/pagination";
import PageHeader from "@/components/page-header";

interface TVPageProps {
  searchParams: {
    sortBy?: string;
    genres?: string;
    rating?: string;
    year?: string;
    language?: string;
    page?: string;
  };
}

export default async function TVPage({ searchParams }: TVPageProps) {
  const filters = {
    sortBy: searchParams.sortBy || "popularity.desc",
    genres: searchParams.genres ? searchParams.genres.split(",") : [],
    rating: searchParams.rating ? parseFloat(searchParams.rating) : 0,
    year: searchParams.year ? parseInt(searchParams.year) : 2025,
    language: searchParams.language || "en",
    page: searchParams.page ? parseInt(searchParams.page) : 1,
  };

  const filteredShows = await getShows(filters);
  if (!filteredShows) throw Error();

  return (
    <main className="flex gap-8 px-4 pt-8 md:px-12">
      {/* left column */}
      <PageFilter type="tv" />

      {/* right column */}
      <section className="flex-1">
        <PageHeader
          title="TV Shows"
          start={(filters.page - 1) * 20 + 1}
          end={(filters.page - 1) * 20 + filteredShows.length}
          total={100}
        />
        <div className="mt-6 px-4 md:px-12">
          <TVGrid shows={filteredShows} />
        </div>
        <Pagination currentPage={filters.page} maxPages={5} />
      </section>
    </main>
  );
}
