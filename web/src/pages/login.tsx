import { createSignal } from "solid-js";
import authStore from "../state/auth";

export default function Login() {
  return (
    <section class="bg-gray-100 text-gray-700 p-8">
      <h1 class="text-2xl font-bold">Login</h1>

      <button
        class="border rounded-lg px-2 border-gray-900"
        onClick={() => authStore.setLoggedIn()}
      >
        Log In
      </button>

      <button
        class="border rounded-lg px-2 border-gray-900"
        onClick={() => authStore.setLoggedOut()}
      >
        Log Out
      </button>
    </section>
  );
}
