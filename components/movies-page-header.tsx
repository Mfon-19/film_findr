import Link from 'next/link';

type Props = {
  /** e.g. 1  */
  start: number;
  /** e.g. 24 */
  end: number;
  /** e.g. 2394 */
  total: number;
};

export default function MoviesPageHeader({ start, end, total }: Props) {
  const range = `${start}-${end}`;
  const totalFormatted = total.toLocaleString(); // "2,394"

  return (
    <header className="flex flex-col gap-2 px-4 py-6 md:px-12">
      {/* ――― Breadcrumb + counter ――― */}
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-sm text-white">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="select-none">›</span>
          <span className="text-white">Movies</span>
        </nav>

        {/* Counter (hidden on extra-small screens to keep things tidy) */}
        <span className="hidden text-sm text-white sm:block">
          Showing <span className="font-medium text-white">{range}</span> of{' '}
          <span className="font-medium text-white">{totalFormatted}</span>{' '}
          movies
        </span>
      </div>

      {/* ――― Title & subtitle ――― */}
      <h1 className="text-4xl font-extrabold text-white">Movies</h1>

      <p className="text-lg text-white">
        Browse through our extensive collection of movies
      </p>

      {/* Counter for very small screens (so it's never lost) */}
      <span className="text-sm text-white sm:hidden">
        Showing <span className="font-medium text-white">{range}</span> of{' '}
        <span className="font-medium text-white">{totalFormatted}</span>{' '}
        movies
      </span>
    </header>
  );
}
