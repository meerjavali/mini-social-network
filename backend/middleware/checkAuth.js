const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try{
        console.log("we are here")
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,'secrt_key_should_be_longer');
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({
            message: "Auth Failed"
        });
    }
}