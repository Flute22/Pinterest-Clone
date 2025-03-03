const mongoose = require("mongoose");

// Custom capitalize function
const capitalizeWords = (value) => {
    if (!value) return value; // Agar value nahi hai to wapas kar do
    return value
        .toLowerCase() // Pehle pura lowercase karo
        .split(' ') // Words mein split karo
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Har word ka first letter bada karo
        .join(' '); // Wapas join karo
};

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    title: {
        type: String,
        set: capitalizeWords
    },
    description: {
        type: String,
        set: capitalizeWords
    },
    image: String
});

module.exports = mongoose.model("Post", postSchema);