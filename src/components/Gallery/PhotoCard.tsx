/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useState } from "react";
import { CatImage } from "./types";
import PhotoModal from "./PhotoModal";
import PhotoBadge from "./PhotoBadge";

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
          <PhotoBadge key={index} cat={cat} index={index} />
        ))}
      </div>

      <PhotoModal isOpen={isModalOpen} onClose={handleCloseModal} image={image} />
    </>
  );
};

export default PhotoCard;
