import HeroSection from "@/components/hero-section";
import TopRatedMoviesCarousel from "@/components/top-rated-movies-carousel";
import TrendingMoviesCarousel from "@/components/trending-movies-carousel";
import { getTopRatedMovies, getTrendingMovies } from "@/lib/actions";
import React from "react";

const Page = async () => {
  const trendingMovies = await getTrendingMovies();
  const topRatedMovies = await getTopRatedMovies();
  if (!trendingMovies || !topRatedMovies) return null;

  return (
    <div className="flex flex-col">
      <HeroSection movieData={topRatedMovies} />
      <div className="bg-[#00050d]">
        <TrendingMoviesCarousel movies={trendingMovies} />
        <TopRatedMoviesCarousel movies={topRatedMovies} />
      </div>
    </div>
  );
};
export default Page;
