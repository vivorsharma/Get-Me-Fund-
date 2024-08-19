import PaymentPage from "@/components/PaymentPage";
import { notFound } from "next/navigation";
import connectDB from "../db/connectDB";
import User from "@/models/User";

const Username = async ({ params }) => {

    await connectDB();

    // Find the user by username
    const user = await User.findOne({ username: params.username });

    // If the user is not found, show the 404 page
    if (!user) {
        return notFound();
    }

    // If the user is found, render the PaymentPage component
    return <PaymentPage username={params.username} />;
}

export default Username;

export async function generateMetadata({params}){
    return{
        title:`${params.username} - Get Me Fund!`
    }
}