import HeroSection from "@/components/hero-section";
import TopRatedMoviesCarousel from "@/components/top-rated-movies-carousel";
import TrendingMoviesCarousel from "@/components/trending-movies-carousel";
import {
  getMoviesById,
  getTopRatedMovies,
  getTrendingMovies,
} from "@/lib/actions";
import React from "react";

const Page = async () => {
  const trendingMovies = await getTrendingMovies();
  const topRatedMovies = await getTopRatedMovies();

  const heroMovies = trendingMovies
    ?.slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);
  const heroMoviesIds = heroMovies?.map((movie) => movie.id.toString());

  if (!trendingMovies || !topRatedMovies || !heroMoviesIds) return null;

  const heroSectionMovies = await getMoviesById(heroMoviesIds);
  if (!heroSectionMovies) return null;

  return (
    <div className="flex flex-col">
      <HeroSection movieData={topRatedMovies} heroData={heroSectionMovies} />
      <div className="bg-[#00050d]">
        <TrendingMoviesCarousel movies={trendingMovies} />
        <TopRatedMoviesCarousel movies={topRatedMovies} />
      </div>
    </div>
  );
};
export default Page;
