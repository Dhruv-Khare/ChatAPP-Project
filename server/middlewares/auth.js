import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";

const isAuthenticatd = TryCatch(async (req, res, next) => {
  const token = req.cookies["Patrachar"];
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

export { adminOnly, isAuthenticatd };

