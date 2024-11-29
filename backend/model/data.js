import mongoose, { Schema } from "mongoose";
const data = new Schema({
    name: { type: String },
    email: { type: String },
    profile: { type: String }
})
export const dataModel = mongoose.model("Data", data)