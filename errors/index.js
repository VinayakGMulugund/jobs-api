const BadRequestError = require('./bad-request')
const customApiError = require('./customapi')
const NotFoundError = require('./notFound')
const Unauthenticated = require('./unauthenticated')

module.exports = {
    BadRequestError,
    customApiError,
    NotFoundError,
    Unauthenticated
}


