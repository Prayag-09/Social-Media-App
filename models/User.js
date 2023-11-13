const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        min:5,
        max:16,
        description:'Username should be of Min 5 character',
        unique: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: "",
    },
    followers: { // Should be an array
        type: Array,
        default: []
    }, 
    isAdmin:{
        type:Boolean,
        default: false // As default it should be false as it's user
    },    
    // This option automatically adds two fields, createdAt and updatedAt, 
    // to the documents in the collection
}, {timestamps: true});

module.exports = mongoose.model("Users", UserSchema);