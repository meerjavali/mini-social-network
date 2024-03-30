const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try{
        console.log("we are here")
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token,'secrt_key_should_be_longer'); // will retrieve the token details email and id
        console.log("check the decoded token ",decodedToken)
        req.userData ={email: decodedToken.email, userId:decodedToken.userId}; // adding the userData so that next middle ware can use the userId for authorization
        console.log("from check auth",req.userData);
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({
            message: "Auth Failed"
        });
    }
}