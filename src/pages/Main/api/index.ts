import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query GetRepositories($query: String!, $first: Int!, $after: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      edges {
        node {
          ... on Repository {
            id
            name
            stargazerCount
            updatedAt
            url
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      repositoryCount
    }
  }
`;

export const GET_USER_REPOSITORIES = gql`
  query GetUserRepositories($first: Int!, $after: String) {
    viewer {
      repositories(first: $first, after: $after) {
        nodes {
          id
          name
          url
          description
          stargazerCount
          updatedAt
        }
        pageInfo {
          endCursor
          hasNextPage
        }
        totalCount
      }
    }
  }
`;