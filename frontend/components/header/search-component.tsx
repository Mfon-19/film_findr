import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { UseSearchReturn } from "./use-search";

const styles = {
  pill: "rounded-full backdrop-blur-md ring-1 ring-white/10",
  iconSize: "h-6 w-6",
} as const;

export interface SearchComponentProps extends UseSearchReturn {}

export function SearchComponent({
  isExpanded,
  query,
  onQueryChange,
  onSubmit,
  onToggle,
}: SearchComponentProps) {
  const baseClasses = `relative ${styles.pill} hover:bg-white/10 transition-all duration-300`;
  const expandedClasses = isExpanded ? "w-80" : "w-auto";

  return (
    <div className={`${baseClasses} ${expandedClasses}`}>
      {isExpanded ? (
        <form onSubmit={onSubmit} className="flex items-center gap-2 px-5 py-3">
          <MagnifyingGlassIcon className={styles.iconSize} />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search movies, TV shows..."
            className="flex-1 bg-transparent text-gray-200 placeholder-gray-400 text-base font-medium outline-none"
            autoFocus
            aria-label="Search movies and TV shows"
          />
          <button
            type="button"
            onClick={onToggle}
            className="text-gray-400 hover:text-gray-200 transition-colors"
            aria-label="Close search">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </form>
      ) : (
        <button
          onClick={onToggle}
          className="flex items-center gap-2 px-5 py-3 w-full"
          aria-label="Open search">
          <MagnifyingGlassIcon className={styles.iconSize} />
          <span className="text-base font-medium text-gray-200">Search</span>
        </button>
      )}
    </div>
  );
}
