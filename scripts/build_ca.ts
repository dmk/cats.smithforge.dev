// Script to generate thumbnails and full-size images of cats, then update a JSON file

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { promisify } from 'util';
import cliProgress from 'cli-progress';
import { CatImage, CatName } from '@/components/Gallery/types';

const THUMBNAIL_SIZE = 420;

// Directories setup
const rootDir = path.resolve('./cats');

// Output directories
const thumbnailsDir = path.resolve('./public/images/cats/thumbnails');
const fullSizeDir = path.resolve('./public/images/cats/fullsize');

// JSON output
const outputJson = path.resolve('./src/assets/images.json');

// Helper functions
const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const utimes = promisify(fs.utimes);
const isImageFile = (file: string) => (
  file.endsWith('.jpg') ||
  file.endsWith('.jpeg') ||
  file.endsWith('.png') ||
  file.endsWith('.JPG')
);

// Function to determine cat names from directory name
const getCatNamesFromDir = (dirName: string): CatName[] => {
  return dirName.split('+').map(name => name.charAt(0).toUpperCase() + name.slice(1)) as CatName[];
};

async function cleanupOldImages() {
  try {
    const existingThumbnails = await readdir(thumbnailsDir);
    const existingFullSizes = await readdir(fullSizeDir);

    // Remove all existing images in thumbnails and fullsize directories
    for (const file of existingThumbnails) {
      await unlink(path.join(thumbnailsDir, file));
    }
    for (const file of existingFullSizes) {
      await unlink(path.join(fullSizeDir, file));
    }
    console.log('Old images cleaned up successfully.');
  } catch (error) {
    console.error('Error cleaning up old images:', error);
  }
}

async function processImages() {
  try {
    await cleanupOldImages();

    const catDirectories = (await readdir(rootDir)).filter(dir => !dir.startsWith('.'));
    const allImages: CatImage[] = [];

    // Ensure output directories exist
    if (!fs.existsSync(thumbnailsDir)) {
      await mkdir(thumbnailsDir, { recursive: true });
    }
    if (!fs.existsSync(fullSizeDir)) {
      await mkdir(fullSizeDir, { recursive: true });
    }

    let totalImages = 0;
    for (const dir of catDirectories) {
      const images = await readdir(path.join(rootDir, dir));
      totalImages += images.filter(isImageFile).length;
    }

    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(totalImages, 0);

    // Process individual cat directories
    for (const dir of catDirectories) {
      const dirPath = path.join(rootDir, dir);
      const catNames = getCatNamesFromDir(dir);
      const images = await readdir(dirPath);

      // Filter images and sort by date (newest first)
      const sortedImages = images
        .filter(isImageFile)
        .sort((a, b) => {
          const aStats = fs.statSync(path.join(dirPath, a));
          const bStats = fs.statSync(path.join(dirPath, b));
          return bStats.mtime.getTime() - aStats.mtime.getTime();
        });

      for (let j = 0; j < sortedImages.length; j++) {
        const image = sortedImages[j];
        const imageName = `${catNames.join('-').toLowerCase()}-${j + 1}`;
        const inputPath = path.join(dirPath, image);
        const thumbnailOutputPath = path.join(thumbnailsDir, `${imageName}-thumb.avif`);
        const fullSizeOutputPath = path.join(fullSizeDir, `${imageName}.avif`);

        try {
          // Get the original file stats for timestamps
          const fileStats = fs.statSync(inputPath);
          
          // Convert to AVIF format using sharp and strip metadata (EXIF)
          await sharp(inputPath)
            .resize(THUMBNAIL_SIZE) // Thumbnail size
            .toFormat('avif')
            .withMetadata({ exif: undefined })
            .toFile(thumbnailOutputPath);

          await sharp(inputPath)
            .toFormat('avif')
            .withMetadata({ exif: undefined })
            .toFile(fullSizeOutputPath);

          // Set the timestamps of the new files to match the original file
          await utimes(thumbnailOutputPath, fileStats.atime, fileStats.mtime);
          await utimes(fullSizeOutputPath, fileStats.atime, fileStats.mtime);

          // Add to images list
          allImages.push({
            thumbnail: `/images/cats/thumbnails/${imageName}-thumb.avif`,
            fullSize: `/images/cats/fullsize/${imageName}.avif`,
            name: imageName,
            cats: catNames,
          });

          progressBar.increment();
        } catch (error) {
          console.error(`Error processing image ${image}:`, error);
        }
      }
    }

    progressBar.stop();

    // Sort all images by original file modification time before writing JSON
    allImages.sort((a, b) => {
      const aPath = path.join(fullSizeDir, path.basename(a.fullSize));
      const bPath = path.join(fullSizeDir, path.basename(b.fullSize));
      const aStats = fs.statSync(aPath);
      const bStats = fs.statSync(bPath);
      return bStats.mtime.getTime() - aStats.mtime.getTime();
    });

    // Write JSON file with all images
    await writeFile(outputJson, JSON.stringify(allImages, null, 2));
    console.log('Images processed successfully.');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

processImages();
