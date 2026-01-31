import React from "react";
import { TransformImage } from "../../lib/features";
import { FileOpen as FileOpenIcon } from "@mui/icons-material";

const RenderAttachment = (file, url) => {
  switch (file) {
    case "video":
      return <video src={url} preload="none" width={"200px"} controls></video>;
    case "audio":
      return <audio src={url} preload="none" controls></audio>;
    case "image":
      return (
        <img
          src={TransformImage(url, 200)}
          alt="Image"
          width={"200px"}
          height={"150px "}
          style={{
            objectFit: "contain",
          }}
        />
      );

    default:
      return <FileOpenIcon />;
  }
};

export default RenderAttachment;
