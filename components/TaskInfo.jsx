"use client"
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";


export default function TaskInfo() {


    const [taskD, setTaskD] = useState();
    const [taskStatus, setTaskStatus] = useState();
    const [taskDue, setTaskDue] = useState();

    const { data: session } = useSession();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // call the addTask and post
            const resTask = await fetch("api/addTask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ taskD, taskStatus, taskDue, userEmail: session?.user?.email }),
            });

            if (resTask.ok) {
                const form = e.target;
                form.reset();
            }
        } catch (error) {
            console.log("error from task adding: ", error);
        }
    }



    return (
        <div>

            <h1>Hello, {session?.user?.name}</h1>
            <p>Your tasks await you below:</p>

            <form onSubmit={handleSubmit}>
                <input onChange={(e) => setTaskD(e.target.value)} type="text" placeholder="task description"></input>
                <input onChange={(e) => setTaskStatus(e.target.value)} type="status" placeholder="status"></input>
                <input onChange={(e) => setTaskDue(e.target.value)} type="due date" placeholder="due date"></input>
                <button>Add task</button>
            </form>
            <button onClick={() => signOut()}>Log out</button>


        </div>

        // <div>
        //     <h1>{session?.user?.name}</h1>
        //     <h2>{session?.user?.email}</h2>

        //     <button onClick={() => signOut()}>Log out</button>
        // </div>
    )
}