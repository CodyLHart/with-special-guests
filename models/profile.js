var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bandName: {
        type: String,
        maxlength: 35,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'],
        required: true
    },
    about: {
        type: String,
        maxlength: 140,
        required: true
    },
    genre: {
        type: String,
        maxlength: 30,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    avatar: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);