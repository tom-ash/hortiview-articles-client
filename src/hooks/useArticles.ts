import { useQuery } from "@tanstack/react-query";
import { ArticlesIndexItem } from "../types";
import { GET_ARTICLES } from "../graphql/queries/GET_ARTICLES";

export const useArticles = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [GET_ARTICLES],
  });

  return { data, isLoading, error } as {
    data: { articles: ArticlesIndexItem[] } | undefined;
    isLoading: boolean;
    error: Error | null;
  };
};
