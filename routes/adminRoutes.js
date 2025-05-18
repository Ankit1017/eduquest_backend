const express = require('express');
const User = require('../models/User');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

router.patch('/add-admin', async (req, res) => {
    const { user_id } = req.body; //this coming from the frontend , this is the id of whom we want to make the admin , this will always exist 
    const objectId = new ObjectId(user_id);
    console.log(req.body, objectId);
    try {
        const user = await User.findOneAndUpdate(
            { _id: objectId },
            { isAdmin: true },
            { new: true },
        )

        console.log(user);
        res.status(200).json({ message: "user made admin successfully!!" });
    }
    catch (err) {
        // console.log(err)
        res.status(500).json({ message: err.message });
    }

    // res.status(200).send("all good");
});


//send all the users as requested 
router.get('/get-allusers', async (req, res) => {
    try {
        const data = await User.find({ isAdmin: false }, { username: 1, _id: 1, isAdmin: 1 })
        // const data = await User.find({}, { username: 1, _id: 1, isAdmin: 1 })
        // console.log(data);
        res.status(200).send({ data: data });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;