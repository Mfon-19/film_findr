"use client";

import { Show } from "@/lib/types";
import React, { useRef } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import MovieCard from "./movie-card";

const TopRatedShowsCarousel = ({ shows }: { shows: Show[] }) => {
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

  return (
    <div className="flex flex-col gap-4 ms-[46px]">
      <h2 className="text-2xl font-semibold text-white px-6">Top Rated Shows</h2>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left scroll button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-black/50 p-2 rounded-full 
                   opacity-0 hover:opacity-100 transition-opacity duration-300 
                   hover:bg-black/75 disabled:opacity-0"
          aria-label="Scroll left">
          <IoChevronBack className="h-6 w-6 text-white" />
        </button>

        {/* Shows container */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-6 py-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {shows?.map((show: Show) => (
            <div key={show.id} className="flex-shrink-0 w-[180px]">
              <MovieCard
                type="tv"
                id={show.id}
                title={show.name}
                src={show.posterPath}
                alt={show.alt}
                rating={show.voteAverage}
                description={show.overview}
              />
            </div>
          ))}
        </div>

        {/* Right scroll button */}
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

export default TopRatedShowsCarousel;
