import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../componenets/styled/StyledComponent";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { userNameValidator } from "../utils/Validator";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { userExists } from "../redux/reducer/auth";
import { server } from "../contants/config";
import axios from "axios";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const userName = useInputValidation("", userNameValidator);
  const password = useStrongPassword("");
  const avatar = useFileHandler("single");
  

  function handleToggle() {
    setIsLogin(!isLogin);
  }

  const dispatch=useDispatch();
   
  const handleLogin = async(e) => {
    // console.log("login1");
    e.preventDefault();

    const config={
      withCredentials:true,
      headers:{
        "Content-Type":"application/json"
      }
    }

   try {
    const {data}= await axios.post(`${server}/api/v1/user/login`, {
      userName: userName.value,
      password: password.value,
    },config);
    // console.log("login2");

    dispatch(userExists(true));
    toast.success(data.message);
   } catch (error) {
    // console.log("login3");
    toast.error(error?.response?.data.message||"Something went wrong");
   }

  };
  const handleSignup = async(e) => {
    e.preventDefault();
    const config={
      withCredentials:true,
      headers:{
        "Content-Type":"multipart/form-data"
      }
    }
    const formData=new FormData();
    formData.append("name",name.value);
    formData.append("bio",bio.value);
    formData.append("avatar",avatar.file);
    formData.append("userName",userName.value);
    formData.append("password",password.value);

   try {
    const {data}= await axios.post(`${server}/api/v1/user/new`, formData,config);

    dispatch(userExists(true));
    toast.success(data.message);
   } catch (error) {
    toast.error(error?.response?.data.message||"Something went wrong");
   }

  };
  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom,rgb(16, 54, 73),rgb(182, 155, 155))",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5"> LogIn</Typography>
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
                  <Typography color="error" variant=" caption ">
                    {userName.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="PassWord"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                {password.error && (
                  <Typography color="error" variant=" caption ">
                    {password.error}
                  </Typography>
                )}
                <Button
                  sx={{ marginTop: "1rem" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  
                >
                  Login{" "}
                </Button>
                <Typography textAlign={"center"} m={"1rem"}>
                  Or
                </Typography>
                <Button
                  // sx={{ marginTop: "1rem" }}
                  // variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  onClick={handleToggle}
                >
                  Sign Up Instead{" "}
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5"> SignUp</Typography>
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
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0%",
                      right: "0%",
                      bgcolor: "rgb( 0, 0, 0, 0.5)",
                      ":hover": { bgcolor: "rgb( 0, 0, 0, 0.7)" },
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
                    variant=" caption "
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
                  label="UserName"
                  margin="normal"
                  variant="outlined"
                  value={userName.value}
                  onChange={userName.changeHandler}
                />
                {userName.error && (
                  <Typography color="error" variant=" caption ">
                    {userName.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="PassWord"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                {password.error && (
                  <Typography color="error" variant=" caption ">
                    {password.error}
                  </Typography>
                )}
                <Button
                  sx={{ marginTop: "1rem" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  SignUp{" "}
                </Button>
                <Typography textAlign={"center"} m={"1rem"}>
                  Or
                </Typography>
                <Button
                  // sx={{ marginTop: "1rem" }}
                  // variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  onClick={handleToggle}
                >
                  Login Instead{" "}
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
