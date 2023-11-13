const User = require('../User');

const router = require('express').Router();

// Registering the user
router.post('/new/user' , async (req,res) => {
    const {username, password , email} = req.body;
    const admin = await Admin.findOne(username);
});

module.exports = router;