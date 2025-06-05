interface SearchFilters {
    sortBy: string;
    genres: string[];
    rating: number;
    year: number;
    language: string;
    page: number;
  }
  
  export function parseSearchParams(searchParams: Record<string, string | undefined>): SearchFilters {
    return {
      sortBy: searchParams.sortBy || "popularity.desc",
      genres: searchParams.genres ? searchParams.genres.split(",") : [],
      rating: searchParams.rating ? parseFloat(searchParams.rating) : 0,
      year: searchParams.year ? parseInt(searchParams.year) : new Date().getFullYear(),
      language: searchParams.language || "en",
      page: searchParams.page ? parseInt(searchParams.page) : 1
    };
  }