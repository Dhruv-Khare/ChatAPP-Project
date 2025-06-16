import multer from "multer";
const multerUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5, // 5mb
  },
});

const singleAvatar = multerUpload.single("avatar");
const sendAttatchementMulter = multerUpload.array("files", 10);
export { singleAvatar, sendAttatchementMulter };
