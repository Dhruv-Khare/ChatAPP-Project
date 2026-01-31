// import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Drawer, Grid, Skeleton } from "@mui/material";
import ChatList from "../specific/ChatList";
import { sampleChats } from "../../contants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "../../redux/reducer/msc";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { getSocket } from "../../socket";
import { NEW_MESSAGE_ALERT, NEW_REQUEST } from "../../contants/event";
import { useCallback, useEffect } from "react";
import {
  incrementNotification,
  setNewMessageAlert,
} from "../../redux/reducer/chat";
import { getorSaveLocalstorage } from "../../lib/features";

const AppLayout = () => (WrappedComponent) => {
  const WithLayout = (props) => {
    const params = useParams();
    const chatId = params.chatID;
    const dispatch = useDispatch();

    const { isMobile } = useSelector((state) => state.msc);
    const { user } = useSelector((state) => state.auth);
    const { newMessageAlert } = useSelector((state) => state.chat);

    const socket = getSocket();
    // console.log(socket.id);

    const { data, isLoading, isError, error, refetch } = useMyChatsQuery("");
    useErrors([{ isError, error }]);

    useEffect(()=>{
      getorSaveLocalstorage({key:NEW_MESSAGE_ALERT,value:newMessageAlert});
    },[newMessageAlert])

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete Chat ", _id, groupChat);
    };

    const handleMobileClose = () => dispatch(setIsMobile(false));

    const newMessagesAlertHandler = useCallback((data) => {
      if(data.chatId===chatId) return ;
      dispatch(setNewMessageAlert(data));
      // const id=data.chatId;
      // console.log("New Message Alert",id);
    }, [chatId]);
    const newRequestHandler = useCallback(() => {
      dispatch(incrementNotification());
    }, []);

    const eventArr = {
      [NEW_MESSAGE_ALERT]: newMessagesAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
    };

    useSocketEvents(socket, eventArr);

    return (
      <>
        <Title />
        <Header />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessageAlert}
            />
          </Drawer>
        )}
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            height={"100%"}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessageAlert}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };

  WithLayout.displayName = `WithLayout(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;
  return WithLayout;
};

export default AppLayout;
