import { IoMdStar } from "react-icons/io";
import { BasicInfoProps } from "@/lib/types";

export function BasicInfo({ title, displayYear, rating }: BasicInfoProps) {
  return (
    <div className="mt-2 px-1 transition-opacity duration-300 group-hover:opacity-0">
      <h3 className="truncate text-sm font-medium text-gray-100">
        {title} {displayYear && <span className="text-gray-400">({displayYear})</span>}
      </h3>
      <div className="mt-1 flex items-center gap-1 text-xs text-yellow-400">
        <span>{rating.toFixed(1)}</span>
        <IoMdStar className="h-3.5 w-3.5 shrink-0 fill-current" />
      </div>
    </div>
  );
}