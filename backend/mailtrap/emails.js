// mailtrap
import { mailtrapClient, sender } from "../mailtrap/mailtrap.config.js"
// import email template
import {  VERIFICATION_EMAIL_TEMPLATE,
          PASSWORD_RESET_SUCCESS_TEMPLATE,
          PASSWORD_RESET_REQUEST_TEMPLATE
        } from "../mailtrap/emailTemplate.js"

export const sendVerificationEmail = async(email,verificationToken) =>{
  const recipient = [{email}]

  try{
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email Verification"
    })

    console.log("Email sent successfully", response)
    
  }catch(error){
    console.error("Error sending verification email:", error)    
    throw new Error(`Error sending verification email: ${error}`)
  }
}

export const sendWelcomeEmail = async (email,name)=>{
  const recipient = [{email}]

  try{
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "fe6084a7-30d8-4bb2-b41e-3b02938ef973",
      template_variables:{
        "company_info_name":"Auth Company",
        "name":name
      }
    })

    console.log("Welcome email successfully send.", response)
  }catch(error){
    throw new Error(error.message)
  }
}

export const sendPasswordResetEmail = async(email, resetURL) =>{
  const recipient = [{email}]

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset"
    })
    
  } catch (error) {
    console.error("Error sending password reset email.", error)
    throw new Error(`Error sending password reset email: ${error}`)
  }
}

export const sendResetSuccessEmail = async (email) =>{
  const recipient = [{email}]

  try{
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset"
    })

    console.log("Password reset email sent successfully", response)
  }catch(error){
    console.error("Error sending password reset success email", error)
    throw new Error(`Error sending password reset success email ${error}`)
  }
}