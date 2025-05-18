const Question = require('../models/Question');
const UserAnswer =require('../models/UserAnwser')


const analyzeTopicAssociations = async () => {
    try {
        const userAnswers = await UserAnswer.find({});
        const topicPairs = {};
        const topicCounts = {};

        userAnswers.forEach(answer => {
            const topics = answer.topics;

            topics.forEach((topic, index) => {
                if (!topicCounts[topic]) {
                    topicCounts[topic] = 0;
                }
                topicCounts[topic] += 1;

                for (let i = index + 1; i < topics.length; i++) {
                    const pair = [topic, topics[i]].sort().join('-');
                    if (!topicPairs[pair]) {
                        topicPairs[pair] = 0;
                    }
                    topicPairs[pair] += 1;
                }
            });
        });

        const topicAssociations = Object.keys(topicPairs).map(pair => {
            const [topic1, topic2] = pair.split('-');
            const count = topicPairs[pair];
            const support = count / userAnswers.length;
            const confidence = count / topicCounts[topic1];
            return { topics: [topic1, topic2], support, confidence };
        });

        return topicAssociations;
    } catch (error) {
        console.error('Error analyzing topic associations:', error);
        throw new Error('Error analyzing topic associations');
    }
};

module.exports = { analyzeTopicAssociations };