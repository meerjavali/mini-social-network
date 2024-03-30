const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');


router.post('/signUp', (req,res,next)=>{
    console.log("we are here");
    bcrypt.hash(req.body.password, 10)
    .then((hash)=>{
       // console.log(hash);
        const user = new User({
            email: req.body.email,
            password: hash
    
         });
         user.save()
            .then(result=>{
            //    console.log(result);
                res.status(201).json({
                    message: 'user created',
                    result: result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error: err
                })
            });

    })
     

});

router.post('/login',(req,res,next)=>{
    User.findOne({email : req.body.email})
    .then(user=>{
      //  console.log("user is ",user);
         console.log("user details are ", user);
        if(!user){
            res.status(401).json({
                message: 'Auth Failed'
            });
        }
     
        return {...user, check:bcrypt.compare(req.body.password, user.password)};
    })
    .then(result=>{
       // console.log(result);
        if(!result.check){
            res.status(401).json({
                message: 'Auth Failed'
            });
        }
       // console.log("token creation started");
       //_doc is new updated mongoose version
        const token = jwt.sign({email: result._doc.email, userId: result._doc._id}, 'secrt_key_should_be_longer', {expiresIn:'1h'});
      //console.log("token creation ended");
      //  console.log(token);
        res.status(200).json({
            token:token,
            expiresIn: 3600,
            userId: result._doc._id
        })


    })
    .catch(err=>{
        console.log(err);
        console.log("when invalid credentials given");
        res.status(401).json({
            message: 'Auth Failed'
        });
    })
})
module.exports = router;