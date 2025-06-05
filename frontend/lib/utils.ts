import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MediaType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MOVIE_POSTER_PLACEHOLDER = `data:image/svg+xml;base64,${btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750">
    <defs>
      <style>
        .gradient-bg { fill: url(#grad); }
        .border { fill: none; stroke: #475569; stroke-width: 2; stroke-dasharray: 10,5; }
        .film-body { fill: #64748b; }
        .film-hole { fill: #334155; }
        .text { font-family: system-ui, -apple-system, sans-serif; font-size: 20px; font-weight: 500; fill: #94a3b8; text-anchor: middle; dominant-baseline: middle; }
        .icon-shadow { filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); }
      </style>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e293b" stop-opacity="1" />
        <stop offset="100%" stop-color="#0f172a" stop-opacity="1" />
      </linearGradient>
    </defs>
    
    <!-- Background -->
    <rect width="500" height="750" class="gradient-bg"/>
    
    <!-- Border -->
    <rect x="50" y="50" width="400" height="650" class="border" rx="12"/>
    
    <!-- Main content group - perfectly centered -->
    <g transform="translate(250, 375)">
      <!-- Film strip icon - centered at origin -->
      <g class="icon-shadow">
        <rect x="-30" y="-50" width="60" height="100" class="film-body" rx="6"/>
        
        <!-- Film frames -->
        <rect x="-24" y="-42" width="48" height="12" class="film-hole" rx="2"/>
        <rect x="-24" y="-24" width="48" height="12" class="film-hole" rx="2"/>
        <rect x="-24" y="-6" width="48" height="12" class="film-hole" rx="2"/>
        <rect x="-24" y="12" width="48" height="12" class="film-hole" rx="2"/>
        <rect x="-24" y="30" width="48" height="12" class="film-hole" rx="2"/>
        
        <!-- Left perforations -->
        <circle cx="-36" cy="-36" r="3" class="film-hole"/>
        <circle cx="-36" cy="-18" r="3" class="film-hole"/>
        <circle cx="-36" cy="0" r="3" class="film-hole"/>
        <circle cx="-36" cy="18" r="3" class="film-hole"/>
        <circle cx="-36" cy="36" r="3" class="film-hole"/>
        
        <!-- Right perforations -->
        <circle cx="36" cy="-36" r="3" class="film-hole"/>
        <circle cx="36" cy="-18" r="3" class="film-hole"/>
        <circle cx="36" cy="0" r="3" class="film-hole"/>
        <circle cx="36" cy="18" r="3" class="film-hole"/>
        <circle cx="36" cy="36" r="3" class="film-hole"/>
      </g>
      
      <!-- Text - perfectly centered below icon -->
      <text x="0" y="85" class="text">No Poster</text>
      <text x="0" y="115" class="text">Available</text>
    </g>
  </svg>
`)}`;

export const getImageSrc = (src: string): string => {
  if (!src || src.includes("null")) {
    return MOVIE_POSTER_PLACEHOLDER;
  }
  return src;
};

export const getDisplayYear = (
  type: MediaType,
  year?: number,
  releaseDate?: string,
  firstAirDate?: string
): number | undefined => {
  if (year) return year;

  if (type === "movie" && releaseDate) {
    return new Date(releaseDate).getFullYear();
  }

  if (type === "tv" && firstAirDate) {
    return new Date(firstAirDate).getFullYear();
  }

  return undefined;
};

export const getMediaTypeLabel = (type: MediaType): string => {
  return type === "tv" ? "TV Show" : "Movie";
};
