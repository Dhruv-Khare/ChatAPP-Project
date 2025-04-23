import express from "express";
import userRoutes from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
connectDB(mongoURI);
const app = express();

//useing middlewares
app.use(express.json());
// app.use(express.urlencoded()); this we use when only we send text data but we have sending othere type of data like in avatar we have sending file so we use multer for that ;

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
