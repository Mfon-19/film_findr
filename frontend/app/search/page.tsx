"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchPageComponent from "@/components/search-page-component";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return <SearchPageComponent initialQuery={query} />;
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageContent />
    </Suspense>
  );
}
