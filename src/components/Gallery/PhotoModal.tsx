/* eslint-disable @next/next/no-img-element */
import { CatImage } from "./types";

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: CatImage;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ isOpen, onClose, image }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 cursor-pointer transition-opacity duration-100 opacity-100"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white bg-red-600 p-2 rounded-full z-[100]"
        onClick={onClose}
      >
        <svg viewBox="0 0 24 24" height={24} width={24}>
          <path
            xmlns="http://www.w3.org/2000/svg"
            id="Vector"
            d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className="rounded-lg overflow-auto max-w-[90vw] max-h-[90vh] relative flex justify-center items-center transform transition-transform duration-100 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center cursor-default">
          <img
            src={image.fullSize}
            alt={image.name}
            className="object-contain rounded-lg"
            style={{ maxHeight: "85vh", maxWidth: "100%" }}
          />
          {image.cats.map((cat, index) => (
            <div
              key={cat}
              className={`absolute top-4 left-4 ${
                cat === "Ruby" ? "bg-red-600" : "bg-cyan-600"
              } text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md`}
              style={{ transform: `translateX(${index * 60}px)` }}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
