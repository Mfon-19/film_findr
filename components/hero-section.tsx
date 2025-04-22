import Image from "next/image";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi";
import TopRatedCarousel from "./top-rated-carousel";
import { movieData } from "@/utils/movie-data";

const HeroSection = () => {
  return (
    <main className="flex flex-col bg-black pt-20 md:pt-0">
      <section className="relative isolate flex items-center min-h-[350px] md:min-h-[420px] w-full overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <Image
          src="/interstellar_movie-wide.jpg"
          alt="Still from Interstellar"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
          priority
        />

        {/* LEFT‑TO‑RIGHT GRADIENT so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

        {/* TOP FADE GRADIENT */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent z-0" />

        {/* BOTTOM FADE GRADIENT */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-0" />

        {/* CONTENT */}
        <div className="relative z-10 ml-6 md:ml-12 max-w-screen-xl px-6 py-45 flex flex-col gap-6">
          <h1 className="text-5xl md:text-7xl font-serif font-semibold text-white leading-none">
            INTERSTELLAR
          </h1>

          <p className="max-w-lg text-sm md:text-base text-gray-300">
            The adventures of a group of explorers who make use of a newly
            discovered wormhole to surpass the limitations on human space travel
            and conquer the vast distances involved in an interstellar voyage.
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 pt-2">
            <button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 hover:cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
              <FaPlay className="h-5 w-5 shrink-0" />
              Watch
            </button>

            <button className="inline-flex items-center gap-2 rounded-md bg-gray-200/10 px-5 py-2.5 text-sm font-medium text-white ring-1 ring-inset ring-gray-200/20 hover:bg-gray-200/20 hover:cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
              <HiOutlineInformationCircle className="h-5 w-5 shrink-0" />
              More info
            </button>
          </div>
        </div>
      </section>
      <section className="-mt-12 md:-mt-16 relative z-10">
        <TopRatedCarousel movies={movieData} />
      </section>
    </main>
  );
};

export default HeroSection;
