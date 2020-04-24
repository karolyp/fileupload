const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = require("../constants");
const {JWT_EXPIRATION} = require("../constants");

const router = express.Router();
router.post('/login', async (req, res, next) => {
    passport.authenticate('local', {session: false}, async (err, user, info) => {
        try {
            if (err || !user) {
                res.status(401).json(info);
                return next(err);
            }
            req.login(user, {session: false}, async (error) => {
                if (error) return next(error);
                const token = jwt.sign({sub: user._id}, JWT_SECRET_KEY, {expiresIn: JWT_EXPIRATION});
                return res.json({token});
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

router.post('/verify', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.status(200).json({verified: true});
    next();
});


module.exports = router;
