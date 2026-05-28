import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../contants/color";
import moment from "moment";
import { fileFormate } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import {motion} from "framer-motion"

const MessageComponent = ({ message, user }) => {

  // console.log(message);
  const { sender, content, attachements = [], createdAt } = message;
  const sameSender = (sender?._id || sender?.id) === user?._id;
  const timeAgo = moment(createdAt).fromNow();

  return (
    <motion.div
      initial={{opacity:0, x:"-100%"}}
      whileInView={{opacity:1,x:0}}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: sameSender ? "#2563eb" : "white",
        color: sameSender ? "white" : "#0f172a",
        padding: "0.65rem 0.85rem",
        borderRadius: sameSender ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
        width: "fit-content",
        maxWidth: "min(75%, 34rem)",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
        border: sameSender ? "none" : "1px solid rgba(148, 163, 184, 0.24)",
      }}
    >
      {!sameSender && (
        <Typography color={lightBlue} fontWeight={"600"} variant={"caption"}>
          {sender.name}
        </Typography>
      )}
      {content && <Typography sx={{ wordBreak: "break-word" }}>{content}</Typography>}

      {/*Attatchment */}
      {attachements.length > 0 &&
        attachements.map((attachement, index) => {
          const url = attachement.url;
          const file = fileFormate(url);
          return (
            <Box key={index}>
              <a href={url} target="_blank" download style={{ color: "black" }}>
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}
      <Typography
        variant={"caption"}
        sx={{ color: sameSender ? "rgba(255,255,255,0.72)" : "text.secondary" }}
      >
        {timeAgo}
      </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);
