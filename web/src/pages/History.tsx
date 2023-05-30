import { Component, For, Show, createResource, onMount } from "solid-js";
import wretch from "wretch";
import toast from "solid-toast";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import { createTimer } from "@solid-primitives/timer";
import { useSocket } from "../utils/socket";
dayjs.locale("id");
dayjs.extend(relativeTime);

interface History {
  id: number;
  mhs_nim: string;
  plat: string;
  date: string;
}

const getHistory = async (limit: string) => {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const hist = await wretch(
    `${import.meta.env.VITE_API_URL}/parking/history?limit=${limit}`
  )
    .get()
    .badRequest((error) => {
      toast.error(error.message);
    })
    .json((val) =>
      val.map((val) => ({ ...val, date: dayjs(val.date).fromNow() }))
    )
    .catch((error) => {
      console.log("🚀 ~ file: login.tsx:39 ~ onSubmit: ~ error:", error);
      toast.error("Error saat fetching history");
      return null;
    });
  console.log("🚀 ~ file: History.tsx:16 ~ getHistory ~ hist:", hist);

  return hist as History[] | null;
};

const limit = "1d";

const History: Component<{}> = (props) => {
  const [history, { refetch }] = createResource(limit, getHistory);
  const [socket, { connect, disconnect }] = useSocket();

  // refetch every 5 sec
  createTimer(
    () => {
      console.log("🚀 ~ file: History.tsx:58 ~ createTimer ~ refetch:");

      refetch();
    },
    5000,
    setInterval
  );

  onMount(() => {
    console.log("🚀 ~ file: History.tsx:63 ~ onMount ~ history():", history());

    const sock = socket();
    sock.on("parking-status", () => refetch());
  });

  return (
    <>
      <div class="flex flex-col items-center space-y-4">
        <Show
          when={Boolean(history())}
          fallback={<For each={[1, 2, 3, 4, 5]}>{() => <Skeleton />}</For>}
        >
          <For each={history()}>
            {(hist, i) => (
              <div class="w-[300px] lg:w-[500px] p-4 bg-white rounded-lg shadow-lg">
                <div class="flex justify-between items-center">
                  <div>
                    <div class="font-bold mb-2">{hist.plat}</div>
                    <div>{hist.mhs_nim}</div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-400">{hist.date}</span>
                    <span class="text-green-600">
                      <svg
                        fill="currentColor"
                        stroke-width="0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        height="2em"
                        width="2em"
                        style="overflow: visible; --darkreader-inline-fill:currentColor;"
                        data-darkreader-inline-fill=""
                      >
                        <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path>
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </For>
        </Show>
      </div>
    </>
  );
};

export default History;

const Skeleton: Component<{}> = (props) => {
  return (
    <div class="flex w-[300px] lg:w-[500px] mx-auto h-[88px] overflow-hidden p-4 bg-white rounded-lg shadow-lg animate-pulse dark:bg-gray-800">
      <div class="flex justify-between items-center w-full">
        <div>
          <p class="w-28 h-4 mb-3 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
          <p class="w-20 h-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
        </div>
        <div class="flex items-center space-x-2">
          <p class="w-20 h-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
          <span class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></span>
        </div>
      </div>
    </div>
  );
};
