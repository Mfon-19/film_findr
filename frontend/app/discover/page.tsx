import HeroSection from "@/components/hero-section";
import MediaCarousel from "@/components/media-carousel";
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
    throw new Error();

  const heroSectionMovies = await getMoviesById(heroMoviesIds);
  if (!heroSectionMovies) throw new Error();

  return (
    <div className="flex flex-col">
      <HeroSection movieData={topRatedMovies} heroData={heroSectionMovies} />
      <div className="bg-[#00050d]">
        <MediaCarousel title="Trending Movies" items={trendingMovies} />
        <MediaCarousel title="Top Rated Movies" items={topRatedMovies} />
        <MediaCarousel title="Trending Shows" items={trendingShows} />
        <MediaCarousel title="Top Rated Shows" items={topRatedShows} />
      </div>
    </div>
  );
};
export default Page;
