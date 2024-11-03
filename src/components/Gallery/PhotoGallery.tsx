import React from 'react';

import images from '@/assets/cats.json';
import PhotoCard from './PhotoCard';
import { CatImage } from './types';

const PhotoGallery: React.FC = () => {

  return (
    <div className="w-full flex items-center">
      <div className="max-w-6xl mx-auto">
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-6 py-6">
          {(images as CatImage[])
            .reverse()
            .map((image: CatImage, index: number) => (
              <div key={index} className="mb-6 break-inside-avoid overflow-visible">
                <PhotoCard image={image} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
