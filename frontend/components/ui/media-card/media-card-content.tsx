"use client";

import { BasicInfo } from "./basic-info";
import { PosterImage } from "./poster-image";
import { HoverDetailPanel } from "./hover-detail-panel";
import { MediaCardContentProps, Content } from "@/lib/types";
import { addToWatchlist } from "@/lib/actions";

export function MediaCardContent({
  type,
  id,
  src,
  title,
  rating,
  description = "No description available.",
  alt,
  displayYear,
  imageSrc,
}: MediaCardContentProps) {
  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Playing ${type}: ${title}`);
  };

  const handleAddClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!id) {
      console.error("No ID provided for watchlist item");
      return;
    }
    const content: Content = {
      id: id.toString(),
      itemType: type,
      title,
      rating,
      posterPath: src,
      overview: description,
      createdAt: new Date().toISOString(),
    };
    try {
      await addToWatchlist(content);
      console.log(`Adding ${type} to watchlist: ${title}`);
    } catch (error) {
      console.error("Failed to add to watchlist", error);
    }
  };

  return (
    <div className="group relative w-full cursor-pointer">
      {/* Visible Card Area */}
      <div className="overflow-hidden rounded-md shadow-md transition-all duration-300 ease-in-out group-hover:shadow-xl">
        <PosterImage src={imageSrc} alt={alt || `${title} poster`} />
      </div>

      {/* Basic Info */}
      <BasicInfo title={title} displayYear={displayYear} rating={rating} />

      {/* Hover Detail Panel */}
      <HoverDetailPanel
        imageSrc={imageSrc}
        alt={alt || `${title} poster`}
        title={title}
        rating={rating}
        displayYear={displayYear}
        description={description}
        type={type}
        onPlayClick={handlePlayClick}
        onAddClick={handleAddClick}
      />
    </div>
  );
}
