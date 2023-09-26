import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Post from '../component/Post'
const IndexPage = () => {
  const [posts,setPosts] = useState([])
  useEffect(() => {
    axios.get("post").then((res) => {
      
        setPosts(res.data)
    })

  },[])


  return (
   <>
    {posts.length > 0 && posts.map((post) => (
          
          <Post post={post} key={post._id}/>
    ))}
   </>
  )
}

export default IndexPage