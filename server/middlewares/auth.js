import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import { PATRACHAR } from "../constants/config.js";
import { User } from "../models/user.js";

const isAuthenticatd = TryCatch(async (req, res, next) => {
  const token = req.cookies[PATRACHAR];
  // console.log(token);
  // console.log(req.cookies["Patrachar"]);
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decodedData);

  req.user = decodedData._id;

  next();
});
const adminOnly = TryCatch(async (req, res, next) => {
  const token = req.cookies["adminToken"];
  // console.log(token);
  // console.log(req.cookies["Patrachar"]);
  if (!token) {
    return next(new ErrorHandler("Only Admin can access this resource", 401));
  }
  const secretKey= jwt.verify(token, process.env.JWT_SECRET);

  const amdinSecretKey = process.env.ADMIN_SECRET_KEY || "chattuAdmin@123";

  const isMatch = secretKey === amdinSecretKey;
  if (!isMatch) {
    return next(new ErrorHandler("Only Admin can access this resource", 401));
  }

  next();
});

const socketAuthenticator=async(error,socket,next)=>{
  try {
    if(error) return next(error);

    const authToken=socket.request.cookies[PATRACHAR];

    if(!authToken) return next(new ErrorHandler("Please Login To Access this route",401));
    
    const decodedData=jwt.verify(authToken,process.env.JWT_SECRET);
    const user=await User.findById(decodedData._id);
    if(!user) return next(new ErrorHandler("Please Login To Access This Route",401));
    socket.user=user;
    return next();
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Please Login to Access this route",401));
  }
};

export { adminOnly, isAuthenticatd,socketAuthenticator };

