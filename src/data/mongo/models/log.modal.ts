import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  origin: {
    type: String,
  },
});

export const LogModel = mongoose.model("Log", LogSchema);
