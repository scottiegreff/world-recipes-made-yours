import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 50000, // 50 seconds
      } as any
    );
    console.log("THE DATABASE CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.error("THE DATABASE DID NOT CONNECT: ", error);
  }
};
export default connectMongoDB;
