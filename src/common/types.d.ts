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
  author_username: string;
  game_id: number
  title: string;
  description: string;
  rating: number;
  date_posted: Date;
}

export interface User {
  username: string;
  email: string;
  reviews: Review[];
  avatarUrl: string;
}