import Link from "next/link";
import { MovieResult, Show } from "@/lib/types";
import MediaCard from "./ui/media-card";

type MediaItem = MovieResult | Show;

interface SimilarMediaProps {
  title: string;
  items: MediaItem[];
}

export default function SimilarMedia({ title, items }: SimilarMediaProps) {
  const getTitle = (item: MediaItem) => {
    return "title" in item ? item.title : item.name;
  };

  const getMediaType = (item: MediaItem) => {
    return "title" in item ? "movies" : "tv";
  };
  return (
    <div className="py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <Link
          href="/discover"
          className="text-sm text-gray-400 hover:text-white transition-colors">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="relative">
            <MediaCard
              type={getMediaType(item)}
              id={item.id}
              src={item.posterPath}
              title={getTitle(item)}
              rating={item.voteAverage}
              description={item.overview}
              alt={("alt" in item && item.alt) || "poster"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
