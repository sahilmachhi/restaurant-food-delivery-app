import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const databaseInstance = await mongoose.connect(
      process.env.MONGODB_URL as string
    );
    console.log(databaseInstance.connection.host);
    console.log("Database connected successfully");
    return databaseInstance;
  } catch (error) {
    console.error("ERROR: ", error);
    throw error;
  }
};
