import { Prisma, PrismaClient } from '@prisma/client'
import createUserRouter from './routers/user-router'
import createContactRouter from './routers/contact-router'
import createJobApplicationRouter from './routers/job-application-router'
import createCompanyRouter from './routers/company-router'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { DefaultArgs } from '@prisma/client/runtime/library';
import createNextStepRouter from './routers/next-step-router'
import createInterviewRouter from './routers/interview-router'
import createTouchRouter from './routers/touch-router'
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

const corsOptions = {
  origin: 'https://grasp.benjaminaplin.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use(express.json())
const port = 3000;

app.use('/api/users', createUserRouter(prismaClient))
app.use('/api/contacts', createContactRouter(prismaClient))
app.use('/api/companies', createCompanyRouter(prismaClient))
app.use('/api/job-applications', createJobApplicationRouter(prismaClient))
app.use('/api/next-steps', createNextStepRouter(prismaClient))
app.use('/api/interviews', createInterviewRouter(prismaClient))
app.use('/api/touches', createTouchRouter(prismaClient))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
