const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

router.get('/', async (req, res) => {
    try {
        const tags = await Question.distinct('topicTags');
        // console.log(tags)
        res.json(tags);
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({ message: 'Error fetching tags' });
    }
});

module.exports = router;