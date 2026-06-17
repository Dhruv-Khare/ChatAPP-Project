import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  CameraAlt as CameraAltIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material";
import { VisuallyHiddenInput } from "../componenets/styled/StyledComponent";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { userNameValidator } from "../utils/Validator";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { userExists } from "../redux/reducer/auth";
import { server } from "../contants/config";
import axios from "axios";
import { useThemeMode } from "../context/theme";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { mode, toggleMode } = useThemeMode();

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const userName = useInputValidation("", userNameValidator);
  const password = useStrongPassword("");
  const avatar = useFileHandler("single");

  function handleToggle() {
    setIsLogin(!isLogin);
  }

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    // console.log("login1");
    e.preventDefault();
    setIsLoading(true);
    const toastId=toast.loading("Logging In...");

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          userName: userName.value,
          password: password.value,
        },
        config,
      );
      // console.log("login2");

      dispatch(userExists(data?.user));
      toast.success(data.message,{id:toastId});
    } catch (error) {
      // console.log("login3");
      toast.error(error?.response?.data.message || "Something went wrong",{id:toastId});
    } finally {
      setIsLoading(false);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId=toast.loading("Signing Up...");
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("avatar", avatar.file);
    formData.append("userName", userName.value);
    formData.append("password", password.value);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config,
      );

      dispatch(userExists(data?.user));
      toast.success(data.message,{id:toastId});
    } catch (error) {
      toast.error(error?.response?.data.message || "Something went wrong",{id:toastId});
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        background: (theme) =>
          theme.palette.mode === "light"
            ? "radial-gradient(circle at 15% 15%, rgba(37,99,235,0.18), transparent 28rem), radial-gradient(circle at 85% 15%, rgba(15,118,110,0.14), transparent 26rem), #f8fafc"
            : "radial-gradient(circle at 15% 15%, rgba(96,165,250,0.18), transparent 28rem), radial-gradient(circle at 85% 15%, rgba(45,212,191,0.12), transparent 26rem), #0f172a",
      }}
    >
      <IconButton
        onClick={toggleMode}
        aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          bgcolor: "background.paper",
          color: "text.secondary",
          border: "1px solid",
          borderColor: "divider",
          "&:hover": {
            bgcolor: "action.hover",
            color: "primary.main",
          },
        }}
      >
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 440,
            padding: { xs: 3, sm: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: (theme) =>
              theme.palette.mode === "light"
                ? "0 24px 70px rgba(15, 23, 42, 0.12)"
                : "0 24px 70px rgba(0, 0, 0, 0.36)",
          }}
        >
          <Typography variant="h4" fontWeight={900} color="primary.main">
            Patrachar
          </Typography>
          <Typography color="text.secondary" mt={0.5} mb={3}>
            {isLogin ? "Welcome back to your conversations" : "Create your chat profile"}
          </Typography>
          {isLogin ? (
            <>
              <Typography variant="h5" fontWeight={800}>Log in</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="UserName"
                  margin="normal"
                  variant="outlined"
                  value={userName.value}
                  onChange={userName.changeHandler}
                />
                {userName.error && (
                  <Typography color="error" variant="caption">
                    {userName.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                {password.error && (
                  <Typography color="error" variant="caption">
                    {password.error}
                  </Typography>
                )}
                <Button
                  sx={{ marginTop: "1rem" }}
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Log in
                </Button>
                <Typography textAlign={"center"} m={"1rem"} color="text.secondary">
                  Or
                </Typography>
                <Button
                  // sx={{ marginTop: "1rem" }}
                  // variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  onClick={handleToggle}
                  disabled={isLoading}
                >
                  Sign up instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5" fontWeight={800}>Sign up</Typography>
              <form
                style={{
                  width: "100%",
                  height: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleSignup}
              >
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                      border: "4px solid",
                      borderColor: "background.paper",
                      boxShadow: "0 12px 36px rgba(15, 23, 42, 0.16)",
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0%",
                      right: "0%",
                      bgcolor: "primary.main",
                      color: "white",
                      ":hover": { bgcolor: "primary.dark" },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>
                {avatar.error && (
                  <Typography
                    margin={"1rem auto"}
                    width={"fit-content"}
                    display={"block"}
                    color="error"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={userName.value}
                  onChange={userName.changeHandler}
                />
                {userName.error && (
                  <Typography color="error" variant="caption">
                    {userName.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                {password.error && (
                  <Typography color="error" variant="caption">
                    {password.error}
                  </Typography>
                )}
                <Button
                  sx={{ marginTop: "1rem" }}
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Sign up
                </Button>
                <Typography textAlign={"center"} m={"1rem"} color="text.secondary">
                  Or
                </Typography>
                <Button
                  // sx={{ marginTop: "1rem" }}
                  // variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  onClick={handleToggle}
                  disabled={isLoading}
                >
                  Log in instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
