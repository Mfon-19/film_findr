import { MovieDetails as MovieDetailsType } from "@/lib/types";

interface MovieDetailsProps {
  movie: MovieDetailsType;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">
          About the Movie
        </h2>
        <p className="text-gray-300">{movie.overview}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Movie Details
        </h2>
        <dl className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 text-gray-300">
          <div>
            <dt className="font-medium text-gray-400">Release Date</dt>
            <dd>{formatDate(movie.releaseDate)}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-400">Runtime</dt>
            <dd>{formatRuntime(movie.runtime)}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-400">Genre</dt>
            <dd>{movie.genres?.join(", ") || "Not specified"}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-400">Original Language</dt>
            <dd>{movie.language}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-400">Rating</dt>
            <dd>{movie.voteAverage.toFixed(1)}/10</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-400">Adult Content</dt>
            <dd>{movie.adult ? "Yes" : "No"}</dd>
          </div>
        </dl>
      </section>
    </>
  );
}