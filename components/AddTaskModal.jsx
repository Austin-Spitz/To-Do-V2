"use client"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useSession } from "next-auth/react";
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function MyModal({onTaskChange}) {
  let [isOpen, setIsOpen] = useState(false)

  const [selectedRadio, setSelectedRadio] = useState('');


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

  const handleLabel = (option) => {
    setSelectedRadio(option);
    setTaskStatus(option);
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

      <div onClick={openModal} className="h-20 w-20 flex justify-center ml-[3rem] mt-[6rem] items-center pb-1 rounded-full bg-[#ffa938] hover:bg-[#f48c06] text-5xl leading-[5rem] text-[#eee] shadow-[0.2rem_0.5rem_1rem_rgba(0,0,0,0.4)] cursor-pointer">&#43;</div>


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
                <Dialog.Panel className="w-[40rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-[25px] mb-[5rem] text-[#556ca2]"
                  >
            
                    Create task:
                    <br/>
                    <br/>
                    <hr/>
                  </Dialog.Title>
                  <div className="mt-2">
                  <form onSubmit={handleSubmit}>



                  <TextField placeholder="Enter your Task..." id="outlined-multiline-static" autoComplete="off" onChange={(e) => setTaskD(e.target.value)} multiline rows={3} ></TextField> <br/>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker onChange={(newValue)=>setTaskDue(newValue)} label="MM/DD/YY" format='MM/DD/YYYY'/>
      </DemoContainer>
    </LocalizationProvider>
    
    <div className="mt-[3rem] flex gap-[10px] label-container">
      <label className={selectedRadio === 'Low' ? 'low-selected' : 'label-low'}  onClick={() => handleLabel('Low')}>Low</label>
      <label className={selectedRadio === 'Medium' ? 'medium-selected' : 'label-medium'}  onClick={() => handleLabel('Medium')}>Medium</label>
      <label className={selectedRadio === 'High' ? 'high-selected' : 'label-high'}  onClick={() => handleLabel('High')}>High</label>
      <button className='ml-64 border-2 border-[#556ca2] rounded-md p-1 text-[15px] w-32 text-[#556ca2] hover:text-[white] hover:bg-[#556ca2]' data-testid ="addTask-btn">Add task</button>
    </div>

            </form>
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
