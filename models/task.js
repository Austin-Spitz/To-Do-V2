// writng code to create schema
import mongoose, { Schema, models } from "mongoose";

const taskSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    task_description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)
const Task = models.Task || mongoose.model("Task", taskSchema);
export default Task;