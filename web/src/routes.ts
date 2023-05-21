import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";

import Home from "./pages/home";
import AboutData from "./pages/about.data";
import Login from "./pages/login";

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/about",
    component: lazy(() => import("./pages/about")),
    data: AboutData,
  },
  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
];
