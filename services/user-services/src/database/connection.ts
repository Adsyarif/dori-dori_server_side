const mongoose = require("mongoose");

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    throw error;
  }
};

export default connectDB;
