import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password should be 8 characters"],
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
