import mongoose from "mongoose";

const connection = {};

export const connectToDb = async () => {
  const useUrl = process.env.DATABASE_URL;
  try {
    if (connection.isConnected) {
      return;
    }
    const db = await mongoose.connect(useUrl);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
