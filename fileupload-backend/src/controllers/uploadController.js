const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/upload', passport.authenticate('jwt', {session: false}),
    function (req, res) {
        console.log(req.user);
        res.send(req.user);
    }
);

module.exports = router;
