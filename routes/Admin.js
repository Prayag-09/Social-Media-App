const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    Admin: {
        type:String,
        min:5,
        unique:true,
        
    },
    Password: String 
});

module.exports = mongoose.model("Admin", adminSchema);