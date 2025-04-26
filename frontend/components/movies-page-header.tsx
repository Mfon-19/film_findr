import PageHeader from "./page-header";

interface Props {
  start: number;
  end: number;
  total: number;
}

export default function MoviesPageHeader({ start, end, total }: Props) {
  return (
    <PageHeader
      title="Movies"
      subtitle="Browse through our extensive collection of movies"
      start={start}
      end={end}
      total={total}
      className="flex flex-col gap-2 px-4 py-6 md:px-12"
    />
  );
}