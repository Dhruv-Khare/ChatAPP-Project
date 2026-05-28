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
  Box,
  Dialog,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import React, { useState } from "react";

import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalenderIcon,
  Info as InfoIcon,
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
        spacing={2}
        alignItems={"center"}
        sx={{ height: "100%" }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Box
            sx={{
              height: 104,
              background:
                "linear-gradient(135deg, #2563eb 0%, #0f766e 100%)",
            }}
          />
          <Stack alignItems="center" sx={{ px: 2, pb: 2, mt: -7 }}>
            <Avatar
              src={imageUrl}
              alt={user?.name}
              onClick={() => setOpen(true)}
              sx={{
                width: 132,
                height: 132,
                objectFit: "cover",
                border: "5px solid white",
                cursor: "pointer",
                boxShadow: "0 16px 40px rgba(15, 23, 42, 0.18)",
                transition: "0.2s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
            />
            <Typography variant="h6" fontWeight={800} mt={1.5} noWrap>
              {user?.name || "User"}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              @{user?.userName || "username"}
            </Typography>
          </Stack>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            width: "100%",
            p: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack spacing={1.75}>
            <ProfileCard
              heading={"Bio"}
              text={user?.bio || "No bio added yet"}
              Icon={<InfoIcon />}
            />

            <Divider />

            <ProfileCard
              heading={"Username"}
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
              text={user?.createdAt ? moment(user?.createdAt).fromNow() : "Recently"}
              Icon={<CalenderIcon />}
            />
          </Stack>
        </Paper>
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
      spacing={1.5}
      textAlign={"left"}
      sx={{ width: "100%" }}
    >
      {Icon && (
        <Box
          sx={{
            width: 38,
            height: 38,
            flex: "0 0 auto",
            display: "grid",
            placeItems: "center",
            borderRadius: 2,
            bgcolor: "rgba(37, 99, 235, 0.08)",
            color: "primary.main",
          }}
        >
          {Icon}
        </Box>
      )}

      <Stack minWidth={0}>
        <Typography variant="body1" fontWeight={700} noWrap>
          {text}
        </Typography>

        <Typography
          color={"text.secondary"}
          variant="caption"
          fontWeight={700}
        >
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Profile;
