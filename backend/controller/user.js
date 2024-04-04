const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.createdUser = (req,res,next)=>{
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
                    message:"Invalid user cerdentials!"  
                })
            });

    })
     

}

exports.userLogin = (req,res,next)=>{
    let fetchedUser;
    User.findOne({email : req.body.email})
    .then(user=>{
      //  console.log("user is ",user);    
        if(!user){
            return res.status(401).json({
                message: 'Auth Failed'
            });

        }
        fetchedUser =user;
        return bcrypt.compare(req.body.password, user.password);   
    })
    .then(result=>{
       // console.log(result);
        if(!result){
           return  res.status(401).json({
                message: 'password Incorrect !!!'
            });
        }
       // console.log("token creation started");
        console.log("fetched user",fetchedUser);
        const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 'secrt_key_should_be_longer', {expiresIn:'1h'});
        //console.log("token creation ended");
        //  console.log(token);
        console.log("token ",token);
        return res.status(200).json({
              token:token,
              expiresIn: 3600,
              userId: fetchedUser._id
          });
      
    })
    .catch(err=>{
       return res.status(500).json({message:"Invalid credentials occured!!"});
    })
}