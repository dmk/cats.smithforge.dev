export type CatName = 'Рубі' | 'Лулу' | 'Каспер' | 'Лєля' | 'Шелдон' | 'Яша';

export interface CatImage {
  thumbnail: string;
  fullSize: string;
  name: string;
  cats: CatName[];
}
