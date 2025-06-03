"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { MovieDetails, MovieResult } from "@/lib/types";
import TopRatedMoviesCarousel from "./top-rated-movies-carousel";

export interface HeroSectionProps {
  movieData: MovieResult[];
  heroData: MovieDetails[];
}

const HeroSection = (props: HeroSectionProps) => {
  const movieData = props.movieData;
  const heroData = props.heroData;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentFeature = heroData[currentIndex];

  const rotateFeature = (index?: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (typeof index === "number") {
        setCurrentIndex(index);
      } else {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroData.length);
      }
      setIsTransitioning(false);
    }, 1500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      rotateFeature();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col bg-[#00050d] pt-20 md:pt-0">
      <section className="relative isolate flex items-center min-h-[350px] md:min-h-[420px] w-full overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <div
          className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out transform ${
            isTransitioning ? "opacity-0 scale-110" : "opacity-100 scale-100"
          }`}>
          <Image
            src={currentFeature.backdropPath}
            alt={currentFeature.alt || "movie poster image"}
            className="absolute inset-0 h-full w-full object-cover"
            width={1920}
            height={1080}
            priority
          />
        </div>

        {/* LEFT‑TO‑RIGHT GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00050d] via-[#00050d]/60 to-transparent" />

        {/* TOP FADE GRADIENT */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#00050d] to-transparent z-0" />

        {/* BOTTOM FADE GRADIENT */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#00050d] to-transparent z-0" />

        {/* CONTENT */}
        <div className="relative z-10 ml-6 md:ml-12 max-w-screen-xl px-6 py-45 flex flex-col gap-6">
          <div
            className={`transition-all duration-1000 transform ${
              isTransitioning
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            }`}>
            <h1 className="text-5xl md:text-7xl font-serif font-semibold text-white leading-none">
              {currentFeature.title}
            </h1>

            <p className="max-w-lg text-sm md:text-base text-gray-300 mt-6">
              {currentFeature.overview}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 pt-6">
              <button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 hover:cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                <FaPlay className="h-5 w-5 shrink-0" />
                Watch
              </button>

              <button
                onClick={() => window.location.href = `/movies/${currentFeature.id}`}
                className="inline-flex items-center gap-2 rounded-md bg-gray-200/10 px-5 py-2.5 text-sm font-medium text-white ring-1 ring-inset ring-gray-200/20 hover:bg-gray-200/20 hover:cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
                <HiOutlineInformationCircle className="h-5 w-5 shrink-0" />
                More info
              </button>
            </div>

            {/* Navigation dots */}
            <div className="flex gap-2 mt-8">
              {heroData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => rotateFeature(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? "bg-white w-6"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Show ${heroData[index].title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-12 md:-mt-16 relative z-1">
        {/* <TopRatedMoviesCarousel movies={movieData} /> */}
      </section>
    </main>
  );
};

export default HeroSection;
