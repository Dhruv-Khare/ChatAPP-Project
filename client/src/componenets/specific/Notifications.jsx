import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { smapleNotification } from "../../contants/sampleData";

const friendRequestHandler = (id, accept) => {
  console.log("Request Accepted", id);
};

const Notifications = () => {
  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle textAlign={"center"}>Notifications</DialogTitle>
        {smapleNotification.length > 0 ? (
          smapleNotification.map(({ sender, _id }) => (
            <NotificationItem
              key={_id}
              sender={sender}
              _id={_id}
              handler={friendRequestHandler}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>No Notifications</Typography>
        )}
      </Stack>
    </Dialog>
  );
};
const NotificationItem = memo(({ sender, _id, handler }) => {
  const name = sender.name;
  const avatar = sender.avatar;
  return (
    <ListItem>
      <Stack
        direction="row"
        spacing={"1rem"}
        alignItems="center"
        width={"100%"}
      >
        <Avatar src={avatar} alt={name} />
        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${name} sent you a friend request`}
        </Typography>
      </Stack>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
      >
        <Button
          variant="contained"
          onClick={() => handler({ _id, accept: true })}
        >
          Accept
        </Button>
        <Button
          variant="contained"
          onClick={() => handler({ _id, accept: false })}
          color="error"
        >
          Reject
        </Button>
      </Stack>
    </ListItem>
  );
});

NotificationItem.displayName = "NotificationItem";

export default Notifications;
