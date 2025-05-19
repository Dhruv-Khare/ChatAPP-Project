import { ALERT, REFETCH_CHATS } from "../constants/event.js";
import { getOtherMembers } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { emmitEvent } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  if (members.length < 2) {
    return next(new ErrorHandler("Group must have more than 3 members", 400));
  }
  const allMembers = [...members, req.user];
  await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });
  emmitEvent(req, ALERT, allMembers, `Welcomee to the group ${name}`);
  emmitEvent(req, REFETCH_CHATS, members);
  res.status(200).json({
    success: true,
    message: "Group Created Successfully",
  });
});
const getMyChats = TryCatch(async (req, res, next) => {
  // req.user me user ki id hi aa rhi h
  const chats = await Chat.find({
    members: req.user,
  }).populate("members", "name avatar");
  // console.log("chats:", chats);

  // console.log("req.user:", req.user);
  const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
    const otherMember = getOtherMembers(members, req.user);
    console.log(otherMember);
    return {
      _id,
      groupChat,
      avatar: groupChat
        ? members.slice(0, 3).map(({ avatar }) => avatar.url)
        : [otherMember.avatar.url],
      name: groupChat ? name : otherMember.name,
      // members: members.reduce((prev, curr) => {
      //   if (curr._id.toString() !== req.user.toString()) {
      //     prev.push(curr._id);
      //   }
      //   return prev;
      // }, []),
      members: members
        .filter((member) => member._id.toString() !== req.user.toString())
        .map((member) => member._id),
    };
  });

  res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});
const getMyGroups = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({
    creator: req.user,
    groupChat: true,
    members: req.user,
  }).populate("members", "name avatar");

  const groups = chats.map(({ _id, name, members, groupChat }) => ({
    _id,
    groupChat,
    avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
    name,
  }));
  return res.status(200).json({
    success: true,
    groups,
  });
});

const addMember = TryCatch(async (req, res, next) => {
  const { chatId, members } = req.body;

  if (!members || members.length === 0) {
    return next(new ErrorHandler("Please provide members to add", 400));
  }
  const chat = await Chat.findById(chatId);
  // console.log("chat:", chat);
  // console.log("members:", members);
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }
  if (!chat.groupChat) {
    return next(new ErrorHandler("This is not a group chat", 400));
  }
  // console.log(req.user);
  if (chat.creator.toString() !== req.user.toString()) {
    return next(new ErrorHandler("you are not allowed to add members", 400));
  }
  const newUserPromises = members.map((member) =>
    User.findById(member, "name")
  );

  const newMembers = await Promise.all(newUserPromises);
  // console.log("newMembers:", newMembers);
  chat.members.push(
    ...newMembers
      .filter((member) => {
        !chat.members.includes(member._id);
      })
      .map((member) => member._id)
  );
  if (chat.members.length > 100) {
    return next(new ErrorHandler("Group can have only 100 members", 400));
  }

  await chat.save();
  const allUsersName = newMembers.map((member) => member.name);
  emmitEvent(
    req,
    ALERT,
    chat.members,
    `Welcome to the group ${chat.name} ${allUsersName.join(", ")}`
  );
  emmitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Members added successfully",
  });
});

export { newGroupChat, getMyChats, getMyGroups, addMember };
