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
        <div className="bg-[url('https://cdn.pixabay.com/photo/2017/05/16/21/51/coffee-2319122_1280.jpg')] bg-center bg-no-repeat bg-cover w-full h-[100vh] overlay">


            <form onSubmit={handleSubmit}>
                <input onChange={(e) => setTaskD(e.target.value)} type="text" placeholder="task description"></input>
                <input onChange={(e) => setTaskStatus(e.target.value)} type="status" placeholder="status"></input>
                <input onChange={(e) => setTaskDue(e.target.value)} type="due date" placeholder="due date"></input>
                <button>Add task</button>
            </form>
            <button onClick={() => signOut()}>Log out</button>

            <div className="w-[80%] ml-[10%] mt-60 border-2 border-spacing-5 p-10 rounded-md overflow-y-scroll max-h-[400px]">
                <table className="w-full my-6 border border-black border-separate border-spacing-0 text-sm font-normal font-sans table-fixed">
                    <thead className="bg-red-600 text-white sticky top-0">
                        <tr>
                            <th className="bg-red-800 text-white sticky top-0">Description</th>
                            <th className="bg-red-800 text-white sticky top-0">Status</th>
                            <th className="bg-red-800 text-white sticky top-0">Due</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tasks.map((task, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{task.taskD}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{task.taskStatus}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{task.taskDue}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}