import jwt from "jsonwebtoken";
import { TryCatch } from "./error.js";

const isAuthenticatd = TryCatch(async (req, res, next) => {
  const token = req.cookies["Patrachar"];
  // console.log(token);
  // console.log(req.cookies["Patrachar"]);
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedData);

  req.user = decodedData._id;

  next();
});

export { isAuthenticatd };
