const express = require('express')
const { getMyJobs, getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobs')
router = express.Router()


router.get('/', getAllJobs)
router.get('/myjobs', getMyJobs)
router.get('/:id', getJob)
router.post('/', createJob)
router.patch('/:id', updateJob)
router.delete('/:id', deleteJob)

module.exports = router