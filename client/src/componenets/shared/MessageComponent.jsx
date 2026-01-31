import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../contants/color";
import moment from "moment";
import { fileFormate } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {

  // console.log(message);
  const { sender, content, attachements = [], createdAt } = message;
  const sameSender = sender.id|| sender._id == user._id;
  const timeAgo = moment(createdAt).fromNow();

  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        padding: "0.5rem",
        borderRadius: "5px",
        width: "fit-content",
      }}
    >
      {!sameSender && (
        <Typography color={lightBlue} fontWeight={"600"} variant={"caption"}>
          {sender.name}
        </Typography>
      )}
      {content && <Typography>{content}</Typography>}

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
      <Typography variant={"caption"} color={"text.secondary"}>
        {timeAgo}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
