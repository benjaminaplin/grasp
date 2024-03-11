import express from 'express'
import { nextStepList, updateNextStep, createNextStep, deleteNextStep, getNextStep } from '../controllers/next-step-controller'
import { PrismaClientType } from '../index';

const router = express.Router();
const createNextStepRouter = (prismaClient: PrismaClientType) => {
  router.get('/', nextStepList(prismaClient))

  router.get('/:id', getNextStep(prismaClient))
  
  router.patch('/:id', updateNextStep(prismaClient))
  
  router.post(`/`, createNextStep(prismaClient) )
  
  router.delete('/:id', deleteNextStep(prismaClient))
  return router 
}


export default createNextStepRouter