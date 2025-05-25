'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SearchPageComponent from '@/components/search-page-component'; // Your search component

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return <SearchPageComponent initialQuery={query} />;
}