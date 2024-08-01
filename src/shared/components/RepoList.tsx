import React from "react";
import { Link } from "react-router-dom";

interface RepositoryNode {
  id: string;
  name: string;
  stargazerCount: number;
  updatedAt: string;
  url: string;
  description?: string;
}

interface RepositoryListProps {
  repositories: any[];
}

const RepoList: React.FC<RepositoryListProps> = ({ repositories }) => {
  const formattedRepositories = repositories.map((repo: any) => {
    const node = repo.node ? repo.node : repo;
    return {
      id: node.id,
      name: node.name,
      stargazerCount: node.stargazerCount,
      updatedAt: node.updatedAt,
      url: node.url,
      description: node.description,
    };
  });
  return (
    <ul>
      {formattedRepositories.map((repo: RepositoryNode) => (
        <li key={repo.id}>
          <Link to={`/repository/${repo.id}`}>
            {repo.name} - {repo.stargazerCount} stars -{" "}
            {new Date(repo.updatedAt).toLocaleDateString()} -{" "}
            {repo.description && <span>{repo.description}</span>}
          </Link>
          <a href={repo.url} target="_blank" >
            GitHub
          </a>
        </li>
      ))}
    </ul>
  );
};

export default RepoList;
