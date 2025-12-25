import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import { createUser } from "./seeders/user.js";
import { createSingleChat } from "./seeders/chat.js";

dotenv.config({ path: "./.env" });
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
connectDB(mongoURI);

// createUser(5);
// createSingleChat(10);
const app = express();

//useing middlewares
app.use(express.json());
// app.use(express.urlencoded()); this we use when only we send text data but we have sending othere type of data like in avatar we have sending file so we use multer for that ;
app.use(cookieParser());
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
