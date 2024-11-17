import { RouteDefinition } from "../Base/types/BaseTypes";
import { ArticlesIndex } from "../pages/Articles/Index";
import { ArticlesShow } from "../pages/Articles/Show";
import { Home } from "../pages/Home";

export const RouteConfig: RouteDefinition = {
  Home: { path: "/", element: <Home /> },
  ArticlesIndex: {
    path: "/articles",
    element: <ArticlesIndex />,
    translationKey: "articles",
  },
  ArticlesShow: {
    path: "/articles/:id",
    element: <ArticlesShow />,
    translationKey: "articles",
  },
};
