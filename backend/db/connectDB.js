import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export const connectDB = async ()=>{
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Mongo DB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error("Error connection to MongoDB: ", error.message)
    process.exit(1) // 1 is failure, 0 status code is sucess    
  }
}