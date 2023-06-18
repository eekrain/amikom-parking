import { createSessionStorage } from "@solid-primitives/storage";

const [auth, setAuth, methods] = createSessionStorage({
  api: sessionStorage,
  prefix: "my-app",
});

const authStore = {
  isLoggedIn: () => {
    const status = auth.auth;
    if (status === "true") return true;
    return false;
  },
  setLoggedIn: () => {
    setAuth("auth", "true");
  },
  setLoggedOut: () => methods.clear(),
};
export default authStore;
