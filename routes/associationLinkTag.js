
const express = require('express');
const router = express.Router();
const { analyzeTopicAssociations }=require('../helpers/tagHelper')


router.get('/', async (req, res) => {
    try {
        const associations = await analyzeTopicAssociations();
        res.json({ associations });
    } catch (error) {
        console.error('Error fetching topic associations:', error);
        res.status(500).json({ message: 'Error fetching topic associations' });
    }
  });

module.exports = router;