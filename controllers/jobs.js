const { StatusCodes } = require('http-status-codes')
const Jobs = require('../models/Jobs')
const { NotFoundError, BadRequestError} = require('../errors')

const getAllJobs = async (req,res)=>{
    const jobs = await Jobs.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json(jobs)
} 

const getJob = async (req,res)=>{
    const {user:{userId}, params:{id}} = req
    const jobId = id 
    const job = await Jobs.findOne({
        _id: jobId,
        createdBy: userId
    })
    if(!job) {
        throw new NotFoundError('not job with the given jobid')
    }
    res.status(StatusCodes.OK).json(job)
}

const createJob = async (req,res)=>{
    req.body.createdBy = req.user.userId
    const job = await Jobs.create(req.body)
    res.status(StatusCodes.CREATED).json(job)
}

const updateJob = async (req,res)=>{
    const {user:{userId}, params:{id}, body:{company, position}} = req
    const jobId = id

    if(!company || !position) {
        throw new BadRequestError('position/company cannot be empty')
    }

    const job = await Jobs.findOneAndUpdate({_id:jobId, createdBy:userId}, req.body, {new:true, runValidators:true})
    if(!job) {
        throw new NotFoundError('not job with the given jobid')
    }
    res.status(StatusCodes.OK).json(job)
}

const deleteJob = async (req,res)=>{
    const {user:{userId}, params:{id}} = req

    const job = await Jobs.findOneAndDelete({_id:jobId, createdBy:userId})
    if(!job) {
        throw new NotFoundError('not job with the given jobid')
    }
    res.status(StatusCodes.OK).send('job deleted')
}

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob }
