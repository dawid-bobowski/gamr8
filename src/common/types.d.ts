export interface Game {
  id: number;
  title: string;
  description: string;
  year: number;
  slug: string;
  imageUrl: string;
}

export interface Review {
  id: number;
  authorId: number;
  gameId: number
  title: string;
  description: string;
  rating: number;
}