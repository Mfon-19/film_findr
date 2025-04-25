import Link from "next/link";

export default function MovieNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Movie Not Found</h1>
      <p className="text-xl text-gray-400 mb-8">
        The movie you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/"
        className="bg-white text-black px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
