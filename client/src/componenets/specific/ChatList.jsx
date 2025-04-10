import { Stack } from "@mui/material";
// import React from "react";
import ChatItem from "../shared/ChatItem";
// import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatID,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatID: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}>
      {chats?.map((data, index) => {
        const { avatar, _id, name, groupChat, members } = data;
        // const sameSender = chatID === _id;
        const isOnline = members?.some((member) =>
          onlineUsers.includes(member)
        );
        const newMessageAlert = newMessagesAlert.find(
          ({ chatID }) => chatID === _id
        );
        return (
          <ChatItem
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            sameSender={chatID === _id}
            handleDeleteChat={handleDeleteChat}
          />
          // <div key={_id}>{data}</div>
        );
      })}
    </Stack>
  );
};

export default ChatList;
