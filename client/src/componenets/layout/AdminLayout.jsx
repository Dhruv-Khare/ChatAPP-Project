import {
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  Group as GroupIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as LinkComponent, Navigate, useLocation, useNavigate } from "react-router-dom";
import { grayColor } from "../../contants/color";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../redux/thunk/admin";

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const adminTabs = [
  {
    name: "DashBoard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users-management",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats-management",
    icon: <GroupIcon />,
  },
  {
    name: "Messages",
    path: "/admin/messages-management",
    icon: <MessageIcon />,
  },
];
const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const logoutHandler = () => {
    console.log("logOut");
    dispatch(adminLogout());
    // navigate("/admin");
    
  };
  return (
    <Stack width={w} direction={"column"} spacing={"3rem"} p={"3rem"}>
      <Typography variant="h4" textTransform={"uppercase"}>
        {" "}
        Patrachar
      </Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((i) => (
          <Link
            key={i.path}
            to={i.path}
            sx={
              location.pathname == i.path && {
                bgcolor: "black",
                color: "white",
                ":hover": {
                  color: "gray",
                },
              }
            }
          >
            <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
              {i.icon}
              <Typography>{i.name}</Typography>
            </Stack>
          </Link>
        ))}
        <Link onClick={logoutHandler}>
          <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
            <ExitToAppIcon />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};
const AdminLayout = ({ children }) => {
    const {isAdmin}=useSelector(state=>state.auth)
  
  const [isMobile, setIsMobile] = useState(false);
  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };
  const handleClose = () => {
    setIsMobile(false);
  };

  if (!isAdmin) return  <Navigate to={"/admin"} />;
  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <Sidebar />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgcolor: grayColor,
        }}
      >
        {children}
      </Grid>
      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
