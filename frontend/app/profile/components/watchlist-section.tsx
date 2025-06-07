"use client";

import { useState } from "react";
import {
  BookmarkIcon,
  FilmIcon,
  TvIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import MediaCard from "@/components/ui/media-card";
import { Content } from "@/lib/types";

interface WatchlistSectionProps {
  watchlistMovies: Content[];
  watchlistShows: Content[];
}

export default function WatchlistSection({
  watchlistMovies,
  watchlistShows,
}: WatchlistSectionProps) {
  const [activeTab, setActiveTab] = useState<"all" | "movies" | "shows">("all");

  const totalItems = watchlistMovies.length + watchlistShows.length;

  const getDisplayedItems = () => {
    switch (activeTab) {
      case "movies":
        return { movies: watchlistMovies, shows: [] };
      case "shows":
        return { movies: [], shows: watchlistShows };
      default:
        return { movies: watchlistMovies, shows: watchlistShows };
    }
  };

  const { movies, shows } = getDisplayedItems();

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookmarkIcon className="h-6 w-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">My Watchlist</h2>
          <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full text-sm font-medium">
            {totalItems} items
          </span>
        </div>

        {/* Add to Watchlist Button */}
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
          <PlusIcon className="h-4 w-4" />
          Add Items
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "all"
              ? "bg-white/10 text-white"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          All ({totalItems})
        </button>
        <button
          onClick={() => setActiveTab("movies")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "movies"
              ? "bg-white/10 text-white"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <FilmIcon className="h-4 w-4" />
          Movies ({watchlistMovies.length})
        </button>
        <button
          onClick={() => setActiveTab("shows")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "shows"
              ? "bg-white/10 text-white"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <TvIcon className="h-4 w-4" />
          TV Shows ({watchlistShows.length})
        </button>
      </div>

      {/* Watchlist Content */}
      {totalItems === 0 ? (
        // Empty State
        <div className="text-center py-16">
          <div className="bg-white/5 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <BookmarkIcon className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Your watchlist is empty
          </h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Start building your watchlist by adding movies and TV shows you want
            to watch later.
          </p>
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors mx-auto">
            <MagnifyingGlassIcon className="h-4 w-4" />
            Discover Content
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Movies Section */}
          {movies.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FilmIcon className="h-5 w-5 text-blue-400" />
                Movies
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {movies.map((movie) => (
                  <MediaCard
                    key={`movie-${movie.id}`}
                    type="movies"
                    id={parseInt(movie.id)}
                    src={movie.posterPath}
                    title={movie.title}
                    rating={movie.rating}
                    description={movie.overview}
                    alt={movie.title}
                  />
                ))}
              </div>
            </div>
          )}

          {/* TV Shows Section */}
          {shows.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TvIcon className="h-5 w-5 text-blue-400" />
                TV Shows
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {shows.map((show) => (
                  <MediaCard
                    key={`show-${show.id}`}
                    type="tv"
                    id={parseInt(show.id)}
                    src={show.posterPath}
                    title={show.title}
                    rating={show.rating}
                    description={show.overview}
                    alt={show.title}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
