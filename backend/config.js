import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {

            connectTimeoutMS: 10000,  // 10 seconds timeout
        })
        console.log("connected to db")

    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        if (error.code === 'ETIMEDOUT') {
            console.error("The connection attempt timed out.");
        }
        // Additional error logging or handling can be added here.
    }
}