const User = require("../models/User")
const jwt = require('jsonwebtoken')
const Unauthenticated = require("../errors/unauthenticated")

const auth = async (req,res,next) => {
    //check for header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Unauthenticated('authentication failed')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.jwt_secret)
        req.user = {userId: payload.userId, name:payload.name}
        next()
    } catch (error) {
        throw new Unauthenticated('authentication failed')
    }
}

module.exports = auth