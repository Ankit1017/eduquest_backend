const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const { default: axios } = require('axios');

// GET all questions
router.get('/', async (req, res) => {
    console.log("hitted")
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Function to get the tags from the backend
async function generateTags(prompt) {
    try {
        const response = await axios.post('http://127.0.0.1:8888/generate', {
            prompt: prompt
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // console.log(response.data.text);
        let text = response.data.text;
        let tags = text.split("\n")
        tags.forEach(myFunction)
        function myFunction(item, index, arr) {
            arr[index] = item.slice(2);
        }
        console.log(tags);

        return tags;
    } catch (error) {
        console.error('Error generating content:', error);
    }
}

// POST a new question
router.post('/', async (req, res) => {
    const { question, authorId, options, correctOption } = req.body;

    if (!Array.isArray(options) || options.length !== 4) {
        return res.status(400).json({ message: 'There must be exactly 4 options.' });
    }


    let prompt = "generate the topic tags form the following question in english only :\n";
    prompt = prompt + question;
    const tags = await generateTags(prompt);
    console.log(tags)

    const newQuestion = new Question({
        question,
        authorId,
        options,
        correctOption,
        topicTags: tags,
    });

    console.log(newQuestion);

    try {
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);

        // res.status(201).json(newQuestion)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;