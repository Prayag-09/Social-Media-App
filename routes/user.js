const router = require('express').Router();
const User = require('../schemas/User');
const bcrypt = require('bcrypt');

// Update user'
router.put("/:id", async (req, res) => {
    const { userId, password } = req.body;
    try {
        if (userId === req.params.id || req.body.isAdmin) {

            //Updating Password
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                req.body.password = hashedPassword;
            }

        // Updating UserID
        // new : true --> is needed beacuse it tell that this is a new update not the old data
        const user = await User.findByIdAndUpdate(req.params.id,userId);

        res.status(200).json({message:"Account details has been updated ", user});
        } else {
        res.status(403).json({message: "You can update only your account!"});
        }

        // Error logginh
    } catch (error) {
        res.status(500).json(error.message || "Internal Server Error");
    }
});

module.exports = router;

// Delete user
router.delete('/:id', async (req,res) =>{
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        const deleteUser = await User.findByIdAndDelete( req.params.id )
        if (deletedUser) {
            res.status(200).json({ message: "User has been deleted successfully", deletedUser });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } else {
        res.status(500).json({message : "You can only delete your account."});
    }
})
// Get a user
router.get('/:id', async (req,res) =>{
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc; // This is used to Hide those sensitive things from showing
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Follow user
router.put('/:id/follow', async (req, res) => {
    const { userId } = req.body;

    if (userId !== req.params.id) {
        try {
        const you = await User.findById(req.params.id); // You
        const user = await User.findById(userId); // To be followed by you

        if (!you.followings.includes(userId)) {
            // User is following userToFollowed
            await you.updateOne({
                $push: { followings: userId }
            });

            // userToFollowed has a follower -> User
            await user.updateOne({
                $push: { followers: req.params.id }
            });

            res.status(200).json({ message: "User followed successfully" });
        } else {
            res.status(403).json({ message: "You are already following" });
        }
    } catch (error) {
        console.error('Error following user:', error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
    } else {
        res.status(403).json({ message: "You can't follow yourself!" });
    }
});

// Unfollow user
router.put('/:id/unfollow', async (req, res) => {
    const { userId } = req.body;

    if (userId !== req.params.id) {
        const you = await User.findById(req.params.id); // You
        const user = await User.findById(userId); // To be unfollowed by you

        if (you.followings.includes(userId)) {
            // User is following userToUnfollow
            await you.updateOne({
                $pull: { followings: userId }
            });

            // userToUnfollow has a follower -> User
            await user.updateOne({
                $pull: { followers: req.params.id }
            });

            res.status(200).json({ message: "User unfollowed successfully" });
        } else {
            res.status(403).json({ message: "You are not following this user" });
        }
    } else {
        res.status(403).json({ message: "You can't unfollow yourself!" });
    }
});

module.exports = router;