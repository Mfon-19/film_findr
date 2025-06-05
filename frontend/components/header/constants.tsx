import {
  HomeIcon,
  FilmIcon,
  TvIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export const NAVIGATION_ITEMS = [
  { href: "/discover", icon: HomeIcon, label: "Home" },
  { href: "/movies", icon: FilmIcon, label: "Movies" },
  { href: "/tv", icon: TvIcon, label: "TV Shows" },
] as const;

export const MOBILE_NAVIGATION_ITEMS = [
  { href: "/", icon: HomeIcon, label: "Home" },
  { href: "/movies", icon: FilmIcon, label: "Movies" },
  { href: "/tv", icon: TvIcon, label: "TV Shows" },
  { href: "/search", icon: MagnifyingGlassIcon, label: "Search" },
  { href: "/profile", icon: UserCircleIcon, label: "Me" },
] as const;