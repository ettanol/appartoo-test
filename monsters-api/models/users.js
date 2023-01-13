"use strict";
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    },
    profileImageUrl: {
        type: String,
    },
    isConnected: {
        type: Boolean,
    },
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
