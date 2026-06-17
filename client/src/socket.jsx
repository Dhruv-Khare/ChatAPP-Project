import { useMemo } from "react";
import io from "socket.io-client";
import { server } from "./contants/config";
import { SocketContext } from "./socketContext";

const SocketProvider=({children})=> {
    const socket = useMemo(
  () =>
    io(server, {
      withCredentials: true,
      transports: ["websocket"],
    }),
  []
);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export {SocketProvider};
