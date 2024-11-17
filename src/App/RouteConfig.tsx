import { RouteDefinition } from "../Base/types/BaseTypes";
import { ArticlesIndex } from "../pages/Articles/Index";
import { Home } from "../pages/Home";

export const RouteConfig: RouteDefinition = {
  Home: { path: "/", element: <Home /> },
  ArticlesIndex: { path: "/articles", element: <ArticlesIndex />, translationKey: "articles"},
};
