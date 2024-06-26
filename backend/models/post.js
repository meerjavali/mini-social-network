const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title: {type:String, required:true},
    content: {type:String, required:true},
    imagePath: {type:String, required:true},
    creator:{type: mongoose.Schema.Types.ObjectId, ref:"user", required:true}// for authorization
});

module.exports = mongoose.model('Post', postSchema);