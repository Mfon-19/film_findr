import HeroSection from "@/components/hero-section";
import TopRatedCarousel from "@/components/trending-movies-carousel";
import { getTrendingMovies } from "@/lib/actions";
import React from "react";

const Page = async () => {
  const movieData = await getTrendingMovies();
  if (!movieData) return null;
  return (
    <div className="flex flex-col">
      <HeroSection movieData={movieData}/>
      <div className="bg-[#00050d]">
        <TopRatedCarousel movies={movieData} />
        <TopRatedCarousel movies={movieData} />
      </div>
    </div>
  );
};
export default Page;
