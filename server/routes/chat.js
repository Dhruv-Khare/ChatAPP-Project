import express from "express";
import {
  addMember,
  changeGroupName,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMembers,
  sendMessage
} from "../controllers/chat.js";
import { addMemberValidator, changeGroupNameValidator, chatIdValidator, newGroupChatValidator, removeMemberValidator, sendAttatchementValidator, validate } from "../lib/validators.js";
import { isAuthenticatd } from "../middlewares/auth.js";
import { sendAttatchementMulter } from "../middlewares/multer.js";

const app = express.Router();

// after this all should be authenticatd
app.use(isAuthenticatd);
app.post("/new",newGroupChatValidator(),validate, newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);
app.put("/addMembers",addMemberValidator(),validate, addMember);
app.put("/removeMembers",removeMemberValidator(),validate, removeMembers);
app.delete("/leave/:id",chatIdValidator(),validate, leaveGroup);
// Send Attatchement
app.post("/message", sendAttatchementMulter, sendAttatchementValidator(),validate, sendMessage);
//getMessages

app.get("/message/:id",chatIdValidator(),validate, getMessages);
//get chat Details,rename,delete
app.route("/:id").get(chatIdValidator(),validate, getChatDetails).put(changeGroupNameValidator(),validate,changeGroupName).delete(chatIdValidator(),validate,deleteChat);

export default app;
