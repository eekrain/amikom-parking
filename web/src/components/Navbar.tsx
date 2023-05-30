import { Component, createEffect } from "solid-js";
import authStore from "../state/auth";
import { useNavigate, useMatch, A } from "@solidjs/router";

const linkClasses = {
  default:
    "text-gray-800 transition-colors duration-300 transform border-b-2 mx-1.5 sm:mx-6",
  active: "dark:text-gray-200  border-blue-500",
  inactive:
    "border-transparent hover: dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6",
};

const Navbar: Component<{}> = (props) => {
  const navigate = useNavigate();
  const isQRPage = useMatch(() => "/");
  const isHistoryPage = useMatch(() => "/history");

  createEffect(() => {
    console.log(
      "🚀 ~ file: Navbar.tsx:13 ~ createEffect ~ isHistoryPage():",
      isHistoryPage()
    );
  });
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
          <A
            href="/"
            classList={{
              [linkClasses.default]: true,
              [linkClasses.active]: Boolean(isQRPage()),
              [linkClasses.inactive]: !Boolean(isQRPage()),
            }}
          >
            QR Scan
          </A>
          <A
            href="/history"
            classList={{
              [linkClasses.default]: true,
              [linkClasses.active]: Boolean(isHistoryPage()),
              [linkClasses.inactive]: !Boolean(isHistoryPage()),
            }}
          >
            History
          </A>
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
