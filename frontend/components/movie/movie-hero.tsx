"use client";
import Image from "next/image";
import Rating from "@/components/ui/rating";
import ActionButtons from "@/components/ui/action-buttons";
import { MovieDetails, Content } from "@/lib/types";
import { addToWatchlist } from "@/lib/actions";
import { toast } from "sonner";

interface MovieHeroProps {
  movie: MovieDetails;
}

export default function MovieHero({ movie }: MovieHeroProps) {
  const releaseYear = new Date(movie.releaseDate).getFullYear();
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;

  const handleAddToWatchlist = async () => {
    const content: Content = {
      id: movie.id.toString(),
      itemType: "movie",
      title: movie.title,
      rating: movie.voteAverage,
      posterPath: movie.posterPath,
      overview: movie.overview,
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
    <div className="absolute bottom-0 left-0 right-0 p-8">
      <div className="container mx-auto flex flex-col md:flex-row gap-8 items-end">
        <div className="relative h-64 w-44 overflow-hidden rounded-md shadow-xl hidden md:block">
          <Image
            src={movie.posterPath}
            alt={movie.alt}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>

          <div className="flex items-center gap-2 mb-4">
            <Rating rating={movie.voteAverage} />
            <span className="text-gray-400">
              • {releaseYear} • {hours}h {minutes}m
            </span>
          </div>

          <p className="text-lg text-gray-200 mb-6 max-w-3xl">
            {movie.overview}
          </p>

          <ActionButtons onBookmark={handleAddToWatchlist} />
        </div>
      </div>
    </div>
  );
}
