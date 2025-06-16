import express from "express";
import { isAuthenticatd } from "../middlewares/auth.js";
import {
  addMember,
  changeGroupName,
  getChatDetails,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMembers,
  sendMessage,
} from "../controllers/chat.js";
import { sendAttatchementMulter } from "../middlewares/multer.js";

const app = express.Router();

// after this all should be authenticatd
app.use(isAuthenticatd);
app.post("/new", newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);
app.put("/addMembers", addMember);
app.put("/removeMembers", removeMembers);
app.delete("/leave/:id", leaveGroup);
// Send Attatchement
app.post("/message", sendAttatchementMulter, sendMessage);
//getMessages
//get chat Details,rename,delete
app.route("/:id").get(getChatDetails).put(changeGroupName);

export default app;
