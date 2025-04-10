// import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import ChatList from "../specific/ChatList";
import { sampleChats } from "../../contants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";

const AppLayout = () => (WrappedComponent) => {
  const WithLayout = (props) => {
    const params = useParams();
    const chatID = params.chatID;

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete Chat ", _id, groupChat);
    };

    return (
      <>
        <Title />
        <Header />

        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            height={"100%"}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <ChatList
              chats={sampleChats}
              chatID={chatID}
              handleDeleteChat={handleDeleteChat}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} />
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
            <Profile />
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
