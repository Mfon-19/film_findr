import Image from "next/image";
import React from "react";
import { IoMdStar } from "react-icons/io";
import { FaPlay, FaPlus } from "react-icons/fa";

interface Props {
  src: string;
  title: string;
  rating: number;
  description?: string;
  year?: number;
  alt?: string;
}

export default function MovieCard({
  src,
  title,
  rating,
  description = "No description available.",
  year,
  alt = title,
}: Props) {
  return (
    <div className="group relative w-full cursor-pointer">
      {/* --- Visible Card Area (Scales on hover) --- */}
      <div className="overflow-hidden rounded-md shadow-md transition-all duration-300 ease-in-out group-hover:shadow-xl">
        <div className="relative" style={{ paddingBottom: "150%" }}>
          <Image src={src} alt={alt} fill className="object-cover" />
        </div>
      </div>

      {/* --- Basic Info (Visible below image initially, hidden on hover) --- */}
      <div className="mt-2 px-1 transition-opacity duration-300 group-hover:opacity-0">
        <h3 className="truncate text-sm font-medium text-gray-100">
          {title} {year && <span className="text-gray-400">({year})</span>}
        </h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-yellow-400">
          <span>{rating.toFixed(1)}</span>
          <IoMdStar className="h-3.5 w-3.5 shrink-0 fill-current" />
        </div>
      </div>

      {/* --- Hover Detail Panel (Appears on hover) --- */}
      <div className="invisible absolute left-0 right-0 top-0 z-10 transform overflow-hidden rounded-lg bg-neutral-800 opacity-0 shadow-lg transition-all duration-300 ease-out group-hover:visible group-hover:opacity-100">
        {/* Image inside hover panel */}
        <div className="relative" style={{ paddingBottom: "75%" }}>
          <Image src={src} alt={alt} fill className="object-cover" />
          {/* Optional overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-800 via-transparent"></div>
        </div>

        {/* Info inside hover panel */}
        <div className="p-3 text-white">
          <h4 className="mb-1 truncate text-base font-semibold">{title}</h4>
          <div className="mb-2 flex items-center gap-1 text-sm text-yellow-400">
            <span>{rating.toFixed(1)}</span>
            <IoMdStar className="h-4 w-4 shrink-0 fill-current" />
            {year && (
              <span className="ml-2 text-xs text-gray-400">({year})</span>
            )}
          </div>
          <p className="mb-3 line-clamp-3 text-xs text-gray-300">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition hover:bg-opacity-80">
              <FaPlay className="ml-0.5 h-3.5 w-3.5 hover:cursor-pointer" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-500 text-gray-300 transition hover:border-white hover:text-white">
              <FaPlus className="h-3.5 w-3.5 hover:cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
