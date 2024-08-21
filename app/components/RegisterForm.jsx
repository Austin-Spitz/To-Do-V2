"use client"
import React, { useState } from "react";

export default function RegisterForm() {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            // posting name,email,password to the api/register
            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            })

            if (res.ok) {
                const form = e.target;
                form.reset(); // reset form
            } else {
                console.log("ERROR: ", error);
                setError("Registration failed. Try again");
            }

        } catch (error) {
            setError("Registration failed. Try again");
            console.log("registration error: ", error);
        }
    }

    return (
        <div className="grid place-items-center my-[15%]">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4">Register</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input onChange={e => setName(e.target.value)} type="text" placeholder="Full Name"></input>
                    <input onChange={e => setEmail(e.target.value)} type="email" placeholder="Email"></input>
                    <input onChange={e => setPassword(e.target.value)} type="password" placeholder="******"></input>
                    <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">Register</button>

                    {error && ( // will run ONLY if there's an error
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )

                    }


                </form>
            </div>
        </div>
    )
}