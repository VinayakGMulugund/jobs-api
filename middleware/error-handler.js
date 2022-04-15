const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = async (err,req,res,next) => {

let customError = {
    //set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'something went wrong'
}

if(err.name=='ValidationError') {
    customError.msg = Object.values(err.errors).map((item)=>item.message).join(',')
    customError.statusCode = 400
}
    
if(err.name == 'CastError') {
    customError.msg = 'No item found with the id'
    customError.statusCode = 404
}
    //duplicate 
    if(err.code && err.code == 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field`
        customError.statusCode = 400
    }
    return res.status(customError.statusCode).json({msg: customError.message})
}

module.exports = errorHandlerMiddleware
