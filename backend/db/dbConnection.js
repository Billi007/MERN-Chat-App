import mongoose from "mongoose";

const dbConnect = async() => {
 try {
   await mongoose.connect(process.env.MONGODB_URL, {
    dbName: "mern_chat_app"})
    console.log("Connected to MongoDB successfully!")
 } catch (error) {
    console.log("Error connecting mongodb", error.message);
    process.exit(1);
 }
}

export default dbConnect;