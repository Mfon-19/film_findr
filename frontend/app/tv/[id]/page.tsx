import { notFound } from "next/navigation";
import DetailPageLayout from "@/components/layouts/detail-page-layout";
import ShowHero from "@/components/tv/show-hero";
import ShowDetails from "@/components/tv/show-details";
import SimilarShows from "@/components/similar-shows";
import { getShowById, getSimilarShows } from "@/lib/actions";

const SIMILAR_SHOWS_LIMIT = 4;

async function getShowData(id: string) {
  try {
    const [show, similarShows] = await Promise.all([
      getShowById(id),
      getSimilarShows(id)
    ]);

    return {
      show,
      similarShows: similarShows?.slice(0, SIMILAR_SHOWS_LIMIT)
    };
  } catch (error) {
    console.error('Error fetching show data:', error);
    return { show: null, similarShows: null };
  }
}

export default async function ShowPage({ params }: { params: { id: string } }) {
  const id = await params.id;
  const { show, similarShows } = await getShowData(id);

  if (!show) notFound();
  if (!similarShows) throw new Error('Failed to load similar shows');

  return (
    <DetailPageLayout
      backdropPath={show.backdropPath}
      title={show.name}
      heroSection={<ShowHero show={show} />}
      detailsSection={<ShowDetails show={show} />}
    >
      <SimilarShows similarShows={similarShows} />
    </DetailPageLayout>
  );
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = await params.id;
  const show = await getShowById(id);

  if (!show) {
    return {
      title: 'TV Show Not Found',
      description: 'The requested TV show could not be found.'
    };
  }

  return {
    title: `${show.name} | Film Findr`,
    description: show.overview,
    openGraph: {
      title: show.name,
      description: show.overview,
      images: [show.posterPath]
    }
  };
}