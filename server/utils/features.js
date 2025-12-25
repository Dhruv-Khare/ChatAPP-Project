import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  httpOnly: true,
  sameSite: "none",
  secure: true,
};

const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "Patrachar" })
    .then((data) => {
      console.log(`connected to db: ${data.connection.host}`);
    })
    .catch((err) => {
      throw err;
    });
};
const sendToken = (res, user, statusCode, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(statusCode).cookie("Patrachar", token, cookieOptions).json({
    success: true,
    message,
  });
};
const emmitEvent = (req, event, users, data) => {
  console.log(`emmiting event ${event} to ${users}`);
};

const deleteFilesFromCloudinary = async (publicIds) => {
};
export { connectDB, sendToken, cookieOptions, emmitEvent ,deleteFilesFromCloudinary};
