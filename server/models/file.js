const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs'); // require bcryptjs here
const jwt = require('jsonwebtoken'); 

const fileSchema = new mongoose.Schema({
    URL: {
        type: String, 
        required: false,
        unique: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    }

}, { timestamps: true });

const File = mongoose.model('File', fileSchema);

module.exports = File;

