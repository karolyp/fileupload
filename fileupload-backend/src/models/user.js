const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
}, {collection: 'users'});

userSchema.pre('save', async function(next) {
    let user = this;
    if (user.isModified('password')) {
        try {
            user.password = await bcrypt.hash(user.password, 10);
        } catch (e) {
            return next(e);
        }
    }
    return next();
});

userSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
