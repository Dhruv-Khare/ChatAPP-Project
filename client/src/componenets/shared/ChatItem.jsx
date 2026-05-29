import { memo } from "react";
import { Link } from "../styled/StyledComponent";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";
import { motion } from "framer-motion";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{
        padding: "0",
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <motion.div
       initial={{opacity:0, x:"-100%"}}
      whileInView={{opacity:1,x:0}}
      transition={{delay:index*0.2}}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            p: "0.85rem",
            bgcolor: sameSender ? "action.selected" : "transparent",
            color: "text.primary",
            borderRadius: 2,
            position: "relative",
            border: "1px solid",
            borderColor: sameSender ? "primary.light" : "transparent",
          }}
        >
          <AvatarCard avatar={avatar} />

          <Stack minWidth={0}>
            <Typography fontWeight={700} noWrap>{name}</Typography>
            {newMessageAlert && (
              <Typography variant="caption" color="primary.main" fontWeight={700}>
                {newMessageAlert.count} new message{newMessageAlert.count > 1 ? "s" : ""}
              </Typography>
            )}
          </Stack>
          {isOnline && (
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                boxShadow: (theme) =>
                  `0 0 0 3px ${theme.palette.background.paper}`,
                position: "absolute",
                top: "50%",
                right: "1rem",
                transform: "translateY(-50%)",
              }}
            />
          )}
        </Box>
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
