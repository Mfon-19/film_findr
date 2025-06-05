import { useState } from "react";
import { useRouter } from "next/navigation";

export interface UseSearchReturn {
  isExpanded: boolean;
  query: string;
  onQueryChange: (query: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggle: () => void;
}

export function useSearch(): UseSearchReturn {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchExpanded(false);
      setSearchQuery("");
    }
  };

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchQuery("");
    }
  };

  return {
    isExpanded: isSearchExpanded,
    query: searchQuery,
    onQueryChange: setSearchQuery,
    onSubmit: handleSearchSubmit,
    onToggle: handleSearchToggle,
  };
}