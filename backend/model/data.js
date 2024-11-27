import mongoose, { Schema } from "mongoose";
const data = new Schema({
    name: { type: String }
})
export const dataModel = mongoose.model("Data", data)