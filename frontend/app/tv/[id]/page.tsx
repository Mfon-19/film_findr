import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoMdStar } from "react-icons/io";
import { FaPlay, FaBookmark } from "react-icons/fa";

import { movieData as showData } from "@/lib/movie-data";
import SimilarShows from "@/components/similar-shows";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const show = showData.find((m) => m.id === parseInt(params.id));
  if (!show) return { title: "Show Not Found" };
  return { title: `${show.name} | Film Findr`, description: show.overview };
}

export default function ShowPage({ params }: { params: { id: string } }) {
  const show = showData.find((m) => m.id === parseInt(params.id));
  if (!show) notFound();

  // Add default values for missing properties
  const showWithDefaults = {
    ...show,
    createdBy: show.createdBy || [{ name: "Unknown Creator" }],
    firstAirDate: show.firstAirDate || "2024",
    numberOfSeasons: show.numberOfSeasons || 1,
    numberOfEpisodes: show.numberOfEpisodes || 8,
    episodes:
      show.episodes ||
      Array.from({ length: 8 }).map((_, i) => ({
        title: `Episode ${i + 1}`,
        duration: "45m",
      })),
  };

  const creators = showWithDefaults.createdBy.map((c) => c.name).join(", ");

  return (
    <main className="relative min-h-screen bg-[#00050d]">
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src={showWithDefaults.backdropPath}
          alt={showWithDefaults.alt ?? showWithDefaults.name}
          fill
          priority
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00050d] to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end gap-8 px-8 pb-12">
          <div className="relative hidden h-72 w-48 shrink-0 overflow-hidden rounded-md shadow-xl lg:block">
            <Image
              src={showWithDefaults.posterPath}
              alt={showWithDefaults.alt ?? showWithDefaults.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <h1 className="mb-2 text-5xl font-extrabold text-white">
              {showWithDefaults.name}
            </h1>
            <p className="mb-6 text-lg text-gray-200">
              {showWithDefaults.overview}
            </p>
            <div className="mb-8 flex gap-4">
              <button className="flex items-center gap-2 rounded-md bg-white px-8 py-3 text-black">
                <FaPlay className="h-4 w-4" />
                <span className="font-semibold">Watch Now</span>
              </button>
              <button className="flex items-center gap-2 rounded-md border border-gray-500 px-8 py-3 text-white hover:border-white">
                <FaBookmark className="h-4 w-4" />
                <span className="font-semibold">Add to Watchlist</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-10 text-sm text-gray-300">
              <div className="flex items-center gap-1">
                <IoMdStar className="h-4 w-4 text-yellow-400" />
                {showWithDefaults.voteAverage.toFixed(1)}
              </div>
              <span>{showWithDefaults.firstAirDate}</span>
              <span>
                {showWithDefaults.numberOfSeasons} season
                {showWithDefaults.numberOfSeasons !== 1 && "s"}
              </span>
              <span>
                {showWithDefaults.numberOfEpisodes} episode
                {showWithDefaults.numberOfEpisodes !== 1 && "s"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 py-12">
        <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-2">
            <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
              Created by
            </h3>
            <p className="text-gray-200">{creators}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
              Genres
            </h3>
            <p className="text-gray-200">
              {showWithDefaults.genres.join(", ")}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
              First Air Date
            </h3>
            <p className="text-gray-200">{showWithDefaults.firstAirDate}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
              Seasons
            </h3>
            <p className="text-gray-200">{showWithDefaults.numberOfSeasons}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
              Episodes
            </h3>
            <p className="text-gray-200">{showWithDefaults.numberOfEpisodes}</p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-white">Season 1</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {showWithDefaults.episodes.map((episode, idx) => (
              <div key={idx} className="space-y-2 rounded-md bg-[#0f1622] p-4">
                <div className="h-40 w-full rounded-md bg-gray-800" />
                <p className="font-medium text-white">Episode {idx + 1}</p>
                <p className="text-sm text-gray-400">{episode.title}</p>
                <p className="text-xs text-gray-500">{episode.duration}</p>
              </div>
            ))}
          </div>
        </div>

        <SimilarShows currentShowId={showWithDefaults.id} />

        <div className="pt-16">
          <Link
            href="/"
            className="inline-block text-gray-400 hover:text-white">
            &larr; Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
