import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { smapleNotification } from "../../contants/sampleData";
import { useAcceptFriendReqMutation, useGetNotificationQuery } from "../../redux/api/api.js";
import { useErrors, useMutationHokk } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotifications } from "../../redux/reducer/msc.js";
import toast from "react-hot-toast";


const Notifications = () => {
  const {isNotifications}=useSelector((state)=>state.msc);
  const {isLoading,data,error,isError}=useGetNotificationQuery();
  const dispatch=useDispatch();
  // console.log(data.allRequest);
  const [acceptFrndReq]=useMutationHokk(useAcceptFriendReqMutation);
  const friendRequestHandler = async(_id, accept) => {
    // console.log("Request Accepted", id);
    // console.log(_id, accept);
    await acceptFrndReq( `Accepting Friend Request..`,{requestId:_id,accept})
    
  };

  const closeHandler=()=>dispatch(setIsNotifications(false));
  useErrors([{isError,error}]);
  return (
    <Dialog open={isNotifications} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle textAlign={"center"}>Notifications</DialogTitle>
        {
          isLoading?<Skeleton/>:<>
          {data?.allRequest?.length > 0 ? (
          data.allRequest.map(({ sender, _id }) => (
            <NotificationItem
              key={_id}
              sender={sender}
              _id={_id}
              handler={friendRequestHandler}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>No Notifications</Typography>
        )}</>
        }
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
          // onClick={() => handler({ _id, accept: true })}
          onClick={() => handler(_id, true)}

        >
          Accept
        </Button>
        <Button
          variant="contained"
          onClick={() => handler(_id, false)}

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
