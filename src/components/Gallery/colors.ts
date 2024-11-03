import { CatName } from "./types";

export const badgeColors: Record<CatName, Record<'backgroundColor' | 'color', string>> = {
  'Casper': {
    backgroundColor: '#2563eb',
    color: '#ffffff',
  },
  'Lulu': {
    backgroundColor: '#0d9488',
    color: '#ffffff',
  },
  'Ruby': {
    backgroundColor: '#db2777',
    color: '#ffffff',
  }
}