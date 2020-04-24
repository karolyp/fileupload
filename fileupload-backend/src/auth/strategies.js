const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const {JWT_SECRET_KEY} = require("../constants");

const localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({email});
        if (!user){
            return done(null, false, {message: 'Cannot find user with e-mail address!'});
        }
        const valid = await user.isValidPassword(password);
        if(!valid) {
            return done(null, false, {message: 'Password is incorrect!'});
        }
        return done(null, user, {message: 'Logged in Successfully'});
    } catch (error) {
        return done(error);
    }
});

const jwtStrategy = new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET_KEY,
    },
    (jwtPayload, done) => {
        User.findOne({_id: jwtPayload.sub}, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }
);

module.exports = {localStrategy, jwtStrategy};
