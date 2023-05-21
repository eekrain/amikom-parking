import type { Component } from "solid-js";
import { Link, useRoutes, useLocation } from "@solidjs/router";
import { routes } from "./routes";
import { Toaster } from "solid-toast";

const App: Component = () => {
  const location = useLocation();
  const Route = useRoutes(routes);

  return (
    <>
      <Toaster position="bottom-center" gutter={8} />
      <main>
        <Route />
      </main>
    </>
  );
};

export default App;
