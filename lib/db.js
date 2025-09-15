import mongoose from "mongoose";

export const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Database connected.")
    } catch (error) {
        console.error("error connecting databse")
    }
}