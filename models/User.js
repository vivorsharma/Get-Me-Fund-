import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    username: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    coverPic: {
        type: String,
    },
    razorpayid:{
        type: String,
    },
    razorpaysecret:{
        type:String
    },

}, {
    timestamps: true
})


export default mongoose.models.User || model("User", UserSchema);