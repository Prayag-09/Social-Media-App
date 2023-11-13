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
    } 
});

module.exports = mongoose.model("Admin", adminSchema);