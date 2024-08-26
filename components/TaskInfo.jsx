"use client"
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function TaskInfo() {


    const [taskD, setTaskD] = useState();
    const [tasks, setTasks] = useState([]);
    const [taskStatus, setTaskStatus] = useState();
    const [taskDue, setTaskDue] = useState();

    const { data: session } = useSession();

    async function fetchData() {

        try {
            const res = await fetch("/api/getTask");

            const data = await res.json();


            console.log("sess: ", data.userTasks);
            if (res.ok) {
                setTasks(data.userTasks);
            }

        } catch (error) {
            console.log("Error with TaskList: ", error);
        }
    }


    useEffect(() => {
        fetchData();
    }, [])

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
                fetchData();
                return;
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

            <h1>Task List: </h1>
            {tasks.length > 0 ? (
                <ul>
                    {tasks.map((task, index) => (
                        <li className="font-bold" key={index}>{task.taskD}</li>
                    ))}
                </ul>
            ) : (
                <h2>No tasks found.</h2>
            )}

        </div>

        // <div>
        //     <h1>{session?.user?.name}</h1>
        //     <h2>{session?.user?.email}</h2>

        //     <button onClick={() => signOut()}>Log out</button>
        // </div>
    )
}