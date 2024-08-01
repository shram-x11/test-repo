import React, { useEffect } from "react";
import { useUnit } from "effector-react";
import { useQuery, gql } from "@apollo/client";
import {
  $repositories,
  setRepositories,
  $query,
  $pageInfo,
  setQuery,
  setPageInfo,
} from "../../shared/store/repositories";
import Search from "../../shared/components/Search";
import RepoList from "../../shared/components/RepoList";
import Pagination from "../../shared/components/Pagination";
import { GET_REPOSITORIES, GET_USER_REPOSITORIES } from "./api";

const Home = () => {
  const repositories = useUnit($repositories);
  const query = useUnit($query);
  const pageInfo = useUnit($pageInfo);

  const {
    loading: loadingRepos,
    error: errorRepos,
    data: dataRepos,
    refetch: refetchRepos,
  } = useQuery(GET_REPOSITORIES, {
    variables: { query, first: pageInfo.first, after: pageInfo.after },
    skip: !query,
  });

  const {
    loading: loadingUserRepos,
    error: errorUserRepos,
    data: dataUserRepos,
    refetch: refetchUserRepos,
  } = useQuery(GET_USER_REPOSITORIES, {
    variables: { first: pageInfo.first, after: pageInfo.after },
    skip: !!query,
  });

  useEffect(() => {
    if (dataRepos) {
      setRepositories(dataRepos.search.edges);
      setPageInfo({
        ...pageInfo,
        totalCount: dataRepos.search.repositoryCount,
      });
    } else if (dataUserRepos) {
      setRepositories(dataUserRepos.viewer.repositories.nodes);
      setPageInfo({
        ...pageInfo,
        totalCount: dataUserRepos.viewer.repositories.totalCount,
      });
    }
  }, [dataRepos, dataUserRepos]);

  const handleSearch = (query: string) => {
    setQuery(query);
    setPageInfo({ first: 10, after: null });
    if (query) {
      refetchRepos({ query, first: 10, after: null });
    } else {
      refetchUserRepos({ first: 10, after: null });
    }
  };

   const handlePageChange = (pageInfo: {
     first: number;
     after: string | null;
   }) => {
     setPageInfo(pageInfo);
     if (query) {
       refetchRepos({ query, first: pageInfo.first, after: pageInfo.after });
     } else {
       refetchUserRepos({ first: pageInfo.first, after: pageInfo.after });
     }
   };

   if (loadingRepos || loadingUserRepos) return <p>Loading...</p>;
   if (errorRepos) return <p>Error: {errorRepos.message}</p>;
   if (errorUserRepos) return <p>Error: {errorUserRepos.message}</p>;

  return (
    <div className="main">
      <Search onSearch={handleSearch} />
      <RepoList repositories={repositories} />
      {/* <Pagination
        totalCount={pageInfo.totalCount}
        currentPage={Math.ceil((pageInfo.after || 0) / pageInfo.first) + 1}
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
};

export default Home;
