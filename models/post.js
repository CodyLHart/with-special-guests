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
    date: {
        type: Date,
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