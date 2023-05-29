import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";

export const routes: RouteDefinition[] = [
  {
    path: "/login",
    component: lazy(() => import("./pages/Login")),
  },
  {
    path: "/",
    component: lazy(() => import("./components/AuthGuard")),
    children: [
      {
        path: "/",
        component: lazy(() => import("./pages/QRCode")),
      },
      {
        path: "/history",
        component: lazy(() => import("./pages/History")),
      },
    ],
  },
  {
    path: "**",
    component: lazy(() => import("./components/errors/404")),
  },
];
