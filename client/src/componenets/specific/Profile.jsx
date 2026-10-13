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
  alpha,
  Avatar,
  Box,
  Dialog,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useState } from "react";

import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalenderIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

import moment from "moment";

import { TransformImage } from "../../lib/features";

const Profile = ({ user, friendAvatar, friendName }) => {
  const [open, setOpen] = useState(false);

  const isFriendProfile = Boolean(friendAvatar || friendName);
  const rawImageUrl = friendAvatar || user?.avatar?.url || "";
  const imageUrl = rawImageUrl ? TransformImage(rawImageUrl, 500) : "";
  const displayName = isFriendProfile ? friendName : user?.name;
  const initials = (displayName || "Patrachar")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <Stack
        direction={"column"}
        spacing={2.25}
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
            boxShadow: (theme) =>
              theme.palette.mode === "light"
                ? "0 18px 48px rgba(15, 23, 42, 0.08)"
                : "0 18px 48px rgba(0, 0, 0, 0.22)",
          }}
        >
          <Box
            sx={{
              minHeight: 132,
              p: 2,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              background:
                "linear-gradient(135deg, #2563eb 0%, #0f766e 100%)",
            }}
          >
            <Typography
              variant="overline"
              fontWeight={900}
              sx={{
                color: "rgba(255,255,255,0.88)",
                letterSpacing: 0,
              }}
            >
              {isFriendProfile ? "Conversation" : "My Profile"}
            </Typography>
            <Box
              sx={{
                px: 1.25,
                py: 0.5,
                borderRadius: 99,
                bgcolor: "rgba(255,255,255,0.16)",
                color: "white",
                fontSize: 12,
                fontWeight: 800,
              }}
            >
              Active
            </Box>
          </Box>

          <Stack alignItems="center" sx={{ px: 2.25, pb: 2.5, mt: -8 }}>
            <Avatar
              src={imageUrl}
              alt={displayName}
              onClick={() => imageUrl && setOpen(true)}
              sx={{
                width: 144,
                height: 144,
                objectFit: "cover",
                border: "6px solid",
                borderColor: "background.paper",
                cursor: imageUrl ? "pointer" : "default",
                boxShadow: "0 18px 44px rgba(15, 23, 42, 0.24)",
                transition: "0.2s ease",
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.18),
                color: "primary.main",
                fontSize: 40,
                fontWeight: 900,
                "&:hover": {
                  transform: imageUrl ? "scale(1.03)" : "none",
                },
              }}
            >
              {!imageUrl && initials}
            </Avatar>
            <Typography
              variant="h6"
              fontWeight={900}
              mt={1.75}
              noWrap
              sx={{
                maxWidth: "100%",
                textAlign: "center",
              }}
            >
              {displayName || "User"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              sx={{ maxWidth: "100%", textAlign: "center" }}
            >
              {isFriendProfile
                ? imageUrl
                  ? "Click picture to view"
                  : "Private conversation"
                : `@${user?.userName || "username"}`}
            </Typography>
          </Stack>
        </Paper>

        {!isFriendProfile && (
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
        )}

        {isFriendProfile && (
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              p: 2,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <ProfileCard
              heading={"Chat"}
              text={displayName || "Selected conversation"}
              Icon={<FaceIcon />}
            />
          </Paper>
        )}
      </Stack>

      {/* Fullscreen Image Dialog */}

      <Dialog
        open={open && Boolean(imageUrl)}
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
