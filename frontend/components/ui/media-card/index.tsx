/* eslint-disable @typescript-eslint/no-unused-vars */

import Link from "next/link";
import { MediaCardContent } from "./media-card-content";
import { getImageSrc, getDisplayYear } from "@/lib/utils";
import { MediaCardProps } from "@/lib/types";
import { MediaType } from "@/lib/types";

export default function MediaCard(props: MediaCardProps) {
  const {
    type,
    id,
    src,
    title,
    rating,
    description = "No description available.",
    year,
    alt,
    firstAirDate,
    releaseDate,
  } = props;

  const imageSrc = getImageSrc(src);
  const displayYear = getDisplayYear(type, year, releaseDate, firstAirDate);

  const cardContent = (
    <MediaCardContent
      {...props}
      displayYear={displayYear}
      imageSrc={imageSrc}
    />
  );

  if (id) {
    return (
      <Link
        href={`/${type}/${id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

export { MediaCardContent } from "./media-card-content";
export { BasicInfo } from "./basic-info";
export { ActionButtons } from "./action-buttons";
export { PosterImage } from "./poster-image";
export { HoverDetailPanel } from "./hover-detail-panel";

export type { MediaCardProps, MediaType };
