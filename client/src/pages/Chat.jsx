// import React from "react";
import { IconButton, Stack } from "@mui/material";
import Applayout from "../componenets/layout/Applayout.jsx";
import { useRef } from "react";
import { grayColor, orange } from "../contants/color.jsx";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../componenets/styled/StyledComponent.jsx";
import FileMenu from "../componenets/Dialog/FileMenu.jsx";
import { sampleMessage } from "../contants/sampleData.js";
import MessageComponent from "../componenets/shared/MessageComponent.jsx";

const user = {
  _id: "1",
  name: "Dhruv Khare",
};

const Chat = () => {
  const containerRef = useRef(null);
  // const fileMenuRef = useRef(null);
  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {/* <ChatHeader /> */}
        {sampleMessage.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </Stack>
      <form
        style={{
          height: "10%",
        }}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1rem",
              rotate: "30deg",
            }}
            // ref={fileMenuRef}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox placeholder="type massege here" />
          <IconButton
            type="submit"
            sx={{
              bgcolor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem ",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </>
  );
};

const EnhancedChat = Applayout()(Chat);
export default EnhancedChat;
