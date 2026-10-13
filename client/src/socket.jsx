import { useMemo } from "react";
import io from "socket.io-client";
import { server } from "./contants/config";
import { SocketContext } from "./socketContext";

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => {
    const token = localStorage.getItem("patrachar-token");
    return io(server, {
      withCredentials: true,
      transports: ["websocket"],
      auth: {
        token,
      },
      extraHeaders: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider };
