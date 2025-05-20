import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoMdStar } from "react-icons/io";
import { FaPlay, FaBookmark } from "react-icons/fa";
import SimilarShows from "@/components/similar-shows";
import { getShowById } from "@/lib/actions";
import { ShowDetails } from "@/lib/types";

async function getShow(id: string): Promise<ShowDetails> {
  const show = await getShowById(id);
  if (!show) throw new Error("Show not found");
  return show;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = params.id;
  const show = await getShow(id);
  if (!show) return { title: "Show Not Found" };
  return { 
    title: `${show.name} | Film Findr`, 
    description: show.overview 
  };
}

export default async function ShowPage({ params }: { params: { id: string } }) {
  const id = await params.id;
  const show = await getShow(id)
  if (!show) notFound();

  const creators =
    show.createdBy?.map((c: { name: string }) => c.name).join(", ") ??
    "Unknown";

  return (
    <main className="relative min-h-screen bg-[#00050d]">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#00050d] to-transparent z-10" />
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src={show.backdropPath}
          alt={show.alt ?? show.name}
          fill
          priority
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00050d] to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end gap-8 px-8 pb-12">
          <div className="relative hidden h-72 w-48 shrink-0 overflow-hidden rounded-md shadow-xl lg:block">
            <Image
              src={show.posterPath}
              alt={show.alt ?? show.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <h1 className="mb-2 text-5xl font-extrabold text-white">
              {show.name}
            </h1>
            <p className="mb-6 text-lg text-gray-200">{show.overview}</p>
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
                {show.voteAverage.toFixed(1)}
              </div>
              <span>{show.firstAirDate}</span>
              <span>
                {show.numberOfSeasons} season{show.numberOfSeasons !== 1 && "s"}
              </span>
              <span>
                {show.numberOfEpisodes} episode
                {show.numberOfEpisodes !== 1 && "s"}
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
            <p className="text-gray-200">{show.genres.join(", ")}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
              First Air Date
            </h3>
            <p className="text-gray-200">{show.firstAirDate}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
              Seasons
            </h3>
            <p className="text-gray-200">{show.numberOfSeasons}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
              Episodes
            </h3>
            <p className="text-gray-200">{show.numberOfEpisodes}</p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-white">Season 1</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {(show.episodes || Array.from({ length: 8 })).map(
              (_: any, idx: number) => (
                <div
                  key={idx}
                  className="space-y-2 rounded-md bg-[#0f1622] p-4">
                  <div className="h-40 w-full rounded-md bg-gray-800" />
                  <p className="font-medium text-white">Episode {idx + 1}</p>
                  <p className="text-sm text-gray-400">Episode Title</p>
                  <p className="text-xs text-gray-500">45m</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* <SimilarShows currentShowId={show.id} /> */}

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
