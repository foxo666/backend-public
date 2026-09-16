import mongoose from "mongoose";

export const dbConnect = async () => {
  const dbUri = process.env.MONGODB_URI;

  if (!dbUri) {
    throw new Error("MONGODB_URI is not configured");
  }

  mongoose.set("strictQuery", false);
  await mongoose.connect(dbUri);
};
