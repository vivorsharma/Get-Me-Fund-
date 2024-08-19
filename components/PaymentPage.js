"use client"
import React, { useEffect, useState } from "react"
import Script from "next/script"
import { fetchpayments, fetchuser, initiate } from "@/actions/useractions"
import { useSession } from "next-auth/react"


const PaymentPage = ({ username }) => {

    useEffect(() => {
        getData()
    }, [])

    const handlechange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }

    const pay = async (amount) => {
        // get the order id 
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me Fund!", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }



    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


            <div className="cover w-full bg-red-50 relative">
                <img className="object-cover w-full h-48 md:h-[350]" src={currentUser?.coverPic} alt="" />
                <div className="absolute -bottom-20 right-[38%] md:right-[46%] border-white border-2 rounded-full size-36">
                    <img className="rounded-full object-cover size-36" width={128} height={128} src={currentUser?.profilePic} alt="" />
                </div>
            </div>
            <div className="info flex justify-center items-center my-24 flex-col gap-2">

                <div className="font-bold text-lg">
                    @{username}
                </div>

                <div className="text-slate-400">
                    Lets help {username} get a Fund!
                </div>

                <div className="text-slate-400">
                    {payments.length} Payments. ₹{payments.reduce((a, b) => a - -b.amount, 0)} raised.
                </div>
                <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
                    <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
                        <h2 className="text-2xl font-bold my-5">Top 10 Supporters</h2>

                        <ul className="mx-5 text-lg">
                            {payments.length === 0 && <li>No Payments yet</li>}
                            {payments.map((p, i) => {
                                return <li key={i} className="my-4 flex gap-2 items-center">
                                    <img className="rounded-full" width={33} src="avatar.gif" alt="" />
                                    <span>
                                        {p.name} donated <span className="font-bold">₹{p.amount} </span> with a message "{p.message}"
                                    </span>
                                </li>
                            })}
                        </ul>
                    </div>

                    <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
                        <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
                        <div className="flex gap-2 flex-col">
                            <div>
                                <input onChange={handlechange} value={paymentform.name} name="name" type="text" className="w-full p-2 rounded-lg bg-slate-800" placeholder="Enter Name" />
                            </div>
                            <input onChange={handlechange} value={paymentform.message} name="message" type="text" className="w-full p-2 rounded-lg bg-slate-800" placeholder="Enter Message" />
                            <input onChange={handlechange} value={paymentform.amount} name="amount" type="number" className="w-full p-2 rounded-lg bg-slate-800" placeholder="Enter Amount" />
                            <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} type="button" class="w-full text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 
                            dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:from-purple-100" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}>Pay</button>
                        </div>
                        <div className="flex flex-col md:flex-row gap-2 mt-5">
                            <button className="bg-slate-800 p-5 rounded-lg" onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className="bg-slate-800 p-5 rounded-lg" onClick={() => pay(2000)}>Pay ₹30</button>
                            <button className="bg-slate-800 p-5 rounded-lg" onClick={() => pay(3000)}>Pay ₹50</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default PaymentPage;