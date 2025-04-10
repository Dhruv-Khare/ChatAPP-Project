// import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import Applayout from "../componenets/layout/Applayout.jsx";

//i will done some changes here and tehre i will implement the home page like whatsapp home page

const Home = () => {
  return (
    <Box
      borderLeft={"5px solid #ccc"}
      bgcolor={"unset "}
      height={"100%"}
      justifyContent={"center"}
      alignContent={"center"}
      display={"flex"}
      flexDirection={"column"}
      s
    >
      <Avatar
        sx={{ width: 200, height: 200, mx: "auto", marginBottom: "10px" }}
      />
      <Typography variant="h5" textAlign={"center"}>
        Select Friend To Chat{" "}
      </Typography>
    </Box>
  );
};

const EnhancedHome = Applayout()(Home);
export default EnhancedHome;
