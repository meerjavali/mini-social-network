const express = require('express');
const Post = require('../models/post')
const router = express.Router();


//post call
router.post("", (req,res,next)=>{
    const post = new Post({
        title:req.body.title,
        content:req.body.content
    });
    post.save().then(result=>{
        const id = result._id;
        console.log(result);
        res.status(201).json({
            message: 'Post added Successfully!',
            postId: id
            });
    })
    
    
    
    })
    
    
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
        Post.find().then((documents)=>{
            res.status(200).json({
                message: 'post fetched successfully!',
                posts:documents
               })
            });
    
        });
       // res.send("hellow from second middle ware");
       
    router.delete("/:id",(req,res,next)=>{
        Post.deleteOne({_id:req.params.id}).then((result)=>{
            console.log(result);
    
            res.status(200).json({message:"post deleted"});
        });
    });
    
    router.put("/:id", (req,res, next)=>{
        //dont add new here 
        const post = ({
            title: req.body.title,
            content: req.body.content,
        });
        console.log("meer the id is ", req.params.id);
        Post.updateOne({ _id:req.params.id },post).then(result=>{
            console.log(result);
            res.status(200).json({
                message: 'Post updated  Successfully!',
                });
        })
    
    });

    module.exports = router;
