const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    googleId: String,
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    avatar: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);