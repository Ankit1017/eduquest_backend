const express = require('express');
const router = express.Router();
const UserAnswer = require('../models/UserAnwser')
const ObjectId = require('mongoose').Types.ObjectId;

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    console.log(userId)
    try {
        const userAnswers = await UserAnswer.find({ userId }).populate('questionId');
        const topicPerformance = {};
        // console.log(userAnswers)
        userAnswers.forEach((answer) => {
            answer.topics.forEach((topic) => {
                // console.log(topic)
                if (!topicPerformance[topic]) {
                    topicPerformance[topic] = { correct: 0, total: 0 };
                }
                if (answer.isCorrect) {
                    topicPerformance[topic].correct += 1;
                }
                topicPerformance[topic].total += 1;
            });
        });
        // console.log(topicPerformance)
        const topicAnalysis = Object.keys(topicPerformance).map((topic) => {
            const { correct, total } = topicPerformance[topic];
            return {
                topic,
                correct,
                total,
                accuracy: (correct / total) * 100,
            };
        });

        res.json({ topicAnalysis });
    } catch (error) {
        console.error('Error fetching user performance:', error);
        res.status(500).json({ message: 'Error fetching user performance' });
    }

    // res.status(200).send({ message: "all good" });
});

router.get("/:userId/:topic", async (req, res) => {
    const { userId, topic } = req.params;
    const user_id = new ObjectId(userId);
    console.log(user_id, topic);
    try {
        const data = await UserAnswer.find({
            userId: userId,
            topics: topic,
        }).populate('questionId')

        // console.log(data);
        res.status(200).json({ data });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "error in fetching data" });
    }
})

module.exports = router;