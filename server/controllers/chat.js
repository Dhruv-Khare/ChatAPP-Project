import {
  ALERT,
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/event.js";
import { getOtherMembers } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import { deleteFilesFromCloudinary, emmitEvent, uploadFilesToCloudinary } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  // if (members.length < 2) {
  //   return next(new ErrorHandler("Group must have more than 3 members", 400));
  // }
  //we are handling the abover condition in the validator
  const allMembers = [...members, req.user];
  await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });
  emmitEvent(req, ALERT, allMembers, `Welcomee to the group ${name}`);
  emmitEvent(req, REFETCH_CHATS, members);
  return res.status(200).json({
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
    // console.log(otherMember);
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
        return  !chat.members.includes(member._id);
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

const removeMembers = TryCatch(async (req, res, next) => {
  const { userId, chatId } = req.body;
  console.log("userId:", userId);
  console.log("chatId:", chatId);

  const [chat, userTobeRemoved] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "name"),
  ]);

  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  if (!chat.groupChat) {
    return next(new ErrorHandler("This is not a group chat", 400));
  }

  if (chat.creator.toString() !== req.user.toString()) {
    return next(new ErrorHandler("You are not allowed to remove members", 403));
  }

  if (chat.members.length <= 3) {
    return next(new ErrorHandler("Group must have more than 3 members", 400));
  }
   const allMembers=chat.members.map((i)=>i.toString());
  chat.members = chat.members.filter(
    (member) => member.toString() !== userId.toString()
  );

  await chat.save();

  emmitEvent(
    req,
    ALERT,
    chat.members,
    `Removed ${userTobeRemoved?.name || "a member"} from the group ${chat.name}`
  );

  emmitEvent(req, REFETCH_CHATS, allMembers);

  return res.status(200).json({
    success: true,
    message: "Member removed successfully",
  });
});

const leaveGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }
  if (!chat.groupChat) {
    return next(new ErrorHandler("This is not a group chat", 400));
  }
  const remainingMembers = chat.members.filter(
    (member) => member.toString() !== req.user.toString()
  );
  if (chat.creator.toString() === req.user.toString()) {
    const randomNumber = Math.floor(Math.random() * remainingMembers.length);
    const newCreator = remainingMembers[randomNumber];
    chat.creator = newCreator;
  }
  const allMembers=chat.members.map((i)=>i.toString());
  chat.members = remainingMembers;
  await chat.save();
  emmitEvent(
    req,
    ALERT,
    chat.members,
    `User ${req.user.name} has left the group ${chat.name}`
  );
  emmitEvent(req, REFETCH_CHATS, allMembers);
  return res.status(200).json({
    success: true,
    message: "User has left the group successfully",
  });
});

const sendMessage = TryCatch(async (req, res, next) => {
  const { chatId } = req.body;

  const [chat, me] = await Promise.all([
    Chat.findById(chatId),
    User.findById(req.user),
  ]);
  // console.log("chat:", chat);
  // console.log("me:", me);
  if (!chat) {
    return next(new ErrorHandler("Chat Not Found", 404));
  }
  const files = req.files || [];
  if (files.length < 1) {
    return next(new ErrorHandler("Please upload attachements", 400));
    if (files.length > 5) {
      return next(
        new ErrorHandler("You can upload maximum 5 attachements", 400)
      );
    }
  }
  //uploaad files here

  const attachements = await uploadFilesToCloudinary(files);
  const messageForDb = {
    content: "",
    attachements,
    sender: me._id,

    chat: chatId,
  };
  const messageForRealTime = {
    ...messageForDb,
    sender: {
      id: me._id,
      name: me.name,
    },
  };

  const message = await Message.create(messageForDb);

  emmitEvent(req, NEW_MESSAGE, chat.members, {
    message: messageForRealTime,
    chatId,
  });
  emmitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });

  return res.status(200).json({
    success: true,
    message,
  });
});

const getChatDetails = TryCatch(async (req, res, next) => {
  if (req.query.populate === "true") {
    // console.log("populate is true");
    const chat = await Chat.findById(req.params.id)
      .populate("members", "name avatar")
      .lean();
    if (!chat) {
      return next(new ErrorHandler("Chat not found", 404));
    }

    chat.members = chat.members.map((member) => {
      return {
        _id: member._id,
        name: member.name,
        avatar: member.avatar.url,
      };
    });
    return res.status(200).json({
      success: true,
      chat,
    });
  } else {
    // console.log("populate is false");
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return next(new ErrorHandler("Chat not found", 404));
    }
    return res.status(200).json({
      success: true,
      chat,
    });
  }
});

const changeGroupName = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const { name } = req.body;

  const chat = await Chat.findById(chatId);
  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));

  if (chat.creator.toString() !== req.user.toString()) {
    return next(
      new ErrorHandler(
        "You are not allowed to change the name of the group",
        403
      )
    );
  }
  chat.name = name;
  await chat.save();
  emmitEvent(req, REFETCH_CHATS, chat.members);
  return res.status(200).json({
    success: true,
    messgae: "group name changed Successfully",
  });
});

const deleteChat = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  const members = chat.members;
  if (chat.groupChat && chat.creator.toString() !== req.user.toString()) {
    return next(
      new ErrorHandler("You are not allowed to delete the group", 403)
    );
  }

  if (!chat.groupChat && !chat.members.includes(req.user)) {
    return next(
      new ErrorHandler("You are not allowed to delete the chat", 403)
    );
  }

  //here we have to delete all mesgages of the chat also and attacheq from cloudinary if any

  const messagesWithAttachements = await Message.find({
    chat: chatId,
    attachement: { $exists: true, $ne: [] },
  });
  const public_Ids = [];
  messagesWithAttachements.forEach(({ attachements }) => {
    attachements.forEach(({ public_id }) => {
      public_Ids.push(public_id);
    });
  });

  await Promise.all([
    //delete files form cloudinary
    deleteFilesFromCloudinary(public_Ids),
    chat.deleteOne(),
    Message.deleteMany({ chat: chatId }),
  ]);
  emmitEvent(req, ALERT, members, `Chat has been deleted`);
  emmitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Chat deleted successfully",
  });
});

const getMessages = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const { page = 1, limit = 20 } = req.query;

  const chat=await Chat.findById(chatId);

  if(!chat) return next(new ErrorHandler("Chat Not Found",404));

  if(!chat.members.includes(req.user.toString()))
    return next(new ErrorHandler("You are not allowed to access this chat",403));

  const [messages, totalMessages] = await Promise.all([
    Message.find({ chat: chatId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("sender", "name avatar")
      .lean(),
    Message.countDocuments({ chat: chatId }),
  ]);

  const totalPages = Math.ceil(totalMessages / limit);

  return res.status(200).json({
    success: true,
    messages: messages.reverse(),
    totalPages,
  });
});

export {
  addMember, changeGroupName,
  deleteChat, getChatDetails, getMessages, getMyChats,
  getMyGroups, leaveGroup, newGroupChat, removeMembers, sendMessage
};

