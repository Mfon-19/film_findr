import { X } from "lucide-react";

interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export default function VideoPopup({
  isOpen,
  onClose,
  videoUrl,
}: VideoPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full max-w-4xl mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Close video">
          <X size={24} />
        </button>

        {/* Video iframe */}
        <div className="relative w-full h-0 pb-[56.25%] bg-black rounded-lg overflow-hidden">
          <iframe
            src={videoUrl}
            className="absolute top-0 left-0 w-full h-full"
            allowFullScreen
            frameBorder="0"
            title="Video Player"
          />
        </div>
      </div>
    </div>
  );
}
