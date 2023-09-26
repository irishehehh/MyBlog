import React from 'react'
import "./App.less"

import Layout from './component/LayOut'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'
import {UserContextProvider} from './UserContext'
import CreatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'
import EditPost from './pages/EditPost'
axios.defaults.baseURL = "http://localhost:9000"
axios.defaults.withCredentials = true


const App = () => {

  return  (
    <UserContextProvider>
     <Routes>
      <Route  path='/'  element={<Layout />}>
      <Route index element={<IndexPage/>}/>
      <Route path={'/login'} element={ <Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/create' element={<CreatePost/>}/>
      <Route path={"/post/:id"} element={<PostPage/>}/>
      <Route path={"/edit/:id"} element={<EditPost/>}/>

      </Route>
    </Routes>
     </UserContextProvider>
  
 
  )
}

export default App
