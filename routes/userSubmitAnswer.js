const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const UserAnswer =require('../models/UserAnwser')
router.post('/', async (req, res) => {
    const { userId, userAnswers } = req.body;

    try {
        const questions = await Question.find({ _id: { $in: Object.keys(userAnswers) } });
        let score = 0;
        const userAnswerRecords = [];

        questions.forEach((question) => {
            const isCorrect = question.correctOption === userAnswers[question._id];
            if (isCorrect) score += 1;
            userAnswerRecords.push({
                userId,
                questionId: question._id,
                selectedOption: userAnswers[question._id],
                isCorrect,
                topics: question.topicTags,
            });
        });

        await UserAnswer.insertMany(userAnswerRecords);

        res.json({ score, total: questions.length });
    } catch (error) {
        console.error('Error submitting answers:', error);
        res.status(500).json({ message: 'Error submitting answers' });
    }
  });

module.exports = router;