import HeroSection from "@/components/hero-section";
import TopRatedMoviesCarousel from "@/components/top-rated-movies-carousel";
import TopRatedShowsCarousel from "@/components/top-rated-shows";
import TrendingMoviesCarousel from "@/components/trending-movies-carousel";
import TrendingShowsCarousel from "@/components/trending-shows-carousel";
import {
  getMoviesById,
  getTopRatedMovies,
  getTopRatedShows,
  getTrendingMovies,
  getTrendingShows,
} from "@/lib/actions";
import React from "react";

const Page = async () => {
  const [trendingMovies, topRatedMovies, trendingShows, topRatedShows] =
    await Promise.all([
      await getTrendingMovies(),
      await getTopRatedMovies(),
      await getTrendingShows(),
      await getTopRatedShows(),
    ]);

  const heroMovies = trendingMovies
    ?.slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);
  const heroMoviesIds = heroMovies?.map((movie) => movie.id.toString());

  if (
    !trendingMovies ||
    !topRatedMovies ||
    !heroMoviesIds ||
    !trendingShows ||
    !topRatedShows
  )
    return null;

  const heroSectionMovies = await getMoviesById(heroMoviesIds);
  if (!heroSectionMovies) return null;

  return (
    <div className="flex flex-col">
      <HeroSection movieData={topRatedMovies} heroData={heroSectionMovies} />
      <div className="bg-[#00050d]">
        {/* TODO: The "Trending Movies" text in this component is not showing. Fix it */}
        <TrendingMoviesCarousel movies={trendingMovies} />
        <TopRatedMoviesCarousel movies={topRatedMovies} />
        <TrendingShowsCarousel shows={trendingShows} />
        <TopRatedShowsCarousel shows={topRatedShows} />
      </div>
    </div>
  );
};
export default Page;
