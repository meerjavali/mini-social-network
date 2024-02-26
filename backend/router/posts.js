const express = require('express');
const multer = require('multer');
const Post = require('../models/post')
const router = express.Router();


const MIME_TYPE = {
    'image/png':'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
       const isValid = MIME_TYPE[file.mimetype];
       let error = new Error('Invalid Mime Type');
       if(isValid){
        error =null;
       }

        cb(error,"backend/images");
    },
    filename: (req, file, cb)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE[file.mimetype];
        cb(null, name+"-"+ Date.now()+"-"+ext);
    }
});

//post call
router.post("", multer({storage:storage}).single('image'), (req,res,next)=>{
    const url = req.protocol + '://' + req.get("host");
    console.log("here in post call", req);
    const post = new Post({
        title:req.body.title,
        content:req.body.content,
        imagePath: url + "/images/"+ req.file.filename
    });
    post.save().then(result=>{
        const id = result._id;
        console.log(result);
        res.status(201).json({
            message: 'Post added Successfully!',
            post:{
                ...result,
                id: result._id
            }
            });
    })        
    });
    
    
    //get post by id
    
    router.get("/:id",(req,res,next)=>{
        Post.findById(req.params.id).then((post)=>{
            if(post){
                res.status(200).json(post);
            }
            else{
                res.status(404).json({message:'post not Found!'});
            }
        })
    })
    
    //get call
    router.get("",(req,res,next)=>{
        const pageSize = +req.query.postSize;
        const page = +req.query.page;
        console.log("page sisze "+pageSize+" page "+page);
        const postQuery = Post.find();
        let fetchedPosts ;
        if(pageSize && page ){
            postQuery
            .skip(pageSize * (page-1))
            .limit(pageSize);
        }
        postQuery.then((documents)=>{
            fetchedPosts =documents;
            return Post.countDocuments()
            }).then((count)=>{
                res.status(200).json({
                    message: 'post fetched successfully!',
                    posts:fetchedPosts,
                    maxPosts: count
                   })
            })
    
        });
       // res.send("hellow from second middle ware");
       
    router.delete("/:id",(req,res,next)=>{
        Post.deleteOne({_id:req.params.id}).then((result)=>{
            console.log(result);
    
            res.status(200).json({message:"post deleted"});
        });
    });
    
    router.put("/:id", multer({storage:storage}).single('image'), (req,res, next)=>{
        //dont add new here 
        let imagePath = req.body.imagePath;
        if(req.file){
            const url = req.protocol + '://' + req.get("host");
            imagePath= url + "/images/"+ req.file.filename


        }
        const post = ({
            title: req.body.title,
            content: req.body.content,
            imagePath: imagePath
        });
        console.log("meer the id is ", req.params.id);
        console.log(" the update imag ", imagePath);
        Post.updateOne({ _id:req.params.id },post).then(result=>{
            console.log(result);
            res.status(200).json({
                message: 'Post updated  Successfully!',
                });
        })
    
    });

    module.exports = router;
