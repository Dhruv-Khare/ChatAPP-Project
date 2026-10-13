import { Box, Stack, Typography } from "@mui/material";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack
      width={w}
      direction={"column"}
      overflow={"auto"}
      height={"100%"}
      sx={{ p: 1, gap: 0.5 }}
    >
      <Box sx={{ px: 1.25, py: 1.5 }}>
        <Typography variant="overline" color="text.secondary" fontWeight={800}>
          Messages
        </Typography>
        <Typography variant="h6" fontWeight={800}>
          Chats
        </Typography>
      </Box>
      {(chats || []).length > 0 ? (
        chats.map((data, index) => {
          const { avatar, _id, name, groupChat, members } = data;
          const isOnline = members?.some((member) =>
            onlineUsers.includes(member)
          );
          const newMessageAlert = newMessagesAlert.find(
            ({ chatId: alertChatId }) => alertChatId === _id
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
              sameSender={chatId === _id}
              handleDeleteChat={handleDeleteChat}
            />
          );
        })
      ) : (
        <Typography
          textAlign={"center"}
          color="text.secondary"
          variant="body2"
          sx={{ py: 4 }}
        >
          No chats yet. Find people using Search!
        </Typography>
      )}
    </Stack>
  );
};

export default ChatList;
