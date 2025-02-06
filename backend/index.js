import cookieParser from "cookie-parser"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()

// imported 
import {connectDB} from "./db/connectDB.js"
import authRoutes from "./routes/auth.route.js"

// create the app
const app = express() // allows us to parse incoming request, req.body

// middlewares
app.use(cors({origin:"http://localhost:5173", credentials: true}))
app.use(express.json())
app.use(cookieParser()) // allows us to parse incoming cookies, req.cookie
app.use((req,res,next)=>{
  console.log(req.path, req.method)
  next()
})

// routes
app.use("/api/auth", authRoutes)

// connection server & database
app.listen(process.env.PORT, ()=>{
  connectDB()
  console.log("server listen on port", process.env.PORT)
})