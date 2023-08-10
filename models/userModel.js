const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema
    (
        {
            username: {
                type: String,
                required: [true, "please add your username "]
            },
            email: {
                type: String,
                unique: [true, "email address has already registered"],
                required: [true, "please add your email address"],
            },

            password: {
                type: String,
                required: [true, "please add your password"]
            }

        },
        {
            timestamps: true,
        }
    )

module.exports = mongoose.model('user', UserSchema);