import Link from "next/link";

export default function TvShowNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-white mb-4">TV Show Not Found</h1>
      <p className="text-xl text-gray-400 mb-8">
        The TV Show you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/discover"
        className="bg-white text-black px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
