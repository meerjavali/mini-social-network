const bodyParser = require('body-parser');
const express = require('express')
const Post = require('./models/post')
const mongoose = require('mongoose');

const app =express();
//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//mongoose connection

mongoose.connect("mongodb+srv://meerjavali99:sdgx8btyLMarGZKi@cluster0.wpnatlu.mongodb.net/node-angular?retryWrites=true&w=majority").
then(()=>{
    console.log("Connected to database ");
}).catch(()=>{
    console.log("failed to connect");
});

app.use((req,res,next)=>{
    //basic middle ware
    // console.log("first middle ware");
    // next();

    //for cors error
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});


//post call
app.post("/api/posts", (req,res,next)=>{
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

//get call
app.get("/api/posts",(req,res,next)=>{
    Post.find().then((documents)=>{
        res.status(200).json({
            message: 'post fetched successfully!',
            posts:documents
           })
        });

    });
   // res.send("hellow from second middle ware");
   
app.delete("/api/posts/:id",(req,res,next)=>{
    Post.deleteOne({_id:req.params.id}).then((result)=>{
        console.log(result);

        res.status(200).json({message:"post deleted"});
    });
});

app.put("/api/posts/:id", (req,res, next)=>{
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
module.exports = app;