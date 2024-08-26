import mongoose, { Schema, models } from "mongoose";

const taskSchema = new Schema({
  taskD: {
    type: String,
    required: true,
  },
  taskDue: {
    type: String,
    required: true,
  },
  taskStatus: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tasks: {
      type: [taskSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
