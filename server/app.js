import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
import cors from "cors";

import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import adminRoutes from "./routes/admin.js";
import { createUser } from "./seeders/user.js";
import { createSingleChat } from "./seeders/chat.js";

//start- implementation of socket.io
import { Server } from "socket.io";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/event.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";

import {v2 as cloudinary} from "cloudinary";

dotenv.config({ path: "./.env" });
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "ygdhghjgiuyiughgu";
connectDB(mongoURI);

// createUser(5);
// createSingleChat(10);

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express();
const userSocketIDs = new Map();

const server = createServer(app);
const io = new Server(server, {});

//useing middlewares
app.use(express.json());
// app.use(express.urlencoded()); this we use when only we send text data but we have sending othere type of data like in avatar we have sending file so we use multer for that ;
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);

app.use("/api/v1/admin", adminRoutes);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("hello World");
});

io.on("connection", (socket) => {
  const user = {
    _id: "wdhdoiqwj",
    name: "huggu",
  };
  userSocketIDs.set(user._id.toString(), socket.id);
  console.log(userSocketIDs);
  socket.on(NEW_MESSAGE, async ({ chatId, message, members }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chatId: chatId,
      createdAt: new Date().toISOString(),
    };
    const messageForDB = {
      content: message,
      sender: user._id,
      chatId: chatId,
    };

    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });
    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

    // console.log("new message received:",messageForRealTime);
    try {
      await Message.create(messageForDB);
    } catch (error) {
      console.log("error in saving message to db:", error);
    }
  });
  socket.on("disconnect", () => {
    userSocketIDs.delete(user._id.toString());
    console.log("user disconnected");
  });
});

app.use(errorMiddleware);

server.listen(port, () => {
  console.log(
    `Server is running on port ${port} in ${process.env.NODE_ENV} mode`,
  );
});

export { userSocketIDs, envMode, adminSecretKey };
