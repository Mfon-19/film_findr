import { ReactNode } from "react";
import PageFilter from "@/components/page-filter";
import PageHeader from "@/components/page-header";
import Pagination from "@/components/pagination";

interface GridPageLayoutProps {
  title: string;
  filterType: "movies" | "tv";
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  maxPages: number;
  children: ReactNode;
}

export default function GridPageLayout({
  title,
  filterType,
  currentPage,
  totalItems,
  itemsPerPage,
  maxPages,
  children,
}: GridPageLayoutProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(
    (currentPage - 1) * itemsPerPage + itemsPerPage,
    totalItems
  );

  return (
    <main className="flex gap-8 px-4 pt-8 md:px-12">
      <PageFilter type={filterType} />

      <section className="flex-1">
        <PageHeader
          title={title}
          start={startItem}
          end={endItem}
          total={totalItems}
        />

        <div className="mt-6 px-4 md:px-12">{children}</div>

        <Pagination currentPage={currentPage} maxPages={maxPages} />
      </section>
    </main>
  );
}
