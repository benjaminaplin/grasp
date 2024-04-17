import express from 'express'
import { touchList, updateTouch, createTouch, deleteTouch, getTouch } from '../controllers/touch-controller'
import { PrismaClientType } from '../index';

const router = express.Router();
const createTouchRouter = (prismaClient: PrismaClientType) => {
  router.get('/', touchList(prismaClient))

  router.get('/:id', getTouch(prismaClient))
  
  router.patch('/:id', updateTouch(prismaClient))
  
  router.post(`/`, createTouch(prismaClient) )
  
  router.delete('/:id', deleteTouch(prismaClient))
  return router 
}


export default createTouchRouter