const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const postController = require('../controller/posts')
const extractFile = require('../middleware/file')




//post call
router.post("", checkAuth, extractFile, postController.createPost );
    
    
    //get post by id
    
router.get("/:id", postController.getPostById );
    
    //get call
router.get("", postController.getPosts);
       // res.send("hellow from second middle ware");
       
router.delete("/:id", checkAuth, postController.deletePost);
    
router.put("/:id", checkAuth, extractFile, postController.updatePost);

    module.exports = router;
