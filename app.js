require('dotenv').config()
require('express-async-errors')
const express = require('express')
const connectdb = require('./db/connect')
const auth = require('./middleware/authentication')

const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const authrouter = require('./routes/auth')
const jobsrouter = require('./routes/jobs')

const app = express()
app.use(express.json())

//security
const helmet = require('helmet')
const cors = require('cors')
const rateLimiter = require('express-rate-limit')
const xssclean = require('xss-clean')

app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100
}))
app.use(helmet())
app.use(cors())
app.use(xssclean())





//routes
app.use('/api/auth', authrouter)
app.use('/api/jobs',auth, jobsrouter)

app.use(errorHandlerMiddleware)
app.use(notFound)


const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectdb(process.env.mongo_uri)
        app.listen(port, ()=>{
            console.log('server started')
        })
    } catch (error) {
        console.log(error)
    }
}
start()