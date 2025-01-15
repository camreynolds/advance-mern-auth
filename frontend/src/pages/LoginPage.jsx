// library imported
import React,{useState} from 'react'
import {motion} from "framer-motion"
import {Mail,Lock,Loader} from "lucide-react"
import {Link} from "react-router-dom"

// local imported
import Input from "../components/Input"

function LoginPage() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const isLoading = false

  const handleLogin = (e) =>{
    e.preventDefault()
  }

  return (
    <motion.div>
      <div>
        <h2>Welcome Back</h2>

        <form onSubmit={handleLogin}>

          <Input 
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <Input 
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <div>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <motion.button disabled={isLoading}>
            {isLoading ? <Loader/> : "Login"}
          </motion.button>
        </form>
      </div>

      <div>
        <p>Don't have an accout?{" "}
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </motion.div>
  )
}

export default LoginPage