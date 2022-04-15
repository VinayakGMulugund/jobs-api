const mongoose = require("mongoose")
const {isEmail} = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide a name'],
        minlength: 3,
        maxlength: 40,
    },
    email: {
        type: String,
        required: [true, 'must provide a email'],
        validate: [isEmail, 'invalid email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'must provide a passwrod'],
    },
})

//encrypt password
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)   //this = current document 
    next()
})

//jwt token generation
userSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id, name: this.name}, process.env.jwt_secret, {expiresIn: process.env.jwt_expiry})
}

//cmpare password
userSchema.methods.comparePassword = async function(pass) {
    const isMatch = await bcrypt.compare(pass, this.password)
    return isMatch
}

module.exports = mongoose.model('User', userSchema)