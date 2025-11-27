import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "");
        console.log('MongoDB connected')
    } catch (error: any) {
        console.log("Error connection to mongoDB", error.message);
        process.exit(1)
    }
}

