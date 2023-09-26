import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect,useState } from 'react'

import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../UserContext'

const Header = () => {
  
  const {setUserInfo,userInfo} = useContext(UserContext)
    
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    axios.post("/profile",token,{
      withCredentials:true
    }).then((res) => {
  
        setUserInfo(res.data.username)
        localStorage.setItem("username",res.data.username)
    }) 
   
  },[])

  const handleLogOut = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username")
      setUserInfo(null)

  }

  const username = userInfo?.username || localStorage.getItem("username")

  return (
    <header>
    <Link   to={"/"} className="logo">我的博客</Link>
    <nav>
      {username &&  (
        <>
        <Link to={'/create'}>创建新博客</Link>
        <a  onClick={() => handleLogOut()}>退出账号</a>
        </>
      )}
      {
        !username && (
          <>
           <Link to="/login">登录</Link>
       <Link to="/register">注册</Link>
          </>

        )
      }
     
    </nav>
  </header>
  )
}

export default Header