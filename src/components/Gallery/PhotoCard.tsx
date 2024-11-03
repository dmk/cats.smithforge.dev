/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useState } from "react";
import { CatImage } from "./types";
import PhotoModal from "./PhotoModal";

interface PhotoCardProps {
  image: CatImage;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        onClick={handleOpenModal}
        className="relative bg-white shadow-md rounded-lg overflow-hidden
                   hover:shadow-2xl hover:scale-102 transform transition-all duration-300
                   max-w-72 cursor-pointer"
      >
        <img
          src={image.thumbnail}
          alt={image.name}
          loading="lazy"
          className="block w-full rounded-lg"
        />
        {image.cats.map((cat, index) => (
          <div
            key={cat}
            className={`absolute top-2 left-2 ${cat === 'Ruby' ? 'bg-red-600' : 'bg-cyan-600'} 
                        text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md`}
            style={{ transform: `translateX(${index * 60}px)` }}
          >
            {cat}
          </div>
        ))}
      </div>

      <PhotoModal isOpen={isModalOpen} onClose={handleCloseModal} image={image} />
    </>
  );
};

export default PhotoCard;
