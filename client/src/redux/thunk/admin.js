import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../contants/config";
import axios from "axios";

const adminLogin = createAsyncThunk("/admin/login", async (secretKey) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${server}/api/v1/admin/verify`,
      { secretKey },
      config,
    );
    if (data?.token) {
      localStorage.setItem("admin-token", data.token);
    }
    return data.message;
  } catch (error) {
    throw error?.response?.data?.message || error?.message || "Something went wrong";
  }
});

const getAdmin = createAsyncThunk("/admin/getAdmin", async () => {
  try {
    const { data } = await axios.get(
      `${server}/api/v1/admin/`,
      { withCredentials: true }
    );
    return data.admin;
  } catch (error) {
    throw error?.response?.data?.message || error?.message || "Something went wrong";
  }
});

const adminLogout = createAsyncThunk("/admin/logout", async () => {
  try {
    const { data } = await axios.get(
      `${server}/api/v1/admin/logout`,
      { withCredentials: true }
    );
    localStorage.removeItem("admin-token");
    return data.message;
  } catch (error) {
    localStorage.removeItem("admin-token");
    throw error?.response?.data?.message || error?.message || "Something went wrong";
  }
});

export { adminLogin, getAdmin, adminLogout };
