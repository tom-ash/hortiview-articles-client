export interface ArticlesIndexItem {
  id: number;
  tags: Tag[];
  author: Author;
  publishedOn: string;
  title: string;
  description: string;
}

export interface ArticlesShowItem extends ArticlesIndexItem {
  content: string;
}

export interface Tag {
  value: string;
}

export interface Author {
  name: string;
}
