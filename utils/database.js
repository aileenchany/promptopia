import mongoose from "mongoose";

let isConnected = false; //track connection status

export const connectDB = async () => {
  mongoose.set('strictQuery', true) //sets the mongoose options

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParse: true,
      useUnifiedTopology: true,
    })

    isConnected = true;

    console.log('MongoDB connected');

  } catch (error) {
    console.log(error);
  }
}

