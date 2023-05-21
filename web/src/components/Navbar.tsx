import { Component } from "solid-js";
import authStore from "../state/auth";
import { useNavigate } from "@solidjs/router";

const Navbar: Component<{}> = (props) => {
  const navigate = useNavigate();
  return (
    <nav class="bg-white shadow dark:bg-gray-800">
      <div class="container flex items-center justify-between p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <a href="/">
          <img
            class="w-auto h-6"
            src="/image/parking_logo.png"
            alt="Amikom Parking Logo"
          />
        </a>
        <div>
          <a
            href="/"
            class="text-gray-800 transition-colors duration-300 transform dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6"
          >
            QR Scan
          </a>
          <a
            href="#"
            class="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            History
          </a>
        </div>

        <button
          onClick={() => {
            authStore.setLoggedOut();
            navigate("/login", { replace: true });
          }}
          type="button"
          class="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
