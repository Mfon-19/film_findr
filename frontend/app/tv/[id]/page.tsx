import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { FaPlay, FaBookmark } from "react-icons/fa";
import { movieData as showData } from "@/utils/movie-data";
import Link from "next/link";
import { notFound } from "next/navigation";
import SimilarShows from "@/components/similar-shows";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const show = showData.find((m) => m.id === parseInt(params.id));

  if (!show) {
    return {
      title: "Show Not Found",
    };
  }

  return {
    title: `${show.title} | Film Findr`,
    description: show.overview,
  };
}

export default function ShowPage({ params }: { params: { id: string } }) {
  const show = showData.find((m) => m.id === parseInt(params.id));

  if (!show) {
    notFound();
  }

  return (
    <main className="min-h-screen relative">
      {/* TOP FADE GRADIENT */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#00050d] to-transparent z-10" />

      <div className="relative h-[70vh] w-full mt-0">
        <Image
          src={show.imgSrc}
          alt={show.alt}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00050d] to-transparent" />

        {/* Movie info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto flex flex-col md:flex-row gap-8 items-end">
            <div className="relative h-64 w-44 overflow-hidden rounded-md shadow-xl hidden md:block">
              <Image
                src={show.imgSrc}
                alt={show.alt}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">
                {show.title}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-yellow-400">
                  <IoMdStar className="w-5 h-5" />
                  <span className="ml-1 font-medium">
                    {show.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-gray-400">• 2023 • 2h 49m</span>
              </div>

              <p className="text-lg text-gray-200 mb-6 max-w-3xl">
                {show.overview}
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors">
                  <FaPlay className="w-4 h-4" />
                  <span className="font-medium">Watch Now</span>
                </button>
                <button className="flex items-center gap-2 bg-transparent border border-gray-500 text-white px-6 py-3 rounded-md hover:border-white transition-colors">
                  <FaBookmark className="w-4 h-4" />
                  <span className="font-medium">Add to Watchlist</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details section */}
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-white mb-6">
              About the Show
            </h2>
            <p className="text-gray-300 mb-8">
              {show.overview}
              {/* Extended description would go here */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              euismod, nisi vel consectetur interdum, nisl nisi consectetur
              purus, eget porttitor nisl nisl sit amet magna. Fusce iaculis
              consectetur risus, id consectetur nisl nisl sit amet magna.
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Cast</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="text-center">
                    <div className="h-40 w-full bg-gray-800 rounded-md mb-2"></div>
                    <h4 className="text-white font-medium">Actor Name</h4>
                    <p className="text-gray-400 text-sm">Character</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">
              Show Details
            </h2>
            <dl className="space-y-4 text-gray-300">
              <div>
                <dt className="font-medium text-gray-400">Release Date</dt>
                <dd>July 21, 2023</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-400">Director</dt>
                <dd>Christopher Nolan</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-400">Runtime</dt>
                <dd>2h 49m</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-400">Genre</dt>
                <dd>Science Fiction, Drama, Adventure</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-400">Original Language</dt>
                <dd>English</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Similar Movies section */}
        <div className="mt-12">
          <SimilarShows currentShowId={show.id} />
        </div>
      </div>

      {/* Back button */}
      <div className="container mx-auto px-8 pb-16">
        <Link
          href="/"
          className="inline-block text-gray-400 hover:text-white transition-colors">
          &larr; Back to Home
        </Link>
      </div>
    </main>
  );
}
