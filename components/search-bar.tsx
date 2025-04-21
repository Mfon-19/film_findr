import React from "react";
import { SlMagnifier } from "react-icons/sl";

const SearchBar = () => {
  return (
    <div className="relative h-[40px] w-[300px] bg-[#96A9B9] border-2 border-black rounded-3xl">
      <input
        type="search"
        placeholder="Search movies, TV shows..."
        className="w-full h-full bg-transparent pl-10 pr-4 outline-none placeholder-gray-700"
      />
      <div className="absolute left-2 top-1/2 -translate-y-1/2">
        <SlMagnifier size={20} color="#000000" />
      </div>
    </div>
  );
};

export default SearchBar;
