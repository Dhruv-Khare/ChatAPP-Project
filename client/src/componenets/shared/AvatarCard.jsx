import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import { TransformImage } from "../../lib/features";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  const avatarList = Array.isArray(avatar) ? avatar : avatar ? [avatar] : [];

  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup
        max={max}
        sx={{
          position: "relative",
        }}
      >
        <Box width={"5rem"} height={"3rem"}>
          {avatarList.map((i, index) => (
            <Avatar
              key={`${index}-${i || "default"}`}
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
};

export default AvatarCard;
