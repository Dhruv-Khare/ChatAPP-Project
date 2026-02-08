import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { TransformImage } from "../../lib/features";

const UserItem = ({
  user,
  handler,
  handlerIsLoading,
  isAdded = false,
  styling = {},
}) => {
  const { name, _id, avatar } = user;
  // console.log(avatar);
  return (
    <ListItem>
      <Stack
        direction="row"
        spacing={"1rem"}
        alignItems="center"
        width={"100%"}
        {...styling}
      >
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: "webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {name}
        </Typography>
        <IconButton
          size="small"
          sx={{
            bgcolor: isAdded ? "error.main" : "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
          {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
