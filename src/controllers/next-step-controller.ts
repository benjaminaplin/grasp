import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import asyncHandler from "express-async-handler"

type PrismaClientType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
// Display list of all nextSteps.
export const nextStepList = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let nextSteps
  try {
     nextSteps = await prisma.nextStep.findMany()
  } catch (error) {
    nextSteps = error
  }
  res.send(nextSteps)
});

export const getNextStep = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let nextStep
  try {
    nextStep = await prisma.nextStep.findUnique({where: {id: JSON.parse(req.params.id)}})
  } catch (error) {
    nextStep = error
  }
  res.send(nextStep)
});

// Display detail page for a specific Author.
export const updateNextStep = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let updatenextStep
  try {
     updatenextStep = await prisma.nextStep.update({
      where: {
        id: JSON.parse(req.params.id),
      },
      data: req.body,
    })
  } catch (error) {
    updatenextStep = error
  }
 res.send(updatenextStep)
})

export const createNextStep = (prisma: PrismaClientType) => asyncHandler( async (req, res) => {
const { action, userId, type, notes, contactId } =req.body
  console.log({ action, userId, type, notes, contactId })
  let result
  try {
    result = await prisma.nextStep.create({
      data: {
       userId: JSON.parse(userId), contactId: JSON.parse(contactId), action, type, notes
      },
    })
  } catch (error) {
    console.log('err', error)
    result = error
  }
  res.json(result)
})

export const deleteNextStep = (prisma: PrismaClientType) => asyncHandler( async (req, res) => {
  let result

  try {
    result = await prisma.nextStep.delete({
      where: {
        id: JSON.parse(req.params.id)
      },
    })
  } catch (error) {
    console.log('eror', error)
    result = error
  }
  res.json(result)
})
