import { body, validationResult, check, param, query } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  const errorMsg = errors
    .array()
    .map((error) => error.msg)
    .join(", ");

  console.log(errorMsg);
  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMsg, 400));
};

const registerValidator = () => [
  body("name", "Please enter name").notEmpty(),
  body("username", "Please enter username").notEmpty(),
  body("password", "Please enter password").notEmpty(),
  body("bio", "Please enter bio").notEmpty(),
  check("avatar", "Please upload avatar").notEmpty(),
];

const loginValidator = () => [
  body("username", "Please enter username").notEmpty(),
  body("password", "Please enter password").notEmpty(),
];

const newGroupChatValidator = () => [
  body("name", "Please enter Group Name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 2, max: 100 })
    .withMessage("members must be 2-100"),
];
const addMemberValidator = () => [
  body("chatId", "Please enter ChatId").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 1, max: 97 })
    .withMessage("members must be 1-97"),
];
const removeMemberValidator = () => [
  body("userId", "Please enter userId").notEmpty(),
  body("chatId", "Please enter chatId").notEmpty(),
];

const sendAttatchementValidator = () => [
  body("chatId", "Please enter chatId").notEmpty(),
  check("files", "Please upload attactchements")
    .notEmpty()
    .isArray({ min: 1, max: 5 })
    .withMessage("members must be 1-5"),
  ,
];
const chatIdValidator = () => [
  param("id", "Please enter chatId").notEmpty(),
];
const changeGroupNameValidator = () => [
  param("id", "Please enter chatId").notEmpty(),
  body("name","Please Enter Name").notEmpty(),
];
const sendFriendReqValidator = () => [
  body("userId","Please Enter user Id").notEmpty(),
];
const acceptFriendReqValidator = () => [
  body("requestId","Please Enter request Id").notEmpty(),
  body("accept").notEmpty().withMessage("Please Add Accept").isBoolean().withMessage("Accept Must be a Boolean"),
];
export {
    acceptFriendReqValidator,
    sendFriendReqValidator,
    changeGroupNameValidator,
    chatIdValidator,
  sendAttatchementValidator,
  removeMemberValidator,
  addMemberValidator,
  registerValidator,
  validate,
  loginValidator,
  newGroupChatValidator,
};
