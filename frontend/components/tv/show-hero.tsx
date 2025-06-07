"use client";
import Image from "next/image";
import Rating from "@/components/ui/rating";
import ActionButtons from "@/components/ui/action-buttons";
import { ShowDetails, Content } from "@/lib/types";
import { MOVIE_POSTER_PLACEHOLDER } from "@/lib/utils";
import { addToWatchlist } from "@/lib/actions";
import { toast } from "sonner";

interface ShowHeroProps {
  show: ShowDetails;
}

export default function ShowHero({ show }: ShowHeroProps) {
  const imageSrc = show.posterPath.includes("null")
    ? MOVIE_POSTER_PLACEHOLDER
    : show.posterPath;

  const formatSeasons = (count: number) => {
    return `${count} season${count !== 1 ? "s" : ""}`;
  };

  const formatEpisodes = (count: number) => {
    return `${count} episode${count !== 1 ? "s" : ""}`;
  };

  const handleAddToWatchlist = async () => {
    const content: Content = {
      id: "sho" + show.id.toString(),
      itemType: "show",
      title: show.name,
      rating: show.voteAverage,
      posterPath: show.posterPath,
      overview: show.overview.length > 100 ? show.overview.substring(0, 100) + "..." : show.overview,
      createdAt: new Date().toISOString(),
    };
    try {
      await addToWatchlist(content);
      toast.success("Added to watchlist!");
    } catch (error) {
      console.error("Failed to add to watchlist", error);
      toast.error("Failed to add to watchlist");
    }
  };

  return (
    <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end gap-8 px-8 pb-12">
      <div className="relative hidden h-72 w-48 shrink-0 overflow-hidden rounded-md shadow-xl lg:block">
        <Image
          src={imageSrc}
          alt={show.alt ?? show.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <h1 className="mb-2 text-5xl font-extrabold text-white">{show.name}</h1>

        <p className="mb-6 text-lg text-gray-200">{show.overview}</p>

        <div className="mb-8">
          <ActionButtons onBookmark={handleAddToWatchlist} />
        </div>

        <div className="flex flex-wrap gap-10 text-sm text-gray-300">
          <Rating rating={show.voteAverage} className="text-sm" />
          <span>{show.firstAirDate}</span>
          <span>{formatSeasons(show.numberOfSeasons)}</span>
          <span>{formatEpisodes(show.numberOfEpisodes)}</span>
        </div>
      </div>
    </div>
  );
}
