import HeroSection from "@/components/hero-section";
import TopRatedCarousel from "@/components/top-rated-carousel";
import { movieData } from "@/lib/movie-data";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="bg-[#00050d]">
        <TopRatedCarousel movies={movieData} />
        <TopRatedCarousel movies={movieData} />
      </div>
    </div>
  );
};
export default Page;
