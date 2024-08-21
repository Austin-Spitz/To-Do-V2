import { sign } from "crypto";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

// creating auth options
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            // logic for checking user info for login
            async authorize(credentials){
                const {email,password} = credentials;

                try{
                    // connect to the database
                    await connectMongoDB();

                    // get the user with the email id & check if it's correct
                    const user = await User.findOne({email});

                    if(!user){
                        return null;
                    }

                    // now check if password is correct
                    const passwordsMatch = await bcrypt.compare(password, user.password); // compare the password typed with the password from the user database

                    if(!passwordsMatch){
                        return null;
                    }

                    return user;
                }catch(error){
                    console.log("Error: ", error);
                }

                return user;
            },
        }),
    ],

    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/", // this is the page where the login will be
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};