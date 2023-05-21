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
      <Outlet />
    </Show>
  );
};

export default AuthGuard;
