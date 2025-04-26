import React from "react";

const Logo = () => {
  return (
    <div className="inline-flex items-center gap-2 select-none cursor-pointer me-4">
      {/* Icon */}
      <svg
        className="w-10 h-10 text-white"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg">
        {/* camera body */}
        <rect x="8" y="20" width="48" height="32" rx="4" fill="currentColor" />
        {/* film reels */}
        <circle cx="20" cy="16" r="8" fill="currentColor" />
        <circle cx="44" cy="16" r="8" fill="currentColor" />
        {/* magnifying glass */}
        <g fill="none" stroke="#0f243f" strokeWidth="6" strokeLinecap="round">
          <circle cx="32" cy="36" r="8" />
          <line x1="38" y1="42" x2="46" y2="50" />
        </g>
      </svg>

      {/* Word‑mark */}
      <span className="font-sans font-semibold text-2xl leading-none text-white">
        FilmFindr
      </span>
    </div>
  );
};

export default Logo;
