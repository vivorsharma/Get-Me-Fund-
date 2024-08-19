'use server'

import connectDB from "@/app/db/connectDB"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import User from "@/models/User"



export const initiate = async (amount, to_user, paymentform) => {
    await connectDB()

    // fetch the secret of the user which is getting payment
    let user = await User.findOne({ username: to_user })
    const secret = user.razorpaysecret
    var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret })

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    // create a payment object which shows a pending payment in the database
    await Payment.create({ oid: x.id, amount: amount / 100, to_user: to_user, name: paymentform.name, message: paymentform.message })

    return x;

}


export const fetchuser = async (username) => {
    await connectDB()
    let u = await User.findOne({ username: username })
    // Handle the case where the user is not found
    if (!u) {
        return null;
    }
    let user = u.toObject({ flattenObjectIds: true })
    return user
}

export const fetchpayments = async (username) => {
    await connectDB()
    // find all payments sorted by decreasing order sof amount and flatten object
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(10).lean()
    return p;
}

export const updateProfile = async (data, oldusername) => {
    await connectDB()
    let ndata = Object.fromEntries(data)

    // if username is updated, check if username is available
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "username already exits" }
        }
        await User.updateOne({email : ndata.email}, ndata)
        // Now update all the username in the payments table
        await Payment.updateMany({to_user: oldusername}, {to_user:ndata.username})
    }
    else{

        await User.updateOne({ email: ndata.email }, ndata)
    }
}