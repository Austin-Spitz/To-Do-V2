"use client"
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import Model2 from "../ModalComp";

export default function TaskInfo({tasks=[], onTaskChange}) {

    console.log("Tasks: ", tasks);

    
    const { data: session } = useSession();


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
            onTaskChange();
            return;
          }
        } catch (error) {
          console.log("Error from deleting the task: ", error);
        }
      };


      const handleTaskChange = () => {
        onTaskChange(); // If there's an onTaskChange passed from a higher parent, call it
      };

    return (
        <div className="bg-[url('https://cdn.pixabay.com/photo/2017/05/16/21/51/coffee-2319122_1280.jpg')] bg-center bg-no-repeat bg-cover w-full h-[100vh] overlay">

            {/* <h1 className="session-name">Hello, {session?.user?.name}</h1> */}
            <h1 className="header-name">Hello Andrew!</h1>
            
            <button onClick={() => signOut()}>Log out</button>

            <Model2 onTaskChange={handleTaskChange}/>
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
    {tasks.length > 0 ? (
        tasks.map((task) => (
            <tr key={task._id}>
                <td className="px-6 py-4 whitespace-nowrap">{task.taskD}</td>
                <td className="px-6 py-4 whitespace-nowrap">{task.taskStatus} <IoEllipsisHorizontalSharp className="cursor-pointer"/></td>
                <td className="px-6 py-4 whitespace-nowrap">{task.taskDue} <FaRegTrashAlt onClick={() => handleDelete(task._id, task.taskD, task.taskStatus, task.taskDue)} className="cursor-pointer" /> </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="3" className="px-6 py-4 text-center">No tasks available</td>
        </tr>
    )}
</tbody>
                </table>
            </div>

        </div>
    )
}