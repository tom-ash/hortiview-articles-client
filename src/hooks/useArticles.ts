import { gql } from "@apollo/client";
import { useQuery } from "@tanstack/react-query";

const GET_ARTICLES = gql`
  query GetArticles {
    articles {
      id
      createdAt
      updatedAt
      title
      description
      publishedOn
      tags {
        value
      }
      author {
        name
      }
    }
  }
`;

export interface Tag {
  value: string;
}

export interface ArticleItem {
  id: number;
  author: {
    name: string;
  };
  title: string;
  description: string;
  publishedOn: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
}

export interface Article extends ArticleItem {
  content: string;
}

export const useArticles = () => {
  const { data, isLoading, error } = useQuery({ queryKey: [GET_ARTICLES] });

  // TODO: Handle isLoading

  if (error) {
    console.error(error);

    // TODO: Extend error handling.
    throw error;
  }

  if (data) {
    // @ts-expect-error TODO: Add typing to data.
    return data.articles as ArticleItem[];
  }
};
