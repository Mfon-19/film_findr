import GridPageLayout from "@/components/layouts/grid-page-layout";
import EntityGrid from "@/components/entity-grid";
import MediaCard from "@/components/ui/media-card";
import { getShows } from "@/lib/actions";
import { parseSearchParams } from "@/lib/utils/searchParams";

interface TVPageProps {
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

export default async function TVPage({ searchParams }: TVPageProps) {
  const filters = parseSearchParams(searchParams);

  try {
    const shows = await getShows(filters);

    if (!shows) {
      throw new Error("Failed to fetch TV shows");
    }

    return (
      <GridPageLayout
        title="TV Shows"
        filterType="tv"
        currentPage={filters.page}
        totalItems={TOTAL_ITEMS}
        itemsPerPage={ITEMS_PER_PAGE}
        maxPages={MAX_PAGES}>
        <EntityGrid
          items={shows}
          renderItem={(show) => (
            <div key={show.id} className="relative">
              <MediaCard
                type="tv"
                id={show.id}
                src={show.posterPath}
                title={show.name}
                rating={show.voteAverage}
                description={show.overview}
                alt={show.alt || "show"}
              />
            </div>
          )}
        />
      </GridPageLayout>
    );
  } catch (error) {
    console.error("Error loading TV shows:", error);
    throw error;
  }
}
