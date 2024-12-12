const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: { 
    	type: String, 
    	required: true 
    },
    password: { 
    	type: String, 
    	required: true 
    },
    email: String,
    phone: String,
    is_admin: Boolean,
    zipcode: String,
    city: String
})

exports.User = mongoose.model('User', userSchema);