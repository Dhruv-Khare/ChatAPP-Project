import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { Chat } from "../models/chat.js";
import { Request } from "../models/request.js";
import { cookieOptions, emmitEvent, sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/event.js";
import { getOtherMembers } from "../lib/helper.js";

//create a new user and save it to the database and save in cookie

const newUser = async (req, res) => {
  const { name, userName, password, bio } = req.body;
  console.log(req.body);
  const avatar = {
    public_id: "sample_public_id",
    url: "https://example.com/avatar.jpg",
  };
  const user = await User.create({
    name,
    userName,
    password,
    bio,
    avatar,
  });
  sendToken(res, user, 200, "User Created Successfully");
};
const login = TryCatch(async (req, res, next) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid UserName or Password", 404));
  }

  const isMatched = await compare(password, user.password);
  if (!isMatched) {
    return next(new ErrorHandler("Invalid UserName or Password", 404));
  }
  sendToken(res, user, 200, `${User.name} Login Successfully`);
});

const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user);
  res.status(200).json({
    success: true,
    user,
  });
});

const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("Patrachar", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logout Successfully",
    });
});
const searchUser = TryCatch(async (req, res) => {
  const { name = "" } = req.query;
  //finding all my chats
  const myChats = await Chat.find({
    groupChat: false,
    members: req.user,
  });

  //extracting all user from my chats means friendsor people i have chatted with
  const allUsersFromMyChats = myChats.map((chat) => chat.members).flat();

  //finding lal users except me and my friends
  const allUsersExceptMeAndMyFriends = await User.find({
    _id: { $nin: allUsersFromMyChats },
    name: { $regex: name, $options: "i" }, //options i means case insensitive
  });

  //modifying the response
  const users = allUsersExceptMeAndMyFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));

  // console.log(myChats);
  return res.status(200).json({
    success: true,
    users,
  });
});

const sendFriendrequest = TryCatch(async (req, res) => {
  const { userId } = req.body;

  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  });

  if (request) return next(new ErrorHandler("Request already Send", 400));

  await Request.create({
    sender: req.user,
    receiver: userId,
  });

  emmitEvent(req, NEW_REQUEST, [userId]);

  return res.status(200).json({
    success: true,
    message: "friend Request sent Successfully",
  });
});

const acceptFriendReq = TryCatch(async (req, res,next) => {
  const { requestId, accept } = req.body;

  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");

  console.log(request);
  if (!request) return next(new ErrorHandler("request not found", 404));

  if (request.receiver._id.toString() !== req.user.toString())
    return next(
      new ErrorHandler("You are not authorised to accept this request", 401)
    );

  if (!accept) {
    await request.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Friend Request Rejected",
    });
  }

  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name}--${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);

  emmitEvent(req,REFETCH_CHATS,members);

  return res.status(200).json({
    success: true,
    message: "Friend Request Accepted Successfully",
    senderId:request.sender._id,
  });
});

const getAllNotifications=TryCatch(async(req,res)=>{
  const request=await Request.find({receiver:req.user}).populate(
    "sender",
    "name avatar"
  );

  const allRequest= request.map(({_id,sender})=>({
    _id,
    sender:{
      _id:sender._id,
      name:sender.name,
      avatar:sender.avatar.url,
    },
  }));

  return res.status(200).json({
    success:true,
    allRequest
  })

})

const getMyFriends=TryCatch(async(req,res)=>{
  
  const chatId=req.query.chatId;

  const chats=await Chat.find({members:req.user,
    groupChat:false,
  }).populate("members","name avatar");

  const friends=chats.map(({members})=>{
    const otherUser=getOtherMembers(members,req.user);

    return {
      _id:otherUser._id,
      name:otherUser.name,
      avatar:otherUser.avatar.url,

    }
  });

  if(chatId){
    const chat=await Chat.findById(chatId);

    const availableFriends= friends.filter(friend=> !chat.members.includes(friend._id))

    return res.status(200).json({
      success:true,
      availableFriends,
    })
  }else{
    return res.status(200).json({
      success:true,
      friends,
    })

  }

  

  return res.status(200).json({
    success:true,
    allRequest
  })

})

export {
  getMyFriends,
  getAllNotifications,
  acceptFriendReq,
  sendFriendrequest,
  login,
  newUser,
  getMyProfile,
  logout,
  searchUser,
};
