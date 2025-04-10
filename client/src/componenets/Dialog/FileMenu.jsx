import { Menu } from "@mui/material";
// import React from "react";

const FileMenu = ({ anchorE1 }) => {
  return (
    <Menu anchorEl={anchorE1} open={false}>
      <div
        style={{
          width: "10rem",
        }}
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab vero
        dolorem nisi nemo exercitationem non quaerat ratione esse aperiam
        corporis!
      </div>
    </Menu>
  );
};

export default FileMenu;
