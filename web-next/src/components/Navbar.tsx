import type { Component } from "solid-js";
import authStore from "../state/auth";
import wretch from "wretch";

const linkClasses = {
  default:
    "text-gray-800 transition-colors duration-300 transform border-b-2 mx-1.5 sm:mx-6",
  active: "dark:text-gray-200  border-blue-500",
  inactive:
    "border-transparent hover: dark:hover:text-gray-200 hover:border-blue-500",
};

const Navbar: Component<{ currentUrl: string }> = (props) => {
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
            classList={{
              [linkClasses.default]: true,
              [linkClasses.active]: props.currentUrl === "/",
              [linkClasses.inactive]: props.currentUrl !== "/",
            }}
          >
            QR Scan
          </a>
          <a
            href="/history"
            classList={{
              [linkClasses.default]: true,
              [linkClasses.active]: props.currentUrl === "/history",
              [linkClasses.inactive]: props.currentUrl !== "/history",
            }}
          >
            History
          </a>
        </div>

        <button
          onClick={async () => {
            const logout = await wretch(`/auth`)
              .delete()
              .json<{ message: string }>((val) => val)
              .catch((error) => {
                console.log(
                  "🚀 ~ file: login.tsx:39 ~ onSubmit: ~ error:",
                  error
                );
                return { message: "Error saat mencoba logout", status: false };
              });
            window.location.reload();
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
