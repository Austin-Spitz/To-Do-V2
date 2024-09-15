"use client"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function MyModal({onTaskChange}) {
  let [isOpen, setIsOpen] = useState(false)

  const [tasks, setTasks] = useState([]); // takes all task useStates and adds them in the array


  const [taskD, setTaskD] = useState(); // task description
  const [taskStatus, setTaskStatus] = useState(); 
  const [taskDue, setTaskDue] = useState(); // task Due

  const { data: session } = useSession();

  
 

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

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
            // const form = e.target;
            // form.reset();
            onTaskChange();
            closeModal();
            // fetchData();
        }
    } catch (error) {
        console.log("error from task adding: ", error);
    }
}

  return (
    <>
      <div className="float-right">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Add task
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Creating Task
                  </Dialog.Title>
                  <div className="mt-2">
                  <form onSubmit={handleSubmit}>
                <input data-testid ="task-input" onChange={(e) => setTaskD(e.target.value)} type="text" placeholder="task description"></input>
                <input data-testid ="task-input" onChange={(e) => setTaskStatus(e.target.value)} type="status" placeholder="status"></input>
                <input data-testid ="task-input" onChange={(e) => setTaskDue(e.target.value)} type="due date" placeholder="due date"></input>
                <button data-testid ="addTask-btn">Add task</button>
            </form>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
