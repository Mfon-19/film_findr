import Image from "next/image";
import React from "react";
import { IoMdStarOutline } from "react-icons/io";

interface Props {
  src: string;
  title: string;
  rating: number;
  width?: number;
  height?: number;
  alt?: string;
}

export default function MovieCard({
  src,
  title,
  rating,
  width = 160,
  height = 240,
  alt = title,
}: Props) {
  return (
    <div className="group w-[160px] flex-shrink-0 transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
      {/* Image container - Relative positioning context for the badge */}
      <div className="relative">
        {/* Poster */}
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          className="rounded-lg object-cover"
        />

        {/* Rating badge (bottom‑left on the image) */}
        <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/70 px-2 py-0.5 text-xs font-semibold text-yellow-300 backdrop-blur-sm">
          {rating.toFixed(1)}
          <IoMdStarOutline className="h-4 w-4 shrink-0 fill-current" />
        </span>
      </div>

      {/* Movie title (outside the image) */}
      <h3 className="mt-2 truncate text-center text-sm font-medium text-gray-100 group-hover:text-white">
        {title}
      </h3>
    </div>
  );
}
