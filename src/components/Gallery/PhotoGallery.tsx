'use client';

import React, { useMemo, useState } from 'react';

import images from '@/assets/cats.json';
import PhotoCard from './PhotoCard';
import { CatImage, CatName } from './types';
import { badgeColors } from './colors';
import Masonry from 'react-masonry-css';

const breakpointColumns = {
  default: 5,
  1280: 4,
  768: 3,
  640: 2,
};

const PhotoGallery: React.FC = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);

  // Filtering logic
  const filteredImages = useMemo(() => (
    selectedCats.length > 0
      ? (images as CatImage[]).filter(image => selectedCats.some(cat => image.cats.includes(cat as CatName)))
      : (images as CatImage[])
  ), [selectedCats]);

  const handleCheckboxChange = (cat: string) => {
    if (selectedCats.includes(cat)) {
      setSelectedCats(selectedCats.filter(selected => selected !== cat));
    } else {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  const resetFilters = () => {
    setSelectedCats([]);
  };

  return (
    <div className="relative w-full flex items-center">
      <Masonry
        breakpointCols={breakpointColumns}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {filteredImages.map((image: CatImage, index: number) => (
          <div key={index} className="mb-6">
            <PhotoCard image={image} />
          </div>
        ))}
      </Masonry>

      {/* Floating Filter Button */}
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="fixed bottom-10 right-10 p-3 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-transform transform hover:scale-110 z-50"
      >
        <svg viewBox='0 0 24 24' height={24} width={24}>
          <path
            d="M4 6H20M7 12H17M9 18H15"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Filter Popup */}
      {showFilter && (
        <div
          className={`fixed inset-0 sm:bottom-24 sm:right-10 sm:w-80 sm:inset-auto bg-white p-5 rounded-lg shadow-2xl z-50
            transition-all duration-500 ease-in-out ${showFilter ? 'opacity-100' : 'opacity-0'}`}
        >
          <h2 className="text-xl font-bold mb-4">Filter by Cat</h2>
          <div className="flex flex-col gap-4">
            <form>
              {Object.keys(badgeColors).map((catName) => (
                <label key={`form-check-${catName}`} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCats.includes(catName)}
                    onChange={() => handleCheckboxChange(catName)}
                    className="form-checkbox h-5 w-5 text-purple-600"
                  />
                  {catName}
                </label>
              ))}
            </form>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={resetFilters}
              className="p-2 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Reset Filters
            </button>
            <button
              onClick={() => setShowFilter(false)}
              className="p-2 w-full bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
