const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const { analyzeTopicAssociations }=require('../helpers/tagHelper')
router.post('/', async (req, res) => {
    let { tags } = req.body;

    try {
        const associations = await analyzeTopicAssociations();
        if(tags.length==0){
            tags = await Question.distinct('topicTags');
        }
        const relatedTags = tags.slice();
        associations.forEach(association => {
            if (tags.includes(association.topics[0]) && !relatedTags.includes(association.topics[1])) {
                relatedTags.push(association.topics[1]);
            } else if (tags.includes(association.topics[1]) && !relatedTags.includes(association.topics[0])) {
                relatedTags.push(association.topics[0]);
            }
        });
        console.log(relatedTags)
        const questions = await Question.aggregate([
            { $match: { topicTags: { $in: relatedTags } } },
            { $sample: { size: 10 } }
        ]);
    
        res.json(questions);
    } catch (error) {
        console.error('Error generating question paper:', error);
        res.status(500).json({ message: 'Error generating question paper' });
    }
});

module.exports = router;