import { notFound } from "next/navigation";
import DetailPageLayout from "@/components/layouts/detail-page-layout";
import MovieHero from "@/components/movie/movie-hero";
import MovieDetails from "@/components/movie/movie-details";
import SimilarMedia from "@/components/similar-media";
import { getMovieById, getSimilarMovies } from "@/lib/actions";

const SIMILAR_MOVIES_LIMIT = 4;

async function getMovieData(id: string) {
  try {
    const [movie, similarMovies] = await Promise.all([
      getMovieById(id),
      getSimilarMovies(id),
    ]);

    return {
      movie,
      similarMovies: similarMovies?.slice(0, SIMILAR_MOVIES_LIMIT),
    };
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return { movie: null, similarMovies: null };
  }
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { movie, similarMovies } = await getMovieData(id);

  if (!movie) notFound();
  if (!similarMovies) throw new Error("Failed to load similar movies");

  return (
    <DetailPageLayout
      backdropPath={movie.backdropPath}
      title={movie.title}
      heroSection={<MovieHero movie={movie} />}
      detailsSection={<MovieDetails movie={movie} />}>
      <div className="mt-10 border-t border-gray-800 pt-10">
        <SimilarMedia title="Similar Movies" items={similarMovies} />
      </div>
    </DetailPageLayout>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieById(id);

  if (!movie) {
    return {
      title: "Movie Not Found",
      description: "The requested movie could not be found.",
    };
  }

  return {
    title: `${movie.title} | Film Findr`,
    description: movie.overview,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: [movie.posterPath],
    },
  };
}
