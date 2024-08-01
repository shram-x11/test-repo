import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const GET_REPOSITORY_DETAILS = gql`
  query GetRepositoryDetails($id: ID!) {
    node(id: $id) {
      ... on Repository {
        name
        stargazerCount
        updatedAt
        owner {
          login
          avatarUrl
          url
        }
        description
        languages(first: 10) {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  }
`;

const Repo = () => {
  const { id } = useParams();
  console.log(id)
  const { loading, error, data } = useQuery(GET_REPOSITORY_DETAILS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { name, stargazerCount, updatedAt, owner, description, languages } =
    data.node;

  return (
    <div>
      <h1>{name}</h1>
      <p>Stars: {stargazerCount}</p>
      <p>Last Commit: {new Date(updatedAt).toLocaleDateString()}</p>
      <div>
        <img src={owner.avatarUrl} alt={owner.login} width="50" />
        <a href={owner.url}>{owner.login}</a>
      </div>
      <p>{description}</p>
      <h3>Languages</h3>
      <ul>
        {languages.edges.map((lang: any) => (
          <li key={lang.node.name}>{lang.node.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Repo;
