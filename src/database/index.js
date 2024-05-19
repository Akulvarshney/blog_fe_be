import mongoose from "mongoose";

const connecToDb = async () => {
  const url = "mongodb+srv://admin:admin@blog.kosdaew.mongodb.net/";

  mongoose
    .connect(url)
    .then(() => {
      console.log("connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connecToDb;
