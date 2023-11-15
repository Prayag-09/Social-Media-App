const router = require('express').Router();
const Post = require('../schemas/Post');
const User = require('../schemas/User');

// Create Post

router.post('/post' ,  async (req,res) => {
    try{
        const newPost = await new Post(req.body).save();
        res.status(500).json({message : "Post created Succesfully"})
    } catch(error){
        console.error(error.message);
        res.json({message : "Error is in : " , error:error.message})
    }
})
// Update Post
// Delete Post
// Like or Unlike Post
// Get Post
// Get Post for timeline.

module.exports = router; 