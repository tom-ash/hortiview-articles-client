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
        author {
          name
        }
    }
  }
`;

export const useArticles = () => {
  const { data, isLoading, error } = useQuery({ queryKey: [GET_ARTICLES] });

  // TODO: Handle isLoading

  // TODO: Extend error handling.
  if (error) {
    console.error(error)
  }

  return data
}
