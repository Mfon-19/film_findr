"use client";

import { Movie } from "@/utils/types";
import React, { useRef } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import MovieCard from "./movie-card";

const TopRatedCarousel = ({ movies }: { movies: Movie[] }) => {
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
      <h2 className="text-2xl font-semibold text-white px-6">Top Rated</h2>

      {/* Carousel Container */}
      <div className="group relative">
        {/* Left scroll button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-black/50 p-2 rounded-full 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                   hover:bg-black/75 disabled:opacity-0"
          aria-label="Scroll left">
          <IoChevronBack className="h-6 w-6 text-white" />
        </button>

        {/* Movies container */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-6 py-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {movies?.map((movie: Movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              src={movie.imgSrc}
              alt={movie.alt}
              rating={movie.rating}
            />
          ))}
        </div>

        {/* Right scroll button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-black/50 p-2 rounded-full 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                   hover:bg-black/75 disabled:opacity-0"
          aria-label="Scroll right">
          <IoChevronForward className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default TopRatedCarousel;
