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
    followers: { 
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin:{
        type:Boolean,
        default: false // As default it should be false as it's user
    },
    desc: {
        type: String,
        max: 50,
    },
    city: {
        type: String,
        max: 50,
    },
    from: {
        type: String,
        max: 50,
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3],
    }
}, 
    {timestamps: true} // This option automatically adds two fields, createdAt and updatedAt, 
);  // to the documents in the collection

module.exports = mongoose.model("Users", UserSchema);