import express from 'express'
import { contactList, updateContact, createContact, deleteContact, getContact, getContacts } from '../controllers/contact-controller'
import { PrismaClientType } from '../index';

const router = express.Router();
const createContactRouter = (prismaClient: PrismaClientType) => {
  router.get('/', getContacts(prismaClient))
  
  router.get('/all', contactList(prismaClient))

  router.get('/:id', getContact(prismaClient))
  
  router.patch('/:id', updateContact(prismaClient))
  
  router.post(`/`, createContact(prismaClient) )
  
  router.delete('/:id', deleteContact(prismaClient))
  return router 
}


export default createContactRouter