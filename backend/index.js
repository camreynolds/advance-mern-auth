import cookieParser from "cookie-parser"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
dotenv.config()
// imported 
import {connectDB} from "./db/connectDB.js"
import authRoutes from "./routes/auth.route.js"

// create the app
const app = express() // allows us to parse incoming request, req.body

const __dirname = path.resolve()

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

//only in the production
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")))

  app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname, "frontend","dist","index.html"))
  })
}

// connection server & database
app.listen(process.env.PORT, ()=>{
  connectDB()
  console.log("server listen on port", process.env.PORT)
})