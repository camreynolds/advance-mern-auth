// library import
import {Routes,Route,Navigate, replace} from "react-router-dom"
import { Toaster } from "react-hot-toast"

// local import
import FloatingShape from "./components/FloatingShape"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import EmailVerificationPage from "./pages/EmailVerificationPage"
import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"
import DashboardPage from "./pages/DashboardPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import LoadingSpinner from "./components/LoadingSpinner"


// protect routes that require authentication
const ProtectedRoute = ({children})=>{
  const {isAuthenticated, user} = useAuthStore()

  if(!isAuthenticated){
    return <Navigate to="/login" replace />
  }

  if(!user.isVerified){
    return <Navigate to="/verify-email" replace />
  }

  return children
}

// redirect authenticated users to homepage
const RedirectAuthenticatedUser = ({children})=>{
  const {isAuthenticated, user} = useAuthStore()

  if(isAuthenticated && user.isVerified){
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  const {isCheckingAuth,checkAuth} = useAuthStore()

  useEffect( ()=>{
    checkAuth()
  },[checkAuth])

  // console.log("isAuthenticated:", isAuthenticated)
  // console.log("user:", user)
  
  if(isCheckingAuth) return <LoadingSpinner/>

  return (
    <>
      <div className="
        min-h-screen 
        bg-gradient-to-br 
        from-gray-900 
        via-green-900 
        to-emeral-900
        flex
        items-center
        justify-center
        relative
        overflow-hidden
        ">
          <FloatingShape 
            color="bg-green-500"
            size="w-64 h-64"
            top="-5%"
            left="10%"
            delay={0}
          />
          <FloatingShape 
            color="bg-green-500"
            size="w-48 h-48"
            top="70%"
            left="80%"
            delay={5}
          />
          <FloatingShape 
            color="bg-green-500"
            size="w-32 h-32"
            top="40%"
            left="-10%"
            delay={2}
          />

          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <DashboardPage/>
              </ProtectedRoute>
            }/>
            <Route path="/signup" element={
              <RedirectAuthenticatedUser>
                <SignupPage/>
              </RedirectAuthenticatedUser>
              }/>
            <Route path="/login" element={
              <RedirectAuthenticatedUser>
              <LoginPage/>
            </RedirectAuthenticatedUser>
            }/>
            <Route path="/verify-email" element={<EmailVerificationPage/>}/>
            <Route path="/forgot-password" element={<RedirectAuthenticatedUser>
              <ForgotPasswordPage/>
            </RedirectAuthenticatedUser>}/>

            <Route
              path="/reset-password/:token"
              element={
                <RedirectAuthenticatedUser>
                  <ResetPasswordPage/>
                </RedirectAuthenticatedUser>
              }            
            />
          </Routes>
          <Toaster/>
        </div>
    </>
  )
}

export default App