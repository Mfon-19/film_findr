"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  maxPages: number;
}

export default function Pagination({ currentPage, maxPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const goToPage = (pageNumber: number) => {
    router.push(createPageURL(pageNumber));
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(maxPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < maxPages - 1) {
      rangeWithDots.push('...', maxPages);
    } else if (maxPages > 1) {
      rangeWithDots.push(maxPages);
    }

    return rangeWithDots;
  };

  const visiblePages = maxPages > 7 ? getVisiblePages() : Array.from({ length: maxPages }, (_, i) => i + 1);

  if (maxPages <= 1) return null;

  return (
    <div className="flex items-center justify-center mt-12 mb-16 px-4">
      <nav className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20 shadow-lg">
        {/* Previous button */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white/90 rounded-lg transition-all duration-200 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1 mx-2">
          {visiblePages.map((pageNum, index) => {
            if (pageNum === '...') {
              return (
                <span key={`dots-${index}`} className="px-3 py-2.5 text-white/60 text-sm font-medium">
                  ...
                </span>
              );
            }

            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum as number)}
                className={`min-w-[2.75rem] px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105'
                    : 'text-white/90 hover:bg-white/20 hover:text-white'
                }`}
                aria-label={`Go to page ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === maxPages}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white/90 rounded-lg transition-all duration-200 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          aria-label="Go to next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
}