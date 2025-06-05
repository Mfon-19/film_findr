import Image from "next/image";
import { PosterImageProps } from "@/lib/types";

export function PosterImage({
  src,
  alt,
  aspectRatio = "poster",
  className = "",
}: PosterImageProps) {
  const paddingBottom = aspectRatio === "poster" ? "150%" : "75%";

  return (
    <div className={`relative ${className}`} style={{ paddingBottom }}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
      />
    </div>
  );
}
