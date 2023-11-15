const express = require('express')
const app = express(); 
const dotenv = require('dotenv')
const helmet = require('helmet') // Securing requests
const morgan = require('morgan') // Easier to log 
const mongoose = require('mongoose')
const port = process.env.PORT || 3000; // Getting Port from env file

dotenv.config();

// Middlewares
app.use(express.json()); 
app.use(helmet()) 
app.use(morgan("tiny")) 

mongoose.connect(process.env.MONGO_URL) // URL from env file
.then(() => {
        console.log('Connected to MongoDB');
    })
.catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

app.use('/app/users' , userRoute); // Routes to user page
app.use('/app/auth' , authRoute); // Routes to auth page

app.listen(port, () => {
    console.log(`Server is up @ http://localhost:${port} `)
})