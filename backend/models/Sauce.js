const mongoose = require('mongoose');
const { stringify } = require('querystring');

const sauceSchema = mongoose.Schema({
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true }, 
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: [{ type: String, required: true, default: [] }],
    usersDisliked: [{ type: String, required: true, default: [] }],
});

module.exports = mongoose.model('Sauce', sauceSchema);