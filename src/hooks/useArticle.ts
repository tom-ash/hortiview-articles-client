import { useQuery } from "@tanstack/react-query";
import { ArticlesShowItem } from "../types";
import { GET_ARTICLE } from "../graphql/queries/GET_ARTICLE";

export const useArticle = (id: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [GET_ARTICLE, { id }],
  });

  return { data, isLoading, error } as {
    data: { article: ArticlesShowItem } | undefined;
    isLoading: boolean;
    error: Error | null;
  };
};
