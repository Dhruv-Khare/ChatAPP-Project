import jwt from "jsonwebtoken";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/utility.js";
import { cookieOptions } from "../utils/features.js";

const adminLogin = TryCatch(async (req, res, next) => {
  const { secretKey } = req.body;

  const amdinSecretKey = process.env.ADMIN_SECRET_KEY || "chattuAdmin@123";

  const isMatch = secretKey === amdinSecretKey;

  if (!isMatch) {
    return next(new ErrorHandler("Invalid Secret Key", 401));
  }

  const token = jwt.sign(secretKey, process.env.JWT_SECRET);

  res.cookie("adminToken", token, { ...cookieOptions, maxAge: 15 * 60 * 1000 });

  res.status(200).json({
    success: true,
    message: "Authenticated Successfully, Welcome BOSS!",
  });
});

const adminLogout = TryCatch(async (req, res, next) => {
  return res
    .status(200)
    .cookie("adminToken", "", {
      ...cookieOptions,
      maxAge: 0,
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

const getAdminData=TryCatch(async(req,res,next)=>{
    res.status(200).json({
        admin:true,
    });

});

const allUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});

  const transformedUsers = await Promise.all(
    users.map(async ({ _id, name, username, avatar }) => {
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ groupChat: true, members: _id }),
        Chat.countDocuments({ members: _id, groupChat: false }),
      ]);
      return {
        _id,
        name,
        username,
        avatar: avatar.url,
        groups,
        friends,
      };
    })
  );
  res.status(200).json({
    success: true,
    users: transformedUsers,
  });
});

const allChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({})
    .populate("members", "name username avatar")
    .populate("creator", "name username avatar");

  const transformedChats = await Promise.all(
    chats.map(async ({ _id, name, groupChat, members, creator }) => {
      const totalMessages = await Chat.countDocuments({ _id });

      return {
        _id,
        name,
        groupChat,
        avatar: members.slice(0, 3).map((member) => member.avatar.url),
        members: members.map(({ _id, name, avatar }) => ({
          _id,
          name,
          avatar: avatar.url,
        })),
        creator: {
          name: creator?.name || "None",
          avatar: creator?.avatar.url || "",
        },
        totalMembers: members.length,
        totalMessages,
      };
    })
  );

  res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

const allMessages = TryCatch(async (req, res) => {
  const messages = await Message.find({})
    .populate("sender", "name avatar")
    .populate("chat", "groupChat");

  const transformedMessages = messages.map(
    ({ content, attachements, _id, sender, createdAt, chat }) => {
      return {
        _id,
        content,
        attachements,
        sender: {
          _id: sender._id,
          name: sender.name,
          avatar: sender.avatar.url,
        },
        chat: chat._id,
        groupChat: chat.groupChat,
        createdAt,
      };
    }
  );

  res.status(200).json({
    success: true,
    messages: transformedMessages,
  });
});

const getDashBoardStats = TryCatch(async (req, res) => {
  const [totalUsers, totalChats, totalGroups, totalMessages] =
    await Promise.all([
      User.countDocuments(),
      Chat.countDocuments(),
      Chat.countDocuments({ groupChat: true }),
      Message.countDocuments(),
    ]);

  const today = new Date();
  const last7Days = new Date();
  last7Days.setDate(today.getDate() - 7);
  const last7DaysMessages = await Message.find({
    createdAt: {
      $gte: last7Days,
      $lte: today,
    },
  }).select("createdAt");

  const messages = new Array(7).fill(0);
  last7DaysMessages.forEach((message) => {
    const day = message.createdAt.getDate();
    const index = today.getDate() - day;
    messages[6 - index]++;
  });

  const stats = {
    totalUsers,
    totalChats,
    totalGroups,
    totalMessages,
    messagesLast7Days: messages,
  };
  res.status(200).json({
    success: true,
    stats: stats,
  });
});

export {getAdminData,adminLogout, adminLogin, allUsers, allChats, allMessages, getDashBoardStats };
