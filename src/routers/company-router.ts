import express from 'express'
import { companyList, updateCompany, createCompany, deleteCompany, getCompany } from '../controllers/company-controller'
import { PrismaClientType } from '../index';

const router = express.Router();
const createCompanyRouter = (prismaClient: PrismaClientType) => {
  router.get('/', companyList(prismaClient))

  router.get('/:id', getCompany(prismaClient))
  
  router.patch('/:id', updateCompany(prismaClient))
  
  router.post(`/`, createCompany(prismaClient) )
  
  router.delete('/:id', deleteCompany(prismaClient))
  return router 
}


export default createCompanyRouter