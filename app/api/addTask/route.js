import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import Task from "@/models/task";

export async function POST(req) {
  try {

    
    const {taskD, taskStatus, taskDue, userEmail} = await req.json();

    // getting id of the current user so we can track which task the user created
    const userr = await User.findOne({email: userEmail}).select("_id");

    if(!userr){
      return NextResponse.json({message: "Error while adding the task. Try again later"},{status: 500});
    }

    
    const userId = userr._id.toString();



    // posting the task to the database
    await connectMongoDB();
    await Task.create({userId: userId,
      task_description: taskD,
      status: taskStatus,
      deadline: taskDue});

    return NextResponse.json({message: "Task created"},{status: 201});
  } catch (error) {
    return NextResponse.json({message: "Error while adding the task. Try again later"},{status: 500});

  }
}