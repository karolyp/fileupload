const router = require('express').Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
    const {email, password} = req.body;
    if (email && password) {
        const user = new User({email, password});
        try {
            const userExists = await User.countDocuments({email});
            console.log(userExists);
            if (userExists === 0) {
                const savedUser = await user.save();
                console.log(savedUser);
                res.status(200).send({message: "OK"});
            } else {
                res.status(409).send({message: "Already exists."});
            }
        } catch (error) {
            console.error("Error", error.message);
            res.status(500).send({message: "Internal server error."});
        }
    } else {
        res.status(400).send({
            message: "Email or password is not present."
        });
    }
});

module.exports = router;
