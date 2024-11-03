export type CatName = 'Ruby' | 'Lulu';

export interface CatImage {
  thumbnail: string;
  fullSize: string;
  name: string;
  cats: CatName[];
}
