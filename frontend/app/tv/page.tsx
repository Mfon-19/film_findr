/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import PageFilter from "@/components/page-filter";
import TVGrid from "@/components/tv-grid";
import TvPageHeader from "@/components/tv-page-header";
import { getShows } from "@/lib/actions";
import { cookies } from "next/headers";

interface TVPageProps {
  searchParams: {
    sortBy?: string;
    genres?: string;
    rating?: string;
    year?: string;
    language?: string;
  };
}

export default async function TVPage({ searchParams }: TVPageProps) {
  const filters = {
    sortBy: searchParams.sortBy || "popularity.desc",
    genres: searchParams.genres ? searchParams.genres.split(",") : [],
    rating: searchParams.rating ? parseFloat(searchParams.rating) : 0,
    year: searchParams.year ? parseInt(searchParams.year) : 2025,
    language: searchParams.language || "en"
  };

  const filteredShows = await getShows(filters);
  if (!filteredShows) throw Error();

  return (
    <main className="flex gap-8 px-4 pt-8 md:px-12">
      {/* left column */}
      <PageFilter type="tv" />

      {/* right column */}
      <section className="flex-1">
        <TvPageHeader
          start={1}
          end={filteredShows.length || 5}
          total={filteredShows.length}
        />
        <div className="mt-6 px-4 md:px-12">
          <TVGrid shows={filteredShows} />
        </div>
      </section>
    </main>
  );
}
