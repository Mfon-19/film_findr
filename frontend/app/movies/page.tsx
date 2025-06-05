import GridPageLayout from "@/components/layouts/grid-page-layout";
import EntityGrid from "@/components/entity-grid";
import MediaCard from "@/components/ui/media-card";
import { getMovies } from "@/lib/actions";
import { parseSearchParams } from "@/lib/utils/searchParams";

interface MoviesPageProps {
  searchParams: {
    sortBy?: string;
    genres?: string;
    rating?: string;
    year?: string;
    language?: string;
    page?: string;
  };
}

const ITEMS_PER_PAGE = 20;
const MAX_PAGES = 5;
const TOTAL_ITEMS = 100;

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const filters = parseSearchParams(searchParams);

  try {
    const movies = await getMovies(filters);

    if (!movies) {
      throw new Error("Failed to fetch movies");
    }

    return (
      <GridPageLayout
        title="Movies"
        filterType="movies"
        currentPage={filters.page}
        totalItems={TOTAL_ITEMS}
        itemsPerPage={ITEMS_PER_PAGE}
        maxPages={MAX_PAGES}>
        <EntityGrid
          items={movies}
          renderItem={(movie) => (
            <div key={movie.id} className="relative">
              <MediaCard
                type="movies"
                id={movie.id}
                src={movie.posterPath}
                title={movie.title}
                rating={movie.voteAverage}
                description={movie.overview}
                alt={movie.alt || "movie"}
              />
            </div>
          )}
        />
      </GridPageLayout>
    );
  } catch (error) {
    console.error("Error loading movies:", error);
    throw error;
  }
}
