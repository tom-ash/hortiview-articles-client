import { gql } from "@apollo/client";

export const GET_ARTICLE = gql`
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
