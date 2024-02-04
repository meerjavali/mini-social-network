const express = require('express')

const app =express();
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
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/posts",(req,res,next)=>{
    const posts = [
        {
            id: "hjfgahds",
            title: "First server-side post",
            content: "This is coming from the server"
        },
        {
            id: "skjfsdkjfh",
            title: "second server-side post",
            content: "This is coming from the server too"
        }
    ];
   // res.send("hellow from second middle ware");
   res.status(200).json({
    message: 'post fetched successfully!',
    posts:posts
   })
});

module.exports = app;