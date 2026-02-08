import React, { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { server } from "../../contants/config.js";

import {
  AppBar,
  Backdrop,
  Badge,
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
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducer/auth";
import toast from "react-hot-toast";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotifications,
  setIsSearch,
} from "../../redux/reducer/msc.js";
import { resetNotificationCount } from "../../redux/reducer/chat.js";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationsDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroups"));

const Header = () => {
  const navigate = useNavigate();
  const { isSearch, isNotifications,isNewGroup } = useSelector((state) => state.msc);
  const { notificationCount } = useSelector((state) => state.chat);
  // const [isNewGroup, setIsNewGroup] = useState(false);
  // const [isNotification, setIsNotification] = useState(false);

  const dispatch = useDispatch();

  const handleMobile = () => {
    // console.log("Mobile");
    dispatch(setIsMobile(true));
  };
  const openSearchDialog = () => dispatch(setIsSearch(true));
  const openNEwGroup = () => {
    console.log("New Group");
    // setIsNewGroup((prev) => !prev);
    dispatch(setIsNewGroup(true));
  };
  const navigateToGroups = () => {
    navigate("/groups");
  };
  const logoutHandler = async () => {
    // console.log("Logout");
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  const openNotification = () => {
    dispatch(setIsNotifications(true));
    dispatch(resetNotificationCount());
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
              Patrachar{" "}
            </Typography>
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
                value={notificationCount}
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
      {isNotifications && (
        <Suspense fallback={<Backdrop open={true} />}>
          <NotificationsDialog />
        </Suspense>
      )}
    </>
  );
};
const IconBtn = ({ icon, title, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit " size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
