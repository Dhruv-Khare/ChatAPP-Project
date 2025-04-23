import mongoose from "mongoose";

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
export { connectDB };
