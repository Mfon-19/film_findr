"use client";

import { MovieResult, Show } from "@/lib/types";
import React, { useRef } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import MediaCard from "./ui/media-card";

type MediaItem = MovieResult | Show;

interface MediaCarouselProps {
  title: string;
  items: MediaItem[];
}

const MediaCarousel = ({ title, items }: MediaCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      carouselRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  const getTitle = (item: MediaItem) => {
    return "title" in item ? item.title : item.name;
  };

  const getMediaType = (item: MediaItem) => {
    return "title" in item ? "movies" : "tv";
  };

  return (
    <div className="flex flex-col gap-4 py-8 ms-[46px]">
      <h2 className="text-2xl font-semibold text-white px-6 relative z-20">
        {title}
      </h2>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-black/50 p-2 rounded-full 
                   opacity-0 hover:opacity-100 transition-opacity duration-300 
                   hover:bg-black/75 disabled:opacity-0"
          aria-label="Scroll left">
          <IoChevronBack className="h-6 w-6 text-white" />
        </button>

        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-6 py-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {items?.map((item: MediaItem) => (
            <div key={item.id} className="flex-shrink-0 w-[180px]">
              <MediaCard
                type={getMediaType(item)}
                id={item.id}
                title={getTitle(item)}
                src={item.posterPath}
                alt={item.alt || ""}
                rating={item.voteAverage}
                description={item.overview}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-black/50 p-2 rounded-full 
                   opacity-0 hover:opacity-100 transition-opacity duration-300 
                   hover:bg-black/75 disabled:opacity-0"
          aria-label="Scroll right">
          <IoChevronForward className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default MediaCarousel;
