import { FaPlay, FaPlus } from "react-icons/fa";
import { ActionButtonsProps } from "@/lib/types";

export function ActionButtons({ onPlayClick, onAddClick }: ActionButtonsProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition hover:bg-opacity-80"
        onClick={onPlayClick}
        aria-label="Play">
        <FaPlay className="ml-0.5 h-3.5 w-3.5" />
      </button>
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-500 text-gray-300 transition hover:border-white hover:text-white"
        onClick={onAddClick}
        aria-label="Add to watchlist">
        <FaPlus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}