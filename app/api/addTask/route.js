import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {

    // connect the database
    await connectMongoDB();
    const { taskD, taskStatus, taskDue, userEmail } = await req.json();

    // Getting the user by their email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json(
        { message: "Error while adding the task. Try again later" },
        { status: 500 }
      );
    }

    // Creating  new task object
    const newTask = {
      taskD,
      taskStatus,
      taskDue,
    };

    // Adding the new task to the user's tasks array
    await User.findOneAndUpdate(
      { email: userEmail },
      { $push: { tasks: newTask } }
    );

    return NextResponse.json({message: "Task created"},{status: 201});
  } catch (error) {
    console.log("AddTask error: ", error);
    return NextResponse.json({message: "Error while adding the task. Try again later"},{status: 500});

  }
}