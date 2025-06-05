'use client';

import { useSearchParams } from 'next/navigation';
import SearchPageComponent from '@/components/search-page-component';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return <SearchPageComponent initialQuery={query} />;
}