import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongodb";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
  try {

    await connectMongoDB();

    const session = await getServerSession(authOptions)

    const userEmail = session.user.email;

    console.log("userEmail: ", userEmail);

    const userTasksData = await User.findOne({email: userEmail},{tasks:true,_id:false});

    //mapping over the tasks so that it only returns the taskD, taskDue, etc.
    const userTasks = userTasksData.tasks.map(task => ({
      taskD: task.taskD,
      taskStatus: task.taskStatus,
      taskDue: task.taskDue
    }))


    return NextResponse.json({userTasks}, {status: 201})

  } catch (error) {
    console.log("Get Error",error);
    return NextResponse.json({message: "Error while adding the task. Try again later"},{status: 500});

  }
}