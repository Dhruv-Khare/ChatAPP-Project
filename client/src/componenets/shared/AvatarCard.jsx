import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import { TransformImage } from "../../lib/features";
// import React from "react";

//todo transform

const AvatarCard = ({ avatar = [], max = 4 }) => (
  <Stack direction={"row"} spacing={0.5}>
    <AvatarGroup
      max={max}
      sx={{
        position: "relative",
      }}
    >
      <Box width={"5rem"} height={"3rem"}>
        {avatar.map((i, index) => (
          <Avatar
            key={Math.random() * 100}
            src={TransformImage(i)}
            alt={`Avatar ${index}`}
            sx={{
              width: "3rem",
              height: "3rem",
              position: "absolute",
              left: {
                xs: `${index * 0.5}rem`,
                sm: `${index}rem`,
              },
            }}
          />
        ))}
      </Box>
    </AvatarGroup>
  </Stack>
);

export default AvatarCard;
