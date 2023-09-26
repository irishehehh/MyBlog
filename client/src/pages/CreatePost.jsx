import React, { useState } from 'react'
import ReactQuill   from 'react-quill'
import "react-quill/dist/quill.snow.css"
import axios from 'axios'
import {Navigate} from 'react-router-dom'
const modules  = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

const  formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]
const CreatePost = () => {

      const [title,setTitle] = useState("")
      const [summary, setSummary] = useState("")
      const [content, setContent] = useState("")
      const [file, setFile] = useState("")
      const [redirect,setRedirect] = useState(false);
   
      const handleCreatePost = async(e) => {
        const formData = new FormData();
        const token = localStorage.getItem("token")
        formData.set("title",title)
        formData.set("summary",summary)
        formData.set("content",content)
        formData.set("file",file[0])
        formData.set("token",token)
        
      
          e.preventDefault();
      const res =  await  axios.post("/post",formData);
   
          if (res.statusText =='OK') {

                setRedirect(true)
          }
     
      }
      
      if (redirect) {

        return (<Navigate to={'/'}/>)
      }


  return (
      <form onSubmit={(e) => handleCreatePost(e)}>
        <input type="title" name="" id="" placeholder={"title"} value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="summary" name="" id=""  placeholder={'summary'} value={summary} onChange={(e) => setSummary(e.target.value)}/>
        <input type="file" name="" id=""   onChange = {(e) => setFile(e.target.files)} />
        <ReactQuill value={content} modules={modules} formats={formats} onChange={newValue => setContent(newValue)} />
        <button style={{marginTop:"5px"}}>创建新博客</button>
      </form>
  )
}

export default CreatePost