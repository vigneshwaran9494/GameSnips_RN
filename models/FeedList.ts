export interface Author {
  id: number;
  name: string;
  image: string;
}

export interface FeedListItem {
  id: number;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: number;
  bookmarks: number;
  author: Author;
}

export interface FeedList {
  items: FeedListItem[];
}