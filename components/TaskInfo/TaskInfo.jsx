"use client"
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Model2 from "../AddTaskModal";
import { IoIosLogOut } from "react-icons/io";
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

      const getPriorityBg = (status) => {
        switch(status){
            case 'High':
                return '#d893a3';
            case 'Medium':
                return '#ebc474';
            case 'Low':
                return '#86e49d';
            default:
                return 'white';
        }
      }

      const getPriorityColor = (status) => {

        switch(status){
            case 'High':
                return '#b30021';
            case 'Medium':
                return '#df922e';
            case 'Low':
                return '#006b21';
            default:
                return 'black';
        }
      }

    return (
        <div className="bg-[url('https://cdn.pixabay.com/photo/2017/05/16/21/51/coffee-2319122_1280.jpg')] bg-center bg-no-repeat bg-cover w-full h-[100vh] overlay">
            <h1>.</h1>

            <main className="w-[82vw] h-[70vh] bg-[#fff5] mx-auto mt-40 backdrop-blur-[7px] shadow-[0_0.4rem_0.8rem_#0005] rounded-lg overflow-hidden">
                <div className="items-center flex justify-center text-center float-right mr-[5rem] mt-[15px] gap-[3rem]">
                    <IoIosLogOut size={30} className="cursor-pointer hover:text-red-600" onClick={() => signOut()}/>
                </div>

                <section className="w-[95%] h-[23rem] bg-[#fffb] my-3 mt-20 mx-auto rounded-md overflow-y-scroll">
                    <table className="w-full border-collapse">
                    <thead>
    <tr>
        <th className="sticky text-left top-0 left-0 bg-[#ffa938] text-[#000000d1] capitalize p-4 cursor-pointer break-words">
            Description
        </th>
        <th className="sticky text-left top-0 left-0 bg-[#ffa938] text-[#000000d1] capitalize p-4 cursor-pointer break-words">
            Due Date
        </th>
        <th className="sticky text-left top-0 left-0 bg-[#ffa938] text-[#000000d1] capitalize p-4 cursor-pointer break-words">
            Status
        </th>
    </tr>
</thead>
<tbody>
    {tasks.length > 0 ? (
        tasks.map((task,key) => (
            <tr key={task._id} className="even:bg-[#0000000b] transition-[opacity,transform] duration-[0.5s] ease-in-out hover:bg-[#fff6]">
                <td className="p-4 break-words">{task.taskD}</td>
                <td className="p-4 break-words">{task.taskDue}</td>
                <td className="p-4 break-words status" style={{'color': getPriorityColor(task.taskStatus), 'backgroundColor': getPriorityBg(task.taskStatus)}}>{task.taskStatus} 
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="3" className="p-4 text-center break-words">No tasks available</td>
        </tr>
    )}
</tbody>

                    </table>
                </section>
                <Model2 onTaskChange={handleTaskChange}/>
            </main>
        </div>
    )
}