const express = require("express")
const app = express();
const cors = require("cors")
const bcryptjs = require("bcryptjs")
const cookieParser = require("cookie-parser")
const multer = require("multer")
const uploadMiddleWare = multer({dest:"uploads/"}) 
const fs = require("fs");
const jwt  =  require("jsonwebtoken")
const mongoose = require("mongoose")
const User = require("./model/User")
const Post = require("./model/Post")
app.use(cors({
  credentials:true,
  origin: "http://127.0.0.1:5173"
}))
app.use(cookieParser())
app.use(express.json())
app.use("/uploads",express.static(__dirname + "/uploads"))
app.use(express.urlencoded({extended:true}))
const URL = "mongodb+srv://blog:4vakXmJDXRvLGU6w@cluster0.eolh49c.mongodb.net/?retryWrites=true&w=majority"
const secret = "sdjksaldjkasdhkasdas";
const salt = bcryptjs.genSaltSync(10);
mongoose.connect(URL)


app.post("/register",async (req,res) => {
    const {username,password} = req.body; 
    
  
      const userDoc =  await  User.create({username,
        password:bcryptjs.hashSync(password,salt)
       })
      
       
      res.json(userDoc)
})

app.post("/login",async (req,res) => {
    const {username,password} = req.body;
    const UserDoc =  await User.find({username})
 
   const isCurrent = bcryptjs.compareSync(password,UserDoc[0].password)

      if (isCurrent) {  
          jwt.sign({username,id:UserDoc[0]._id},secret,{},(err,token) => {
              if (err) throw err;
              res.cookie("token",token).json({token,UserDoc})
          })
      } else {
        res.status(400).json("错误通信证")
      }
})

app.post("/profile",(req,res) => {

  const token = Object.keys(req.body)[0];
  if (token) {
    jwt.verify(token,secret,{},(err,info) => {
      if (err) throw err;
      res.json(info)
    })

  }
  

})

app.post("/post",uploadMiddleWare.single("file"), async (req,res) => {
  
  const {originalname,path} =req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length-1];
  const newPath = path + '.' + ext
  fs.renameSync(path,newPath);
  const {title,summary,content,token} = req.body;

  jwt.verify(token,secret,{},async (err,info) => {
    if (err) throw err;
    const postDoc =  await Post.create({
      title,
      summary,
      content,
      cover:newPath,
      author:info.id
  })

  res.json(postDoc)
  })


    })

    app.get("/post",async (req,res) => {

        const postDoc = await Post.find().populate('author',['username']).sort({createdAt:-1}).limit(20)
      
        
          res.json(postDoc)

    })

    app.get("/postDetail/:id",  async (req,res) => {
            const {id}  = req.params;
           
            
            const postDoc = await Post.findById(id).populate('author',['username'])
           
            res.json(postDoc)
    })

 
    app.put("/post",uploadMiddleWare.single("file"),async (req,res) => {
      let newPath = null;
          if (req.file) {
            const {originalname,path} =req.file;
            const parts = originalname.split(".");
            const ext = parts[parts.length-1];
             newPath = path + '.' + ext
            fs.renameSync(path,newPath);
          }
       const {token,id,title,content,summary} = req.body;

       if (token) {
         jwt.verify(token,secret,{},async (err,info) => {
           if (err) throw err;
          const postDoc = await Post.findById(id)
          const isAuthor = postDoc.author.toHexString() === info.id
            if (!isAuthor) res.status(400).json("你不是该作者,无权修改");

            await postDoc.updateOne({
              title,
              summary,
              content,
              cover:newPath ? newPath : postDoc.cover,
            })

            res.json(postDoc)
          

         })
       }


    })



app.listen(9000,() => {
  console.log('ok');
})