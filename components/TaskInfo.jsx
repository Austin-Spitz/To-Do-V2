"use client"
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";


export default function TaskInfo() {

    const { data: session } = useSession();


    return (
        <div>
            <h1>{session?.user?.name}</h1>
            <h2>{session?.user?.email}</h2>

            <button onClick={() => signOut()}>Log out</button>
        </div>
    )
}