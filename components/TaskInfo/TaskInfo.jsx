"use client"
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";


export default function TaskInfo() {

    const [tasks, setTasks] = useState([]); // takes all task useStates and adds them in the array


    const [taskD, setTaskD] = useState(); // task description
    const [taskStatus, setTaskStatus] = useState(); 
    const [taskDue, setTaskDue] = useState(); // task Due

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

    console.log("TaskD", taskD);

    useEffect(() => {
        fetchData();
    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if(!taskD || !taskStatus || !taskDue){
                console.log("One or more field is empty. ");
                const form = e.target;
                form.reset()
                return;
            }

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


    
    const handleDelete = async (taskId, taskD, taskStatus, taskDue) => {
        try {
          // Call the deleteTask API
          const delTask = await fetch(`/api/deleteTask/${taskId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ taskD, taskStatus, taskDue, userEmail: session?.user?.email }),
          });
    
          if (delTask.ok) {
            fetchData();
          }
        } catch (error) {
          console.log("Error from deleting the task: ", error);
        }
      };



    // function handleDelete(taskId) {
    //     fetch(`/api/deleteTask/${taskId}`, {
    //       method: 'DELETE',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(taskD, taskStatus, taskDue),
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log(data.message);
    //       // Optionally, refresh the task list or update the UI
    //     })
    //     .catch(error => console.error('Error:', error));
    //   }
      



    return (
        <div className="bg-[url('https://cdn.pixabay.com/photo/2017/05/16/21/51/coffee-2319122_1280.jpg')] bg-center bg-no-repeat bg-cover w-full h-[100vh] overlay">

            {/* <h1 className="session-name">Hello, {session?.user?.name}</h1> */}
            <h1 className="header-name">Hello Andrew!</h1>
            <form onSubmit={handleSubmit}>
                <input data-testid ="task-input" onChange={(e) => setTaskD(e.target.value)} type="text" placeholder="task description"></input>
                <input data-testid ="task-input" onChange={(e) => setTaskStatus(e.target.value)} type="status" placeholder="status"></input>
                <input data-testid ="task-input" onChange={(e) => setTaskDue(e.target.value)} type="due date" placeholder="due date"></input>
                <button data-testid ="addTask-btn">Add task</button>
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
                        {tasks.map((tasks) => (
                            <tr key={tasks._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{tasks.taskD}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{tasks.taskStatus}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{tasks.taskDue}<FaRegTrashAlt onClick={() => handleDelete(tasks._id, tasks.taskD, tasks.taskStatus, tasks.taskDue)} className="cursor-pointer" /> </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}