const express = require('express')
const app = express(); 
app.use(express.json()); // Middlewares

const dotenv = require('dotenv')
dotenv.config();

const helmet = require('helmet') // Securing requests
app.use(helmet()) // Middlewares

const morgan = require('morgan') // Easier to log 
app.use(morgan("tiny")) // Middlewares

const mongoose = require('mongoose')

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const port = process.env.PORT // Getting Port from env file
mongoose.connect(process.env.MONGO_URL) // URL from env file

app.use('/api/users' , userRoute); // Routes to user page
app.use('/api/auth' , authRoute); // Routes to auth page

app.listen(port, () => {
    console.log(`Server is up @ http://localhost:${port} `)
})