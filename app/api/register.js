// creating simple api to see what's sent after creating account
import bcrypt from "bcryptjs/dist/bcrypt";
import { connectMongoDB } from "../../lib/mongodb";
import { NextResponse } from "next/server";
import User from "../../models/user";

export async function POST(req){

    try{
        const {name,email,password} = await req.json();
        const hashedPassword = await bcrypt.hash(password,10); // encrypting password

        // connecting to the database
        await connectMongoDB();

        //sending data to the database
        await User.create({name,email,password: hashedPassword});

        return NextResponse.json({message: "User Registered"}, {status: 201})
    }catch(error){
        return NextResponse.json({message: "Error occured while reigstering user"}, {status: 500})

    }
}