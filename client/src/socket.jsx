import { Children, createContext, useContext, useMemo } from "react";
import io from "socket.io-client";

const SocketContext=createContext();

const getSocket=()=>useContext(SocketContext);

const SocketProvider=({children})=> {
    const socket=useMemo(()=>io("https://15-207-16-76.nip.io",{withCredentials:true}),[]);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export {SocketProvider,getSocket};