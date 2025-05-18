const mongoose = require('mongoose');

const UserAnswerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    questionId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Question' },
    selectedOption: { type: Number, required: true },
    isCorrect: { type: Boolean, required: true },
    topics: [{ type: String }],
}, { timestamps: true });

const UserAnswer = mongoose.model('UserAnswer', UserAnswerSchema);

module.exports = UserAnswer;
