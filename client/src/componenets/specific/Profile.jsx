// import { Avatar, Stack, Typography } from "@mui/material";
// import React from "react";
// import {
//   Face as FaceIcon,
//   AlternateEmail as UserNameIcon,
//   CalendarMonth as CalenderIcon,
// } from "@mui/icons-material";
// import moment from "moment";
// import { TransformImage } from "../../lib/features";
// const Profile = ({user}) => {
//   return (
//     <Stack direction={"column"} spacing={"2rem"} alignItems={"center"}>
//       <Avatar src={TransformImage(user?.avatar?.url)} alt={user?.name}
//         sx={{
//           width: 200, 
//           height: 200,
//           objectFit: "contain",
//           marginBottom: "1rem",
//           border: "5px solid white ",
//         }}
//       />

//       <ProfileCard heading={"BIO"} text={user?.bio} />
//       <ProfileCard
//         heading={"UserName"}
//         text={user?.userName}
//         Icon={<UserNameIcon />}
//       />
//       <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
//       <ProfileCard
//         heading={"Joined"}
//         text={moment(user?.createdAt).fromNow()}
//         Icon={<CalenderIcon />}
//       />
//     </Stack>
//   );
// };

// const ProfileCard = ({ text, Icon, heading }) => {
//   return (
//     <Stack
//       direction={"row"}
//       alignItems={"center"}
//       spacing={"1rem"}
//       color={"white "}
//       textAlign={"center"}
//     >
//       {Icon && Icon}
//       <Stack>
//         <Typography variant="body1">{text}</Typography>
//         <Typography color={"gray"} variant="caption">
//           {heading}
//         </Typography>
//       </Stack>
//     </Stack>
//   );
// };
// export default Profile;
import {
  Avatar,
  Dialog,
  Stack,
  Typography,
} from "@mui/material";

import React, { useState } from "react";

import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalenderIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

import moment from "moment";

import { TransformImage } from "../../lib/features";

const Profile = ({ user }) => {
  const [open, setOpen] = useState(false);

  const imageUrl = TransformImage(user?.avatar?.url, 500);

  return (
    <>
      <Stack
        direction={"column"}
        spacing={"2rem"}
        alignItems={"center"}
      >
        <Avatar
          src={imageUrl}
          alt={user?.name}
          onClick={() => setOpen(true)}
          sx={{
            width: 200,
            height: 200,
            objectFit: "cover",
            marginBottom: "1rem",
            border: "5px solid white",
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.03)",
            },
          }}
        />

        <ProfileCard heading={"BIO"} text={user?.bio} />

        <ProfileCard
          heading={"UserName"}
          text={user?.userName}
          Icon={<UserNameIcon />}
        />

        <ProfileCard
          heading={"Name"}
          text={user?.name}
          Icon={<FaceIcon />}
        />

        <ProfileCard
          heading={"Joined"}
          text={moment(user?.createdAt).fromNow()}
          Icon={<CalenderIcon />}
        />
      </Stack>

      {/* Fullscreen Image Dialog */}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
            boxShadow: "none",
            overflow: "hidden",
          },
        }}
      >
        <img
          src={imageUrl}
          alt="Full Profile"
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            objectFit: "contain",
            borderRadius: "10px",
          }}
        />
      </Dialog>
    </>
  );
};

const ProfileCard = ({ text, Icon, heading }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      color={"white"}
      textAlign={"center"}
    >
      {Icon && Icon}

      <Stack>
        <Typography variant="body1">
          {text}
        </Typography>

        <Typography
          color={"gray"}
          variant="caption"
        >
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Profile;