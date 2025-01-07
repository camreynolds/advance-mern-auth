// imported
import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs"
import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js"
import {sendVerificationEmail,sendWelcomeEmail} from "../mailtrap/emails.js"

export const signup = async (req,res)=>{
  const {email,password,name} = req.body

  try{
    if(!email || !password || !name){
      throw new Error("All fields are required.")
    }

    const userAlreadyExist = await User.findOne({email})

    if(userAlreadyExist){
      return res.status(400).json({success: false, error: "User already exists."})
    }

    const hashedPassword = await bcrypt.hash(password,10)
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiredAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours  
    })
    
    await user.save()        

    // jwt
    generateTokenAndSetCookie(res,user._id)

    await sendVerificationEmail(user.email, verificationToken)

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user:{
        ...user._doc,
        password: undefined
      }
    })
    
  }catch(error){
    res.status(401).json({success: false, error: error.message})
  }
  
}

export const verifyEmail = async (req,res) =>{
  const {code} = req.body

  try{
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiredAt: {$gt: Date.now()}
    })

    if(!user){
      return res.status(400).json({success: false, message: "Invalid or expired verification code."})
    }

    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpiredAt = undefined

    await user.save()
    await sendWelcomeEmail(user.email, user.name)

    res.status(200).json({
      sucess: true, 
      message: "Email verified successfully",
      user:{
        ...user._doc,
        password: undefined
      }
    })

  }catch(error){
    console.error("Error in verify email:", error.message)    
    res.status(500).json({success: false, message: "Server error"})
  }
}

export const login = async (req,res)=>{
 const {email,password} = req.body
 
 try{
  const user = await User.findOne({email})

  if(!user){
    return res.status(400).json({success: false, error: "Invalid credentials." })
  }

  const isValidPassword = await bcrypt.compare(password, user.password)

  if(!isValidPassword){
    return res.status(400).json({success: false, error: "Invalid credentials."})
  }

  generateTokenAndSetCookie(res,user._id)

  user.lastLogin = new Date()

  await user.save()

  res.status(200).json({
    success: true,
    message: "Logged successfully.",
    user:{
      ...user._doc,
      password: undefined
    }
  })
 }catch(error){
  console.error("Error in login: ", error)
  res.status(400).json({success: false, error: error.message})
 }

}

export const logout = async (req,res)=>{
  res.clearCookie("token")
  res.status(200).json({success: true, message: "Logged out successfully."})
}