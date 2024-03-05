import express from 'express'
import { userList, updateUser, signUpUser, deleteUser, getUser } from '../controllers/user-controller'
import { PrismaClientType } from '../index';

const router = express.Router();
const createUserRouter = (prismaClient: PrismaClientType) => {
  router.get('/', userList(prismaClient))

  router.get('/:id', getUser(prismaClient))
  
  router.patch('/:id', updateUser(prismaClient))
  
  router.post(`/signup`, signUpUser(prismaClient) )
  
  router.delete('/:id', deleteUser(prismaClient))
  return router 
}


export default createUserRouter