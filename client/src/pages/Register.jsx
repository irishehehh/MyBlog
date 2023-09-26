import axios from 'axios';
import React from 'react'
import { useState } from 'react';


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data =  await axios.post("/register",JSON.stringify({
        username,
        password
      }),{
          headers:{"Content-Type":"application/json"}
        })
      
       alert("注册成功") 
    } catch (err) {
      alert("注册失败，稍后注册")
    }


    
  
    

  
  }


  return (
    <form className='register'> 
    <h1>注册</h1>
    <input type="text" placeholder='用户名' 
    value={username} 
    onChange={e => setUsername(e.target.value)}
     />
    <input type="password" name="" id=""  placeholder='密码'
      value={password}
      onChange={e => setPassword(e.target.value)}
    
    />
    <button onClick={(e) => handleRegister(e)}>注册</button>

  </form>
  )
}

export default Register