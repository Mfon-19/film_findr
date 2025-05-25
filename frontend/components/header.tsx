"use client";

import Link from "next/link";
import Logo from "./logo";
import { useState } from "react";
import {
  HomeIcon,
  FilmIcon,
  TvIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const pill = "rounded-full backdrop-blur-md ring-1 ring-white/10";
const navItem = "flex flex-col items-center gap-1 text-sm font-medium";
const iconSize = "h-6 w-6";

export default function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search logic here - could navigate to search results
      console.log("Searching for:", searchQuery);
      // Example: router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className="hidden lg:flex items-center justify-between px-8 py-4 pointer-events-none">
        <div className="pointer-events-auto px-4 py-1">
          <Logo />
        </div>

        {/* pill nav */}
        <nav
          className={`pointer-events-auto flex items-center gap-10 px-12 py-3 ${pill}`}>
          <div className="relative group">
            <Link
              href="/discover"
              className={`flex items-center gap-2 text-sm font-medium text-gray-200 hover:text-white`}>
              <HomeIcon className={iconSize} /> Home
            </Link>
            <span
              className="absolute inset-0 -z-10 rounded-full opacity-0 group-hover:opacity-100
                 group-hover:scale-150 transition duration-300 ease-out
                 bg-white/10 ring-1 ring-white/20"
            />
          </div>
          <div className="relative group">
            <Link
              href="/movies"
              className={`flex items-center gap-2 text-sm font-medium text-gray-200 hover:text-white`}>
              <FilmIcon className={iconSize} /> Movies
            </Link>
            <span
              className="absolute inset-0 -z-10 rounded-full opacity-0 group-hover:opacity-100
                 group-hover:scale-150 transition duration-300 ease-out
                 bg-white/10 ring-1 ring-white/20"
            />
          </div>
          <div className="relative group">
            <Link
              href="/tv"
              className={`flex items-center gap-2 text-sm font-medium text-gray-200 hover:text-white`}>
              <TvIcon className={iconSize} /> TV&nbsp;Shows
            </Link>
            <span
              className="absolute inset-0 -z-10 rounded-full opacity-0 group-hover:opacity-100
                 group-hover:scale-150 transition duration-300 ease-out
                 bg-white/10 ring-1 ring-white/20"
            />
          </div>
        </nav>

        {/* search + avatar */}
        <div className="pointer-events-auto flex items-center gap-6">
          <div className={`relative ${pill} hover:bg-white/10 transition-all duration-300 ${
            isSearchExpanded ? 'w-80' : 'w-auto'
          }`}>
            {isSearchExpanded ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 px-5 py-3">
                <MagnifyingGlassIcon className={iconSize} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies, TV shows..."
                  className="flex-1 bg-transparent text-gray-200 placeholder-gray-400 text-base font-medium outline-none"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleSearchToggle}
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </form>
            ) : (
              <button
                onClick={handleSearchToggle}
                className="flex items-center gap-2 px-5 py-3 w-full"
              >
                <MagnifyingGlassIcon className={iconSize} />
                <span className="text-base font-medium text-gray-200">Search</span>
              </button>
            )}
          </div>
          <button
            className={`flex h-12 w-12 items-center justify-center ${pill} hover:bg-white/10`}>
            <UserCircleIcon className="h-8 w-8 text-gray-200" />
          </button>
        </div>
      </header>

      <div className="hidden pt-4 text-center">
        <Logo />
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center h-16 bg-white/50 shadow-[0_-2px_10px_0_rgb(0_0_0_/_0.05)] backdrop-blur-sm lg:hidden">
        <Link href="/" className={`${navItem} text-slate-700`}>
          <HomeIcon className={iconSize} /> Home
        </Link>
        <Link href="/movies" className={`${navItem} text-slate-700`}>
          <FilmIcon className={iconSize} /> Movies
        </Link>
        <Link href="/tv" className={`${navItem} text-slate-700`}>
          <TvIcon className={iconSize} /> TV&nbsp;Shows
        </Link>
        <Link href="/search" className={`${navItem} text-slate-700`}>
          <MagnifyingGlassIcon className={iconSize} /> Search
        </Link>
        <Link href="/profile" className={`${navItem} text-slate-700`}>
          <UserCircleIcon className={iconSize} /> Me
        </Link>
      </nav>
    </>
  );
}