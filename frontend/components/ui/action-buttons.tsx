import { FaPlay, FaBookmark } from "react-icons/fa";

interface ActionButtonsProps {
  onPlay?: () => void;
  onBookmark?: () => void;
  playLabel?: string;
  bookmarkLabel?: string;
}

export default function ActionButtons({
  onPlay,
  onBookmark,
  playLabel = "Watch Now",
  bookmarkLabel = "Add to Watchlist",
}: ActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <button
        onClick={onPlay}
        className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors">
        <FaPlay className="w-4 h-4" />
        <span className="font-medium">{playLabel}</span>
      </button>
      <button
        onClick={onBookmark}
        className="flex items-center gap-2 bg-transparent border border-gray-500 text-white px-6 py-3 rounded-md hover:border-white transition-colors">
        <FaBookmark className="w-4 h-4" />
        <span className="font-medium">{bookmarkLabel}</span>
      </button>
    </div>
  );
}
