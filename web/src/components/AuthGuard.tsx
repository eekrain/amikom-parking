import { Component, Show, createEffect } from "solid-js";
import { Outlet, useLocation, useNavigate } from "@solidjs/router";
import authStore from "../state/auth";
import NavBar from "./Navbar";

const AuthGuard: Component<{}> = (props) => {
  const navigate = useNavigate();
  const { isLoggedIn } = authStore;

  createEffect(() => {
    if (!isLoggedIn()) {
      console.log("🚀 ~ file: AuthGuard.tsx:17 ~ createEffect ~ Logged Out");
      navigate("/login", { replace: true });
    }
  });

  return (
    <Show when={isLoggedIn()} fallback={<Outlet />}>
      <NavBar />
      <div class="min-h-screen bg-slate-100">
        <main class="container mx-auto">
          <Outlet />
        </main>
      </div>
    </Show>
  );
};

export default AuthGuard;
