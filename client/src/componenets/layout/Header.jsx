import React, { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { orange } from "../../contants/color";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Group as GroupIcon,
  Search as SerchIcon,
  Logout as LogOutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationsDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroups"));

const Header = () => {
  const navigate = useNavigate();
  const [ismobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleMobile = () => {
    console.log("Mobile");
    setIsMobile((prev) => !prev);
  };
  const openSearchDialog = () => {
    console.log("Search");
    setIsSearch((prev) => !prev);
  };
  const openNEwGroup = () => {
    console.log("New Group");
    setIsNewGroup((prev) => !prev);
  };
  const navigateToGroups = () => {
    navigate("/groups");
  };
  const logoutHandler = () => {
    console.log("Logout");
  };
  const openNotification = () => {
    console.log("Notification");
    setIsNotification((prev) => !prev);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: orange }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
  Patrachar            </Typography>
            <Box
              sx={{
                display: {
                  xs: "block ",
                  sm: "none ",
                },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: "1" }} />
            <Box>
              <IconBtn
                icon={<SerchIcon />}
                title="Search"
                onClick={openSearchDialog}
              />
              {/* <Tooltip title="Search">
                <IconButton
                  color="inherit"
                  size="large "
                  onClick={openSearchDialog}
                >
                  <SerchIcon />
                </IconButton>
              </Tooltip> */}
              <IconBtn
                icon={<AddIcon />}
                title="New Group"
                onClick={openNEwGroup}
              />
              {/* <Tooltip title="New Group">
                <IconButton
                  color="ingerit "
                  size="large"
                  onClick={openNEwGroup}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip> */}
              <IconBtn
                icon={<GroupIcon />}
                title="manage Groups"
                onClick={navigateToGroups}
              />
              <IconBtn
                icon={<NotificationsIcon />}
                title="Notifications"
                onClick={openNotification}
              />
              {/* <Tooltip title="manage Groups">
                <IconButton
                  color="ingerit "
                  size="large"
                  onClick={navigateToGroups}
                >
                  <GroupIcon />
                </IconButton>
              </Tooltip> */}
              <IconBtn
                icon={<LogOutIcon />}
                title="LogOut"
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open={true} />}>
          <SearchDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open={true} />}>
          <NewGroupDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open={true} />}>
          <NotificationsDialog />
        </Suspense>
      )}
    </>
  );
};
const IconBtn = ({ icon, title, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit " size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
