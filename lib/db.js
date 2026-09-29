import mongoose from "mongoose";
const cached = global.__mongoose ?? {
  conn: null,
  promise: null,
};
if (!global.__mongoose) {
  global.__mongoose = cached;
}
export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 8000,
        socketTimeoutMS: 45000,
      })
      .then((instance) => {
        return instance;
      })
      .catch((error) => {
        cached.promise = null;
        throw error;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
