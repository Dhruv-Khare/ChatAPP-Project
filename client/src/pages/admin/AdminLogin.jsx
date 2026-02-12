import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import {  useDispatch, useSelector} from "react-redux";
import { adminLogin, getAdmin } from "../../redux/thunk/admin";
import { useEffect } from "react";

const AdminLogin = () => {
  const {isAdmin}=useSelector(state=>state.auth)
  const secretKey = useInputValidation("");
  const dispatch=useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
    dispatch(adminLogin(secretKey.value));
  };

  useEffect(()=>{
    dispatch(getAdmin());
  },[dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;
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
          {
            <>
              <Typography variant="h5"> Admin Login</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={submitHandler}
              >
                <TextField
                  required
                  fullWidth
                  label="Secret key"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={secretKey.value}
                  onChange={secretKey.changeHandler}
                />

                <Button
                  sx={{ marginTop: "1rem" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Login{" "}
                </Button>
              </form>
            </>
          }
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
