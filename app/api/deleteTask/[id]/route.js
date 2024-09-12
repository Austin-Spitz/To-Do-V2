import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    // Connect to the MongoDB database
    await connectMongoDB();

    const { taskD, taskStatus, taskDue, userEmail } = await req.json();

    await User.updateOne(
      { email: userEmail },
      { $pull: { tasks: { taskD, taskDue, taskStatus } } }
    );

    return NextResponse.json({ message: "Task deleted" }, { status: 201 });
  } catch (error) {
    // Log and return the error response
    console.log("deleteTask error: ", error);
    return NextResponse.json(
      { message: "Error while deleting the task. Try again later" },
      { status: 500 }
    );
  }
}
