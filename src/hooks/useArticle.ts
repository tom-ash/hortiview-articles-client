import { gql } from "@apollo/client";
import { useQuery } from "@tanstack/react-query";
import { Article } from "./useArticles";

const GET_ARTICLE = gql`
  query GetArticleById($id: ID!) {
    article(id: $id) {
        id
        createdAt
        updatedAt
        title
        description
        content
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

export const useArticle = (id: number) => {
  const { data, isLoading, error } = useQuery({ queryKey: [GET_ARTICLE, { id }] });

  // TODO: Handle isLoading

  if (error) {
    console.error(error)

    // TODO: Extend error handling.
    throw error
  }

  if (data) {
    // @ts-expect-error TODO: Add typing to data.
    return data.article as Article
  }
}
