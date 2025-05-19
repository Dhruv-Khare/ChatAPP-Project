import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

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
  const { name } = req.query;
  return res.status(200).json({
    success: true,
    message: name,
  });
});

export { login, newUser, getMyProfile, logout, searchUser };
