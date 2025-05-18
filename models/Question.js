const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} must have 4 options']
    },
    correctOption: {
        type: Number,
        required: true,
        min: 0,
        max: 3
    },
    topicTags: {
        type: [String],
        required: true
    }
});

function arrayLimit(val) {
    return val.length === 4;
}

module.exports = mongoose.model('Question', questionSchema);
