const { StatusCodes } = require("http-status-codes")
const User = require("../models/User")
const BadRequestError = require("../errors/bad-request")
const Unauthenticated = require("../errors/unauthenticated")

const register = async (req,res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({token})
}



const login = async (req,res) => {
    const { email, password} = req.body;
    if(!email || !password) {
        throw new BadRequestError('please provide email and password')
    }
    const user = await User.findOne({email})

    if(!user) {
        throw new Unauthenticated('not authenticated')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect) {
        throw new Unauthenticated('wrong password')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ token})
}

module.exports = {register, login}

