import { lazy, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Group as GroupIcon,
  Search as SerchIcon,
  Logout as LogOutIcon,
  Notifications as NotificationsIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
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
import { useThemeMode } from "../../context/theme.js";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationsDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroups"));

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSearch, isNotifications,isNewGroup } = useSelector((state) => state.msc);
  const { notificationCount } = useSelector((state) => state.chat);
  const { mode, toggleMode } = useThemeMode();
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
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "background.paper",
            color: "text.primary",
            borderBottom: "1px solid",
            borderColor: "divider",
            backdropFilter: "blur(12px)",
            boxShadow: (theme) =>
              theme.palette.mode === "light"
                ? "0 8px 30px rgba(15, 23, 42, 0.06)"
                : "0 8px 30px rgba(0, 0, 0, 0.24)",
          }}
        >
          <Toolbar
            sx={{
              minHeight: "4rem !important",
              gap: 1,
              px: { xs: 1.25, sm: 2.5 },
            }}
          >
            <Box
              sx={{
                width: { sm: "calc(33.333% - 1rem)", md: "calc(25% - 1rem)" },
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: 2,
                  display: { xs: "none", sm: "grid" },
                  placeItems: "center",
                  bgcolor: "primary.main",
                  color: "white",
                  fontWeight: 900,
                }}
              >
                P
              </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                letterSpacing: 0,
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              Patrachar
            </Typography>
            </Box>
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
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.25, sm: 0.75 },
                p: 0.5,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.default",
              }}
            >
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
                active={location.pathname === "/groups"}
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
                icon={mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                title={mode === "light" ? "Dark mode" : "Light mode"}
                onClick={toggleMode}
              />
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
const IconBtn = ({ icon, title, onClick, value, active = false }) => {
  return (
    <Tooltip title={title}>
      <IconButton
        color="inherit"
        size="large"
        onClick={onClick}
        sx={{
          width: 42,
          height: 42,
          color: active ? "primary.main" : "text.secondary",
          borderRadius: 2,
          bgcolor: active ? "action.selected" : "transparent",
          "&:hover": {
            bgcolor: "action.hover",
            color: "primary.main",
          },
        }}
      >
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
