import express from 'express'
import { interviewList, updateInterview, createInterview, deleteInterview, getInterview } from '../controllers/interview-controller'
import { PrismaClientType } from '../index';

const router = express.Router();
const createInterviewRouter = (prismaClient: PrismaClientType) => {
  router.get('/', interviewList(prismaClient))

  router.get('/:id', getInterview(prismaClient))
  
  router.patch('/:id', updateInterview(prismaClient))
  
  router.post(`/`, createInterview(prismaClient) )
  
  router.delete('/:id', deleteInterview(prismaClient))
  return router 
}


export default createInterviewRouter