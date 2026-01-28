import { envMode } from "../app.js";

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // console.log(err);
  if(err.code===11000)
  {
    const error=Object.keys(err.keyPattern).join(",");
    err.statusCode = 400;
  err.message = `Duplicate Field value entered for ${error} field`;
  }
  if(err.name==="CastError")
  {
    err.statusCode = 400;
    err.message = `Invalid format of ${err.path} field`;
  }
  // console.log(process.env.NODE_ENV.trim()=== "DEVELOPMENT");
  return res.status(err.statusCode).json({
    success: false,
    message: envMode === "DEVELOPMENT" ? err : err.message,
  });
};
const TryCatch = (passedFunc) => async (req, res, next) => {
  try {
    await passedFunc(req, res, next);
  } catch (error) {
    next(error);
  }
};
export { errorMiddleware, TryCatch };

