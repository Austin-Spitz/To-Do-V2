import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Register() {

    const session = await getServerSession(authOptions);

    if (session) { // if logged in
        redirect('/dashboard')
    }

    return (
        <RegisterForm />
    )
}