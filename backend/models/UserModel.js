var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
    'username': {type: String, required: true, unique: true},
    'email': {type: String, required: true, unique: true},
    'password': {type: String, required: true},
    'createdAt': {type: Date, default: Date.now},
}, {timestamps: true});

UserSchema.statics.authenticate = async function (username, password) {
    try {
        const user = await this.findOne({username: username}).exec();

        if (!user) {
            throw new Error('Username not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return user;
        } else {
            throw new Error('Invalid password');
        }
    } catch (err) {
        throw err;
    }
};


UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        next();
    } catch (err) {
        return next(err);
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;