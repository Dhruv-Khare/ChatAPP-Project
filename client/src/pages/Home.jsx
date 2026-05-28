import { Box, Paper, Typography } from "@mui/material";
import Applayout from "../componenets/layout/Applayout.jsx";
import {
  Forum as ForumIcon,
  Lock as LockIcon,
} from "@mui/icons-material";

//i will done some changes here and tehre i will implement the home page like whatsapp home page

const Home = () => {
  return (
    <Box
      height={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ p: 3 }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "min(100%, 28rem)",
          p: 4,
          textAlign: "center",
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "rgba(255,255,255,0.78)",
        }}
      >
        <Box
          sx={{
            width: 88,
            height: 88,
            mx: "auto",
            mb: 2,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            bgcolor: "primary.main",
            color: "white",
          }}
        >
          <ForumIcon sx={{ fontSize: 44 }} />
        </Box>
        <Typography variant="h5" fontWeight={800}>
          Select a chat
        </Typography>
        <Typography color="text.secondary" mt={1}>
          Choose a conversation from the sidebar to start messaging.
        </Typography>
        <Box
          sx={{
            mt: 3,
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            color: "text.secondary",
            fontSize: "0.85rem",
          }}
        >
          <LockIcon fontSize="small" />
          Private realtime conversations
        </Box>
      </Paper>
    </Box>
  );
};

const EnhancedHome = Applayout()(Home);
export default EnhancedHome;
