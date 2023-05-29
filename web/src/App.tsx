import { Component, createSignal, onMount } from "solid-js";
import { Link, useRoutes, useLocation } from "@solidjs/router";
import { routes } from "./routes";
import { Toaster } from "solid-toast";
import { SocketProvider } from "./utils/socket";

const App: Component = () => {
  const location = useLocation();
  const Route = useRoutes(routes);

  return (
    <>
      <SocketProvider>
        <Toaster position="bottom-center" gutter={8} />
        <main>
          <Route />
        </main>
      </SocketProvider>
    </>
  );
};

export default App;
