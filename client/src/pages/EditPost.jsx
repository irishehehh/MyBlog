import React,{useEffect, useState} from 'react'
import { Navigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"
import axios from 'axios'
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

const EditPost = () => {
  const [title,setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [file, setFile] = useState("")
  const [redirect,setRedirect] = useState(false);
  const {id} = useParams();

  const updatePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const token = localStorage.getItem("token")
    formData.set("title",title)
    formData.set("summary",summary)
    formData.set("content",content)
    formData.set("file",file?.[0])
    formData.set("id",id)
    formData.set("token",token)
   

   const data =  await axios.put("/post",formData)
        if (data.statusText === "OK") {
          setRedirect(true)
        }

  }

    useEffect(() => {
      axios.get(`/postDetail/${id}`).then(({data}) => {
       
        setTitle(data.title)
        setSummary(data.summary)
        setContent(data.content)

      })

    },[])


  if (redirect) {
    return (<Navigate to={'/post/'+id}/>)
  }





  return (
    <form onSubmit={(e) => updatePost(e)}>
        <input type="title" name="" id="" placeholder={"title"} value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="summary" name="" id=""  placeholder={'summary'} value={summary} onChange={(e) => setSummary(e.target.value)}/>
        <input type="file" name="" id=""   onChange = {(e) => setFile(e.target.files)} />
        <ReactQuill value={content} modules={modules} formats={formats} onChange={newValue => setContent(newValue)} />
        <button style={{marginTop:"5px"}}>更新博客</button>
      </form>
  )
}

export default EditPost