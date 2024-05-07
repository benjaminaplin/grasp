
import { Prisma, PrismaClient, Touch } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import asyncHandler from "express-async-handler"
import omit from "lodash/omit"

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

export const updateNextStep = (prisma: PrismaClientType) => asyncHandler(async (req: any, res: any) => {
  const { action, userId, type, notes, contactId , completed, dueDate } = req.body
  let newNextStep

  const nextStep = await prisma.nextStep.findUnique({where: {id: JSON.parse(req.params.id)}})
  if(!nextStep.completed && (completed === true)){
    let newTouch: Partial<Touch> = {
      notes: action,
      type,
      jobApplicationId: null, 
      userId: JSON.parse(userId),
      contactId: contactId ? JSON.parse(contactId) : null,
      scheduledDate:  new Date().toISOString() as unknown as Date
    }
    await prisma.touch.create({
      data: newTouch,
    })
  }
  try {
     newNextStep = await prisma.nextStep.update({
      where: {
        id: JSON.parse(req.params.id),
      },
      data: {
        ...omit(req.body, ['id', 'userId', 'contactId', 'contact']),
        completed: req.body.completed,
        notes,
        dueDate:  new Date(dueDate).toISOString()
      },
    })
  } catch (error) {
    newNextStep = error
  }
 res.send(newNextStep)
})

export const createNextStep = (prisma: PrismaClientType) => asyncHandler( async (req, res) => {
const { action, userId, type, notes, contactId, dueDate } = req.body
  console.log({ action, userId, type, notes, contactId, dueDate })
  let result
  try {
    result = await prisma.nextStep.create({
      data: {
       userId: JSON.parse(userId), contactId: JSON.parse(contactId),
       action,
       type,
       notes, 
       dueDate:  new Date(dueDate).toISOString()
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
    console.log('error', error)
    result = error
  }
  res.json(result)
})
