import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {

    // connect to the database
    await connectMongoDB();

    const { email } = await req.json();

    const user = await User.findOne({email}).select("_id");

    console.log("THIS IS THE USER: ", user);
    return NextResponse.json({user});
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while finding an existing user." },
      { status: 500 }
    );
  }
}