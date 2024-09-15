"use client"
import React, {useEffect, useState} from "react"
import ModalComp from "../components/ModalComp"
import TaskInfo from "../components/TaskInfo/TaskInfo";


export default function Parent(){

    const [tasks, setTasks] = useState([]); // takes all task useStates and adds them in the array
    
    async function fetchData() {
    
        try {
            const res = await fetch("/api/getTask");
    
            const data = await res.json();

            if(!res.ok){
                console.log("HELPSS")
            }
    
    
            console.log("sess: ", data.userTasks);
            if (res.ok) {
                setTasks(data.userTasks || []);
            }
    
        } catch (error) {
            console.log("Error with TaskList: ", error);
        }
    }
    
    
    useEffect(() => {
        fetchData();
    }, [])



    const handleTaskChange = () => {
        fetchData(); // will trigger the useEffect
    }


    console.log("Tasks in parent: ", tasks);


    return (
        <div>
            <TaskInfo tasks={tasks} onTaskChange={handleTaskChange}/>
            {/* <ModalComp onTaskChange={handleTaskChange}/> */}
        </div>
    )
}