import React, { memo } from "react";
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
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "0.85rem",
          backgroundColor: sameSender ? "#e8f0ff" : "transparent",
          color: "#0f172a",
          borderRadius: "8px",
          position: "relative",
          border: sameSender ? "1px solid #bfdbfe" : "1px solid transparent",
        }}
      >
        {/* <Stack direction="row" spacing={1}>
          <img
            src={avatar}
            alt="Avatar"
            style={{ width: "3rem", height: "3rem", borderRadius: "50%" }}
          />
        </Stack> */}
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
              boxShadow: "0 0 0 3px white",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
