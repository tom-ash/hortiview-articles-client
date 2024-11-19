import { gql } from "@apollo/client";

export const GET_ARTICLES = gql`
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
