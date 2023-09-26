import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const {setUserInfo} = useContext(UserContext)
  const login = async (e) => {
    e.preventDefault();
  const data = await  axios.post("/login",JSON.stringify({
      username,
      password
    }),{
      headers:{"Content-Type":"application/json"}
    })
    const token = data.data?.token;
    if (data.status === 200) {
        if (token) {
          localStorage.setItem("token",token)
        }
      setUserInfo(data.data.UserDoc[0])
      setRedirect(true);
      
      
    } else {
      alert("错误凭证")
    }

  }

  if (redirect) {
    return <Navigate to={'/'}/>
  }



  return (
    <form className='login' onSubmit={login}> 
    <h1>登录</h1>
      <input type="text" placeholder='用户名' value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="password" name="" id=""  placeholder='密码' value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button>登录</button>

    </form>
  )
}

export default Login