import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import { getBase64, getSockets } from "../lib/helper.js";

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

  const io=req.app.get("io");
  const usersSockets=getSockets(users);
  io.to(usersSockets).emit(event,data);
};

const uploadFilesToCloudinary = async (files=[]) => {
console.log("Cloudinary:", {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
});
  const uploadPromises= files.map((file)=>{
    return new Promise((resolve, reject)=>{
      cloudinary.uploader.upload(getBase64(file), {
        folder: "Patrachar",
        resource_type: "auto",
        public_id:uuid(),
      }, (err, result)=>{
        if(err) return reject(err);
        resolve(result);
      });
  })
  });
  console.log("Upload promises created:", uploadPromises);
  try {
    console.log("Uploading files to Cloudinary...");
    const results = await Promise.all(uploadPromises);
    console.log("Files uploaded successfully:", results);
    const formattedResults= results.map((res)=>({
      public_id: res.public_id,
      url: res.secure_url,
    }));
    return formattedResults;
  } catch (error) {
throw new Error("Failed to upload files to Cloudinary",error);}

}

const deleteFilesFromCloudinary = async (publicIds) => {
};
export { connectDB, sendToken, cookieOptions, emmitEvent ,deleteFilesFromCloudinary,uploadFilesToCloudinary};
