import { User } from "../models/user.js";

//create a new user and save it to the database and save in cookie

const newUser = async (req, res) => {
  const { name, userName, password, bio } = req.body;
  console.log(req.body);
  const avatar = {
    public_id: "sample_public_id",
    url: "https://example.com/avatar.jpg",
  };
  await User.create({
    name,
    userName,
    password,
    bio,
    avatar,
  });
  res.status(201).json({ messages: "user Created Successfully" });
};
const login = (req, res) => {
  res.send("hello user");
};

export { login, newUser };
