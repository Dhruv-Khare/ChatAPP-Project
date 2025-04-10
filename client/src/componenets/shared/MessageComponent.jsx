import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../contants/color";
import moment from "moment";
import { fileFormate } from "../../lib/features";
import RenderAttatchment from "./RenderAttatchment";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attatchements = [], createdAt } = message;
  const sameSender = sender._id == user._id;

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
      {attatchements.length > 0 &&
        attatchements.map((attatchement, index) => {
          const url = attatchement.url;
          const file = fileFormate(url);
          return (
            <Box key={index}>
              <a href={url} target="_blank" download style={{ color: "black" }}>
                {RenderAttatchment(file, url)}
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
