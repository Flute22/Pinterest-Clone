const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

// Custom capitalize function
const capitalizeWords = (value) => {
    if (!value) return value; // Agar value nahi hai to wapas kar do
    return value
        .toLowerCase() // Pehle pura lowercase karo
        .split(' ') // Words mein split karo
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Har word ka first letter bada karo
        .join(' '); // Wapas join karo
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    name: {
        type: String,
        set: capitalizeWords
    },

    email: {
        type: String, 
        required: true,
        unique: true
    },

    profilePic: {
        type: String,
        default: 'default.jpg'
    },
    contact: String,

    boards: {
        type: Array,
        default: []
    },

    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
    
})

userSchema.plugin(plm)

module.exports = mongoose.model('User', userSchema)