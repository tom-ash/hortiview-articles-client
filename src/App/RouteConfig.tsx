import { RouteDefinition } from "../Base/types/BaseTypes";
import { Showcase } from "../pages/Testpages/Showcase";
import { Testpage } from "../pages/Testpages/Testpage";

export const RouteConfig: RouteDefinition = {
  Home: { path: "/", element: <Showcase /> },
  Testpage: { path: "/testpage", element: <Testpage />, translationKey: "testpage"},
};
