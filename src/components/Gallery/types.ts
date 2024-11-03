export type CatName = 'Ruby' | 'Lulu' | 'Casper';

export interface CatImage {
  thumbnail: string;
  fullSize: string;
  name: string;
  cats: CatName[];
}
