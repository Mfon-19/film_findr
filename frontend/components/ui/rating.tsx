import { IoMdStar } from "react-icons/io";

interface RatingProps {
  rating: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Rating({
  rating,
  className = "",
  size = "md",
}: RatingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className={`flex items-center text-yellow-400 ${className}`}>
      <IoMdStar className={sizeClasses[size]} />
      <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}