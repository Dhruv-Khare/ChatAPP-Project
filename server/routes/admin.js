import express from "express";
import { adminLogin, adminLogout, allChats, allMessages, allUsers, getAdminData, getDashBoardStats } from "../controllers/admin.js";
import { adminLoginValidator, validate } from "../lib/validators.js";
import { adminOnly } from "../middlewares/auth.js";

const app=express.Router();

app.post("/verify",adminLoginValidator(),validate, adminLogin);
app.get("/logout",adminLogout);
//adminOnly routes
app.use(adminOnly);
app.get("/",getAdminData);
app.get("/users",allUsers);
app.get("/chats",allChats);
app.get("/messages",allMessages);
app.get("/stats",getDashBoardStats);

export default app;