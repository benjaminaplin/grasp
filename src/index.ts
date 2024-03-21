import { Prisma, PrismaClient } from '@prisma/client'
import createUserRouter from './routers/user-router'
import createContactRouter from './routers/contact-router'
import createJobApplicationRouter from './routers/job-application-router'
import createCompanyRouter from './routers/company-router'
import express from 'express'
import cors from 'cors'

import { DefaultArgs } from '@prisma/client/runtime/library';
import createNextStepRouter from './routers/next-step-router'
export type PrismaClientType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>

const prismaClient = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

const app = express()
app.use(cors())

app.use(express.json())
const port = 5000 

app.use('/users', createUserRouter(prismaClient))
app.use('/contacts', createContactRouter(prismaClient))
app.use('/companies', createCompanyRouter(prismaClient))
app.use('/job-applications', createJobApplicationRouter(prismaClient))
app.use('/next-steps', createNextStepRouter(prismaClient))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
