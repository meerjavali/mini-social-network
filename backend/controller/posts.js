const Post = require('../models/post')

exports.createPost = (req,res,next)=>{
    const url = req.protocol + '://' + req.get("host");
    const post = new Post({
        title:req.body.title,
        content:req.body.content,
        imagePath: url + "/images/"+ req.file.filename,
        creator: req.userData.userId // here we are using the userid decoded from the token in checkAuth middle ware
    });
    post.save().then(result=>{
        const id = result._id;
        console.log(result);
        res.status(201).json({
            message: 'Post added Successfully!',
            post:{
                ...result,
                id: result._id
            }
            });
    }).catch(err=>{
        res.status(500).json({message:"couldnt create the post!!"});
    })        
    }

exports.getPostById = (req,res,next)=>{
    Post.findById(req.params.id).then((post)=>{
        if(post){
            res.status(200).json(post);
        }
        else{
            res.status(404).json({message:'post not Found!'});
        }
    }).catch(err=>{
        res.status(500).json({message:"couldnt fetch the post!!"});
    })
}

exports.getPosts = (req,res,next)=>{
    const pageSize = +req.query.postSize;
    const page = +req.query.page;
    console.log("page sisze "+pageSize+" page "+page);
    const postQuery = Post.find();
    let fetchedPosts ;
    if(pageSize && page ){
        postQuery
        .skip(pageSize * (page-1))
        .limit(pageSize);
    }
    postQuery.then((documents)=>{
        fetchedPosts =documents;
            //Post.count(); updated countDoucments()
        return Post.countDocuments()
    }).then((count)=>{
        res.status(200).json({
            message: 'post fetched successfully!',
            posts:fetchedPosts,
            maxPosts: count
        })
    }).catch(err=>{
                res.status(500).json({message:"couldnt fetch the posts!!"});
})

}
exports.deletePost = (req,res,next)=>{
    Post.deleteOne({_id:req.params.id, creator:req.userData.userId}).then((result)=>{
        console.log(result);
        if(result.deletedCount > 0){
            res.status(200).json({message:"post deleted"});
        }
        else{
            res.status(401).json({message:"not authorized user"})
        }

        
    }).catch(err=>{
        res.status(500).json({message:"couldnt delete the post!!"});
    });
}
exports.updatePost = (req,res, next)=>{
        let imagePath = req.body.imagePath;
        if(req.file){
            const url = req.protocol + '://' + req.get("host");
            imagePath= url + "/images/"+ req.file.filename
        }
        const post = ({
            title: req.body.title,
            content: req.body.content,
            imagePath: imagePath,
            creator: req.userData.userId
        });
        Post.updateOne({ _id:req.params.id, creator:req.userData.userId },post).then(result=>{
            console.log(result);
            if(result.modifiedCount > 0){
                console.log("check the response ",res);
                res.status(200).json({message:"post modified!!"});
                console.log("sent modifed message!!");

            }
            else{
                res.status(401).json({message:"not authorized user"})
            }
        }).catch(err=>{
            res.status(500).json({
                message:"couldnt update the post!!"
            });
        });
    
    }
