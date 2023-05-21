import { createSessionStorage } from "@solid-primitives/storage";

const [auth, setAuth, methods] = createSessionStorage({
  api: sessionStorage,
  prefix: "my-app",
});

const authStore = {
  auth,
  methods,
  setLoggedIn: () => {
    setAuth("auth", "true");
  },
  setLoggedOut: () => methods.clear(),
};
export default authStore;
