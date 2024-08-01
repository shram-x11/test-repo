import { createStore, createEvent } from "effector";

export const setRepositories = createEvent<any[]>();
export const setQuery = createEvent<string>();
export const setPageInfo = createEvent<{
  first: number;
  after: string | null;
  totalCount?: number;
  endCursor?: string | null;
}>();

export const $repositories = createStore<any[]>([]).on(
  setRepositories,
  (_, repositories) => repositories
);

export const $query = createStore<string>("").on(setQuery, (_, query) => query);

export const $pageInfo = createStore<{
  first: number;
  after: string | null;
  totalCount: number | null;
  endCursor: string | null;
}>({
  first: 10,
  after: null,
  totalCount: 0,
  endCursor: null,
}).on(setPageInfo, (_, pageInfo) => pageInfo);
