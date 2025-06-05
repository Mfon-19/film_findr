"use client";

import { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MovieResult, Show } from "@/lib/types";
import MediaCard from "./ui/media-card";
import { searchMovies, searchShows } from "@/lib/actions";
import EntityGrid from "./entity-grid";

interface SearchResults {
  movies: MovieResult[];
  shows: Show[];
}

interface SearchPageComponentProps {
  initialQuery?: string;
}

export default function SearchPageComponent({
  initialQuery = "",
}: SearchPageComponentProps) {
  console.log("Query: ", initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResults>({
    movies: [],
    shows: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "movies" | "shows">(
    "all"
  );
  const [showFilters, setShowFilters] = useState(false);

  const performSearch = async (query: string): Promise<void> => {
    if (!query.trim()) {
      setResults({ movies: [], shows: [] });
      return;
    }

    setIsLoading(true);

    const [movies, shows] = await Promise.all([
      await searchMovies(query),
      await searchShows(query),
    ]);

    if (!movies || !shows) throw new Error();

    const filteredResults: SearchResults = {
      movies,
      shows,
    };

    setResults(filteredResults);
    setIsLoading(false);
  };

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const filteredResults = (): SearchResults => {
    switch (activeFilter) {
      case "movies":
        return { movies: results.movies, shows: [] };
      case "shows":
        return { movies: [], shows: results.shows };
      default:
        return results;
    }
  };

  const totalResults = results.movies.length + results.shows.length;
  const filtered = filteredResults();

  const getMovieYear = (releaseDate: string): number | undefined => {
    if (!releaseDate) return undefined;
    return new Date(releaseDate).getFullYear();
  };

  const getShowYear = (firstAirDate: string): number | undefined => {
    if (!firstAirDate) return undefined;
    return new Date(firstAirDate).getFullYear();
  };

  return (
    <div className="min-h-screen bg-[#00050d] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies, TV shows..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>

          {/* Results Summary & Filters */}
          {searchQuery && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-gray-300">
                {isLoading ? (
                  <span>Searching...</span>
                ) : (
                  <span>
                    {totalResults > 0
                      ? `${totalResults} result${
                          totalResults !== 1 ? "s" : ""
                        } for "${searchQuery}"`
                      : `No results found for "${searchQuery}"`}
                  </span>
                )}
              </div>

              {totalResults > 0 && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-gray-300 hover:text-white hover:bg-white/20 transition-all">
                    <FunnelIcon className="h-4 w-4" />
                    Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Filter Pills */}
          {showFilters && totalResults > 0 && (
            <div className="mt-4 flex gap-3">
              {[
                { key: "all" as const, label: "All", count: totalResults },
                {
                  key: "movies" as const,
                  label: "Movies",
                  count: results.movies.length,
                },
                {
                  key: "shows" as const,
                  label: "TV Shows",
                  count: results.shows.length,
                },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter.key
                      ? "bg-blue-600 text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                  }`}>
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Search Results */}
        {!isLoading && searchQuery && (
          <>
            {/* Movies Section */}
            {filtered.movies.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Movies</h2>
                <EntityGrid
                  items={filtered.movies}
                  renderItem={(movie: MovieResult) => (
                    <MediaCard
                      key={movie.id}
                      type="movies"
                      id={movie.id}
                      src={movie.posterPath}
                      title={movie.title}
                      rating={movie.voteAverage}
                      description={movie.overview}
                      year={getMovieYear(movie.releaseDate)}
                      alt={movie.alt}
                    />
                  )}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                />
              </div>
            )}

            {/* TV Shows Section */}
            {filtered.shows.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">TV Shows</h2>
                <EntityGrid
                  items={filtered.shows}
                  renderItem={(show: Show) => (
                    <MediaCard
                      key={show.id}
                      type="tv"
                      id={show.id}
                      src={show.posterPath}
                      title={show.name}
                      rating={show.voteAverage}
                      description={show.overview}
                      alt={show.alt}
                    />
                  )}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                />
              </div>
            )}

            {/* No Results */}
            {totalResults === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">
                  No results found
                </div>
                <div className="text-gray-500 text-sm">
                  Try adjusting your search terms or browse our collections
                </div>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!searchQuery && (
          <div className="text-center py-20">
            <MagnifyingGlassIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-400 mb-2">
              Search for movies and TV shows
            </h2>
            <p className="text-gray-500">
              Discover your next favorite from thousands of titles
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
