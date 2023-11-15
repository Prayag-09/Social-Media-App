const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    Admin: {
        type:String,
        min:5,
        unique:true,
    },
    Password: {
        type:String,
        min:8,
        max:15
    }, 
    isAdmin:{
        type:Boolean,
        default: false // As default it should be false as it's user
    }
}, {timestamp : true });

module.exports = mongoose.model("Admin", adminSchema);