const path = require('path')
const bodyParser = require('body-parser');
const express = require('express')
const postRoutes = require('../backend/router/posts');
const user = require('../backend/router/user');
const mongoose = require('mongoose');

const app =express();
//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images", express.static(path.join("backend/images")));

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

app.use("/api/posts", postRoutes);
app.use("/api/user", user);

module.exports = app;