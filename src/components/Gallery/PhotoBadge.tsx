import React from "react";
import { CatName } from "./types";
import { badgeColors } from "./colors";

interface PhotoBadgeProps {
  cat: CatName;
  index: number;
}

const PhotoBadge: React.FC<PhotoBadgeProps> = ({ cat, index }) => {
  return (
    <div
      className='absolute top-2 left-2 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md'
      style={{
        transform: `translateX(${index * 60}px)`,
        ...badgeColors[cat],
      }}
    >
      {cat}
    </div>
  );
};

export default PhotoBadge;
