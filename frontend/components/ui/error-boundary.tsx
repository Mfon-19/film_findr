'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Something went wrong!</h1>
      <p className="text-xl text-gray-400 mb-8">
        We encountered an error while loading this page.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="bg-white text-black px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/discover"
          className="bg-transparent border border-gray-500 text-white px-6 py-3 rounded-md hover:border-white transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}