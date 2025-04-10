import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalenderIcon,
} from "@mui/icons-material";
import moment from "moment";
const Profile = () => {
  return (
    <Stack direction={"column"} spacing={"2rem"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white ",
        }}
      />

      <ProfileCard heading={"BIO"} text={"wg jhdguwgeuygwugf8eueguwy8y"} />
      <ProfileCard
        heading={"UserName"}
        text={"@DhruvKhare_.536"}
        Icon={<UserNameIcon />}
      />
      <ProfileCard heading={"Name"} text={"Dhruv Khare"} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Joined"}
        text={moment("2025-01-29T06:34:27.464Z").fromNow()}
        Icon={<CalenderIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      color={"white "}
      textAlign={"center"}
    >
      {Icon && Icon}
      <Stack>
        <Typography variant="body1">{text}</Typography>
        <Typography color={"gray"} variant="caption">
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};
export default Profile;
