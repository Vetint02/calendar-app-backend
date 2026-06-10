import mongoose from "mongoose"

export default async function connectMongoDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected: ", process.env.MONGODB_URI);
    }
    catch (error) {
        console.error('MongoDB connection failed:', error.message);
    }
}