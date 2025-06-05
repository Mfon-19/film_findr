import { IoMdStar } from "react-icons/io";
import { PosterImage } from "./poster-image";
import { ActionButtons } from "./action-buttons";
import { getMediaTypeLabel } from "@/lib/utils";
import { HoverDetailPanelProps } from "@/lib/types";

export function HoverDetailPanel({
  imageSrc,
  alt,
  title,
  rating,
  displayYear,
  description,
  type,
  onPlayClick,
  onAddClick,
}: HoverDetailPanelProps) {
  return (
    <div className="invisible absolute left-0 right-0 top-0 z-10 transform overflow-hidden rounded-lg bg-neutral-800 opacity-0 shadow-lg transition-all duration-300 ease-out group-hover:visible group-hover:opacity-100">
      {/* Image inside hover panel */}
      <PosterImage src={imageSrc} alt={alt} aspectRatio="landscape" />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-800 via-transparent to-transparent" />

      {/* Info inside hover panel */}
      <div className="p-3 text-white">
        <div className="mb-1 flex items-center justify-between">
          <h4 className="truncate text-base font-semibold">{title}</h4>
          <span className="ml-2 text-xs text-gray-400 uppercase tracking-wide">
            {getMediaTypeLabel(type)}
          </span>
        </div>

        <div className="mb-2 flex items-center gap-1 text-sm text-yellow-400">
          <span>{rating.toFixed(1)}</span>
          <IoMdStar className="h-4 w-4 shrink-0 fill-current" />
          {displayYear && (
            <span className="ml-2 text-xs text-gray-400">({displayYear})</span>
          )}
        </div>

        <p className="mb-3 line-clamp-3 text-xs text-gray-300">{description}</p>

        <ActionButtons onPlayClick={onPlayClick} onAddClick={onAddClick} />
      </div>
    </div>
  );
}
