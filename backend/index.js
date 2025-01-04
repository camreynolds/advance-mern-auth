import express from "express"
import dotenv from "dotenv"
dotenv.config()

// imported 
import {connectDB} from "./db/connectDB.js"
import authRoutes from "./routes/auth.route.js"

// create the app
const app = express() // allows us to parse incoming request: req.body

// middlewares
app.use(express.json())
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