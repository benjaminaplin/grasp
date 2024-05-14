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

const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'https://dev-q0lu0oq6.us.auth0.com/api/v2/',
  issuerBaseURL: `https://dev-q0lu0oq6.us.auth0.com/`,
});

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
const AdminMessagesPermissions = {
  Read: "read:admin-messages",
};

const corsOptions = {
  origin: 'https://grasp.benjaminaplin.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const getAdminMessage = () => {
  return {
    text: "This is an admin message.",
  };
};

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use(express.json())
const port = 3000;

app.use('/api/users', checkJwt, createUserRouter(prismaClient))
app.use('/api/contacts', checkJwt, createContactRouter(prismaClient),
(req, res) => {
  const message = getAdminMessage();

  res.status(200).json(message);
})
app.use('/api/companies', checkJwt, createCompanyRouter(prismaClient))
app.use('/api/job-applications', checkJwt, createJobApplicationRouter(prismaClient))
app.use('/api/next-steps', checkJwt, createNextStepRouter(prismaClient))
app.use('/api/interviews', checkJwt, createInterviewRouter(prismaClient))
app.use('/api/touches', checkJwt, createTouchRouter(prismaClient))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

