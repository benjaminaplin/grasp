import express from 'express'
import { jobApplicationList, updateJobApplication, createJobApplication, deleteJobApplication, getJobApplication  } from '../controllers/job-application-controller'
import { PrismaClientType } from '../index';

const router = express.Router();
const createJobApplicationRouter = (prismaClient: PrismaClientType) => {
  router.get('/', jobApplicationList(prismaClient))

  router.get('/:id', getJobApplication(prismaClient))
  
  router.patch('/:id', updateJobApplication(prismaClient))
  
  router.post(`/`, createJobApplication(prismaClient) )
  
  router.delete('/:id', deleteJobApplication(prismaClient))
  return router 
}


export default createJobApplicationRouter