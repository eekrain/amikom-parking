import { Component, Show, createEffect, createSignal } from "solid-js";
import { Outlet, useLocation, useNavigate } from "@solidjs/router";
import authStore from "../state/auth";
import NavBar from "./Navbar";
import { useSocket } from "../utils/socket";
import Modal from "./Modal";
import { makeTimer } from "@solid-primitives/timer";
import { createAudio, AudioState } from "@solid-primitives/audio";

const AuthGuard: Component<{}> = (props) => {
  const navigate = useNavigate();
  const { isLoggedIn } = authStore;

  const [socket, { connect, disconnect }] = useSocket();

  const [isOpen, setOpen] = createSignal(false);
  const [message, setMessage] = createSignal("");
  const [isValid, setValid] = createSignal(false);

  const [volume] = createSignal(1);
  const [playSuccess, setPlaySuccess] = createSignal(false);
  createAudio("/music/success.ogg", playSuccess, volume);
  const [playError, setPlayError] = createSignal(false);
  createAudio("/music/error.ogg", playError, volume);

  const test = () => {
    setOpen(true);

    makeTimer(
      () => {
        setOpen(false);
      },
      3000,
      setTimeout
    );
  };

  createEffect(() => {
    const sock = socket();
    if (isLoggedIn()) {
      connect();

      sock.on("connect", () => {
        console.log("🚀 ~ file: App.tsx:11 ~ isConnected: on connect");
      });
      sock.on("disconnect", () => {
        console.log("🚀 ~ file: App.tsx:11 ~ isConnected: on disconnect");
      });

      sock.on(
        "parking-status",
        (data: { status: boolean; message: string }) => {
          console.log(
            "🚀 ~ file: AuthGuard.tsx:30 ~ createEffect ~ text:",
            data
          );
          setMessage(data.message);
          setValid(data.status);
          setOpen(true);
          makeTimer(
            () => {
              if (data.status) setPlaySuccess(true);
              else setPlayError(true);
            },
            300,
            setTimeout
          );
          makeTimer(
            () => {
              setOpen(false);
              setPlaySuccess(false);
              setPlayError(false);
            },
            3000,
            setTimeout
          );
        }
      );
    } else {
      console.log("🚀 ~ file: AuthGuard.tsx:17 ~ createEffect ~ Logged Out");
      navigate("/login", { replace: true });

      disconnect();
    }
  });

  return (
    <Show when={isLoggedIn()} fallback={<Outlet />}>
      <Modal open={isOpen()} w="md">
        <div class="flex flex-col items-center">
          <span
            classList={{
              "text-green-600": isValid(),
              "text-red-600": !isValid(),
            }}
          >
            <Show
              when={isValid()}
              fallback={
                <svg
                  fill="currentColor"
                  stroke-width="0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1024 1024"
                  height="10em"
                  width="10em"
                  style="overflow: visible; --darkreader-inline-fill:currentColor;"
                  data-darkreader-inline-fill=""
                >
                  <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path>
                  <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                </svg>
              }
            >
              <svg
                fill="currentColor"
                stroke-width="0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                height="10em"
                width="10em"
                style="overflow: visible; --darkreader-inline-fill:currentColor;"
                data-darkreader-inline-fill=""
              >
                <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path>
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
              </svg>
            </Show>
          </span>
          <div>{message()}</div>
        </div>
      </Modal>
      <NavBar />
      <div class="min-h-screen bg-slate-100 pt-4">
        <main class="container mx-auto">
          <Outlet />
        </main>
      </div>
    </Show>
  );
};

export default AuthGuard;
