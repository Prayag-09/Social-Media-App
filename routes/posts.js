const router = require('express').Router();
const Post = require('../schemas/Post');
const User = require('../schemas/User');

// Create Post

router.post('/' ,  async (req,res) => {
    try{
        const newPost = await new Post(req.body).save();
        res.status(500).json({message : "Post created Succesfully"})
    } catch(error){
        res.status(500).json({message : "Error is : " , error:error.message})
    }
})
// Update Post
router.put('/:id',async (req,res) => {
    try{
        const postId = req.params.id;
        const updatedPost = await Post.findByIdAndUpdate(postId,{ $set: req.body })
        if(updatedPost.userId === req.body.userId){
            res.status(200).json("The post has been updated");
        } else {
            res.status(500).json(" You can only update your post! ")
        }
    } catch(error){
        res.status(500).json(error.message)
    }
})

// Delete Post

router.delete('/:id',async (req,res) =>{
    try{
        const deletePost = await Post.findByIdAndDelete(req.params.id);
        if (deletePost.userId === req.body.userId) {
            if (deletePost) {
                res.status(200).json({ message: "Post has been deleted successfully", deletePost });
            } else {
                res.status(404).json({ message: "Post not found" });
            }
        } else
                res.status(403).json("You can delete only your post");
    } catch(error){
        res.status(500).json(error.message)
    }
})
// Like or Unlike Post
router.put("/:id/like", async (req, res) => {
    const postId = req.params.id;
    const userId = req.body.userId;
    try {
        const post = await Post.findById(postId);
            if (!post.likes.includes(userId)) {
                await post.updateOne({ $push: { likes: userId } });
                res.status(200).json("The post has been liked");
            } else {
                await post.updateOne({ $pull: { likes: userId } });
                res.status(200).json("The post has been disliked");
            }
    } catch (error) {
        res.status(500).json(error.message);
    }
});
// Get Post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error.message);
    }
});
// Get Post for timeline.

router.get("/timeline/all", async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
            return Post.find({ userId: friendId });
            })
        );
        res.json(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router; 