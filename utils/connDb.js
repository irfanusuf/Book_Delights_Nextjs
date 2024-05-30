import mongoose from "mongoose";

const url = "mongodb://localhost:27017/nexterra";

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(url);
    console.log("Connected to database");
  } catch (error) {
    console.error(error);
  }
};

export default connectDb;
