export type CatName = 'Рубі' | 'Лулу' | 'Каспер' | 'Лєля';

export interface CatImage {
  thumbnail: string;
  fullSize: string;
  name: string;
  cats: CatName[];
}
