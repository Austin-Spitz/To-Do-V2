"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    // handeling the login
    const handleSubmit = async (e) => {

        e.preventDefault();

        if(!email || !password){
            setError("One or more empty fields. Try again");
            return;
        }

        try {
            const res = await signIn("credentials", {
                email, password, redirect: false,
            });

            if (res.error) {
                setError("Invalid credentials");
                return;
            }

            router.replace('dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center font-sans">
            <form onSubmit={handleSubmit} className="w-1/2 h-[95vh] flex flex-col justify-center items-center rounded-[5px] shadow-md">
                <h2 className="mb-[20%] text-[#4A4E74] font-bold">Sign In</h2>
                <input data-testid ="login-input" onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" />
                <input  data-testid ="login-input" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="input input-bordered w-full max-w-xs mt-[20px]" />
                <button data-testid="login-btn" className="btn text-[#FBF9F1] bg-[#4A4E74] rounded-[5px] w-1/2 h-[10%] font-bold">Login</button>
                <Link className="text-sm mt-3 text-right" href={"/register"}>
                    Don&apos;t have an account? <span className="underline">Create an account</span>
                </Link>
                {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}
            </form>
        </div>
    )
}