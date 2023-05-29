import { Socket, io } from "socket.io-client";
import {
  Accessor,
  ParentComponent,
  createContext,
  createSignal,
  onCleanup,
  useContext,
} from "solid-js";

type SocketType = ReturnType<typeof io>;

const URL = import.meta.env.VITE_SOCKETIO_URL;

type ContextType = [
  Accessor<SocketType>,
  {
    connect: () => void;
    disconnect: () => void;
  }
];

const socketContext = createContext<ContextType>();

export const SocketProvider: ParentComponent<{}> = (props) => {
  const [socket] = createSignal(
    io(URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 5000,
      autoConnect: false,
    })
  );

  onCleanup(() => {
    socket().close();
  });

  const manager = [
    socket as Accessor<SocketType>,
    {
      connect: () => {
        socket().connect();
      },
      disconnect: () => {
        socket().disconnect();
      },
    },
  ];

  return (
    // @ts-expect-error
    <socketContext.Provider value={manager}>
      {props.children}
    </socketContext.Provider>
  );
};

export function useSocket() {
  const ctx = useContext(socketContext);
  if (!ctx) {
    throw new Error("useSession must be used within an AuthProvider");
  }
  return ctx;
}
