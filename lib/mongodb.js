// class to connect to mongodb

import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    }catch(error){
        console.log("Couldn't connect to MongoDB: ", error);
    }
}