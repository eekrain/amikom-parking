import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  plugins: [
    mkcert({
      hosts: ["mydomain.com", "localhost"],
    }),
    solidPlugin(),
  ],
  server: {
    host: "mydomain.com",
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
