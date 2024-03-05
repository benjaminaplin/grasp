import { Prisma, PrismaClient } from '@prisma/client'
import createUserRouter from './routers/user-router'
import express from 'express'
import { DefaultArgs } from '@prisma/client/runtime/library';

export type PrismaClientType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>

const router = express.Router();

const prismaClient = new PrismaClient()
const app = express()

app.use(express.json())
const port = 3000

app.use('/users', createUserRouter(prismaClient))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
