import { createForm } from "@felte/solid";
import { LoginSchema, loginSchema } from "../types/login";
import { validator } from "@felte/validator-zod";
import tippyReporter from "@felte/reporter-tippy";
import { createEffect, Component } from "solid-js";
import wretch from "wretch";
import toast from "solid-toast";
import authStore from "../state/auth";

const Login: Component<{}> = (props) => {
  const {
    form,
    errors,
    data: felteData,
  } = createForm<LoginSchema>({
    initialValues: {
      username: "",
      password: "",
    },
    extend: [
      validator({ schema: loginSchema }),
      tippyReporter({
        tippyProps: {
          theme: "error",
          arrow: true,
        },
      }),
    ],
    onSubmit: async (values) => {
      console.log("🚀 ~ file: login.tsx:35 ~ Login ~ values:", values);

      const login = await wretch(`/auth`)
        .post({ username: values.username, password: values.password })
        .badRequest((error) => {
          toast.error(error.message);
        })
        .unauthorized((error) => {
          toast.error(error.message);
        })
        .json<{ status?: boolean; message: string }>((val) => val)
        .catch((error) => {
          console.log("🚀 ~ file: login.tsx:39 ~ onSubmit: ~ error:", error);
          toast.error("Error saat mencoba masuk");
          return { message: "Error saat mencoba masuk", status: false };
        });

      if (login.status === true) {
        toast.success(login.message);
        authStore.setLoggedIn();
        window.location.replace("/");
      }
    },
  });

  createEffect(() => {
    console.log(
      "🚀 ~ file: login.tsx:33 ~ createEffect ~ felteData():",
      felteData()
    );
  });

  return (
    <div class="w-full min-h-screen flex items-center justify-center bg-slate-100">
      <div class="w-full lg:max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="px-6 py-4">
          <div class="flex justify-center mx-auto">
            <img
              class="w-auto h-7 sm:h-8 md:h-12"
              src="/image/parking_logo.png"
              alt="Amikom Parking Logo"
            />
          </div>

          <h3 class="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Welcome Back
          </h3>

          <p class="mt-1 text-center text-gray-500 dark:text-gray-400">Login</p>

          <form use:form>
            <div class="w-full mt-4">
              <input
                name="username"
                class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Username"
                aria-label="Username"
              />
            </div>

            <div class="w-full mt-4">
              <input
                name="password"
                class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Password"
                aria-label="Password"
              />
            </div>

            <div class="flex items-center justify-end mt-4">
              <button
                type="submit"
                class="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
