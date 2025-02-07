import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { ModuleBase } from "../Base/ModuleBase";
import { BaseProps } from "../Base/types/BaseTypes";
import i18n from "../i18n";
import { RouteConfig } from "./RouteConfig";
import { QueryClient, QueryClientProvider, QueryFunction } from "@tanstack/react-query";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { DocumentNode } from "graphql";

interface QueryVariables {
  [key: string]: any;
}
type QueryKey = readonly [DocumentNode, QueryVariables?];

// TODO: Move to .env
const API_GRAPHQL_ENDPOINT = "http://localhost:3000/graphql";

const apolloClient = new ApolloClient({
  uri: API_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const queryFn: QueryFunction = async ({ queryKey }) => {
  const [query, variables] = queryKey as QueryKey;

  const { data } = await apolloClient.query({
    query,
    variables,
  });

  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      refetchOnWindowFocus: false,
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 60 * 1000, // 60 seconds
      retry: false,
      queryFn,
    },
  },
});

function App(customProps: Readonly<BaseProps>) {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ModuleBase
            props={customProps}
            requiredProps={[
              "token",
              "basePath",
              "navigateTo",
              "sourcePath",
              "currentLanguage",
            ]}
            routes={RouteConfig}
          />
        </QueryClientProvider>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
