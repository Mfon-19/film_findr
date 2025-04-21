"use client";

import Link from "next/link";
import React, { useState } from "react";
import { SlMagnifier, SlMenu } from "react-icons/sl";
import SearchBar from "./search-bar";

const MobileNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  };

  return (
    <div className="flex md:hidden items-center gap-4">
      {/* Mobile Search: Show input or icon */}
      {isMobileSearchOpen ? (
        <div className="flex items-center flex-grow bg-[#0B304F]">
          <SearchBar />
          {/* Close button for mobile search */}
          <button
            onClick={() => setIsMobileSearchOpen(false)}
            className="ml-2 p-1 text-xl hover:opacity-80 hover:cursor-pointer"
            aria-label="Close search">
            &times;
          </button>
        </div>
      ) : (
        !isMobileMenuOpen && (
          <button
            onClick={() => setIsMobileSearchOpen(true)}
            aria-label="Open search"
            className="p-1 hover:opacity-80 hover:cursor-pointer">
            <SlMagnifier size={24} />
          </button>
        )
      )}

      {/* Mobile Menu Toggle - only show if mobile search is closed */}
      {!isMobileSearchOpen && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          className="p-1 hover:opacity-80 hover:cursor-pointer">
          {isMobileMenuOpen ? (
            <span className="text-2xl">&times;</span>
          ) : (
            <SlMenu size={24} />
          )}
        </button>
      )}

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0B304F] flex flex-col items-center p-5 gap-4 z-10 shadow-lg">
          <Link href={"#"} className="hover:opacity-80" onClick={closeMenus}>
            Movies
          </Link>
          <Link href={"#"} className="hover:opacity-80" onClick={closeMenus}>
            TV Shows
          </Link>
          <Link href={"#"} className="hover:opacity-80" onClick={closeMenus}>
            More
          </Link>
          <hr className="w-full border-t border-gray-600 my-2" />
          <button className="hover:opacity-80" onClick={closeMenus}>
            Join FilmFindr
          </button>
          <button className="hover:opacity-80" onClick={closeMenus}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
