import express from "express";
import { isAuthenticatd } from "../middlewares/auth.js";
import {
  addMember,
  getMyChats,
  getMyGroups,
  newGroupChat,
} from "../controllers/chat.js";

const app = express.Router();

// after this all should be authenticatd
app.use(isAuthenticatd);
app.post("/new", newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);
app.put("/addMembers", addMember);

export default app;
