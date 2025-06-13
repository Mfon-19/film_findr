"use client";
import Image from "next/image";
import { useState } from "react";
import { SeasonDetails, EpisodeDetails } from "@/lib/types";
import { getImageSrc } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface ShowSeasonsProps {
  seasons: SeasonDetails[];
}

export default function ShowSeasons({ seasons }: ShowSeasonsProps) {
  const [selectedSeason, setSelectedSeason] = useState<number>(
    seasons && seasons.length > 0 ? seasons[0].seasonNumber : 1
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentSeason =
    (seasons && seasons.find((s) => s.seasonNumber === selectedSeason)) ||
    seasons?.[0];

  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  if (!seasons || seasons.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">
          Seasons & Episodes
        </h2>
        <p className="text-gray-400">No season information available.</p>
      </div>
    );
  }

  if (!currentSeason) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">
          Seasons & Episodes
        </h2>
        <p className="text-gray-400">Season data is incomplete.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Season Header */}
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-semibold text-white">
          Season {selectedSeason}
        </h2>

        {/* Season Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors">
            {isDropdownOpen ? (
              <ChevronUpIcon className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 text-gray-400" />
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 bg-gray-800 rounded-md border border-gray-700 shadow-lg z-10 min-w-32">
              {seasons.map((season) => (
                <button
                  key={season.id}
                  onClick={() => {
                    setSelectedSeason(season.seasonNumber);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors first:rounded-t-md last:rounded-b-md ${
                    season.seasonNumber === selectedSeason
                      ? "bg-gray-700 text-white"
                      : "text-gray-300"
                  }`}>
                  Season {season.seasonNumber}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Episode Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {currentSeason.episodes && currentSeason.episodes.length > 0 ? (
          currentSeason.episodes.map((episode: EpisodeDetails) => (
            <div key={episode.id} className="group cursor-pointer">
              {/* Episode Card */}
              <div className="space-y-3">
                {/* Thumbnail with Runtime Badge */}
                <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                  <Image
                    src={getImageSrc(episode.stillPath)}
                    alt={episode.name || `Episode ${episode.episodeNumber}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />

                  {/* Runtime Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {formatRuntime(episode.runtime || 0)}
                  </div>
                </div>

                {/* Metadata Block */}
                <div className="space-y-1">
                  {/* Episode Code */}
                  <p className="text-gray-400 text-sm font-medium">
                    S{selectedSeason}:E{episode.episodeNumber}
                  </p>

                  {/* Episode Title */}
                  <h3 className="text-white font-medium text-sm line-clamp-1">
                    {episode.name || `Episode ${episode.episodeNumber}`}
                  </h3>

                  {/* Synopsis Preview */}
                  <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                    {episode.overview || "No description available."}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400">
              No episodes available for this season.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
