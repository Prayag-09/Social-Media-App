const User = require('../schemas/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');

// Registering the user
router.post("/signup", async (req,res) => {
    try {        
        const {username,email,password} = req.body;
        
        // Hashing the password using bcrypt
        // const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, 10);  // Can use the above obj - salt / 10 directly
        
        const existingUser = await User.findOne({username,email});
        if (existingUser) 
                return res.status(200).json({ message: `${username} already exists` });
    // If user doesn't exist. Just continue with the code.
    
    // Creating new user
    const userDetails = { username,email,password: hashedPassword};
    const newUser = new User(userDetails); 
    const user = await newUser.save(); // .save() should save it to the database
            res.status(201).json({
                message: "User registered successfully",
                user:  user,  // Send the saved user details in the response if needed
            });

        } catch (error) {
            console.error('Error registering user:', error.message);
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
    });

// Loggin IN 
router.post("/login", async (req,res) => {
    try{
        const {email, password} = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(404).json({ message: `${email} - Not Found! Sign Up First` });

        // Validating Password
        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword)
            return res.status(400).json({ message: "Wrong password" });

        res.status(200).json({
            message: "Logged in Successfully",
            user: existingUser,
        })

    } catch(error) {
        console.error('Error:', error.message);
        res.status(500).json({
            messgage: " Internal Server Error",
        })
    }
})

module.exports = router;