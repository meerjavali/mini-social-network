const express = require('express');
const multer = require('multer');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const postController = require('../controller/posts')


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
router.post("", checkAuth, multer({storage:storage}).single('image'), postController.createPost );
    
    
    //get post by id
    
router.get("/:id", postController.getPostById );
    
    //get call
router.get("", postController.getPosts);
       // res.send("hellow from second middle ware");
       
router.delete("/:id", checkAuth, postController.deletePost);
    
router.put("/:id", checkAuth, multer({storage:storage}).single('image'), postController.updatePost);

    module.exports = router;
