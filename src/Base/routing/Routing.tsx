import { Route, Routes, useRouteBuilder } from "../hooks/useBase";
import { RouteConfig } from "../types/BaseTypes";

/**
 * Component to handle the routing of the application (in combination with the host application)
 * @param basePath a base path for the routing (needs to be prepended to the route paths)
 * @returns the routes, that will be used by a router to handle the navigation
 */
export const Routing = ({
  basePath,
  routes,
}: {
  basePath: string;
  routes: RouteConfig[];
}) => {
  const buildRoute = useRouteBuilder(basePath);
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={buildRoute(route.path)}
          element={route.element}
        />
      ))}
    </Routes>
  );
};
