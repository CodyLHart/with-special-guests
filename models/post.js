const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var submissionSchema = new Schema ({
    profileId: {
        type: Schema.Types.ObjectId,
        ref: "Profile",
        required: true
    }
}, {
    timestamps: true
})

var postSchema = new Schema ({
    host: {
        type: Schema.Types.ObjectId,
        ref: "Profile",
        // required: true
    },
    hostBand: String,
    date: {
        type: Date,
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
    venue: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    },
    submissions: [submissionSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);