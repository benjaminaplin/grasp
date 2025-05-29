import { Prisma, PrismaClient, User } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import asyncHandler from "express-async-handler"
import { jobApplicationList } from "./job-application-controller";

type PrismaClientType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
// Display list of all Touchs.
export const touchList = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
    const page = Math.max(parseInt(req.query.page as string) || 1, 1); // default to page 1
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 100); // default 10, max 100
    const offset = (page - 1) * limit;
  
  let touches
  let count
  try {
       count = await prisma.touch.count({ where: { userId: 2 } });
     touches = await prisma.touch.findMany({
      skip: offset,
      take: limit,
      where: {userId: 2},
      include: {
        jobApplication: true,
        contact: true,
      }
     })
 
  } catch (error) {
    touches = error
  }

  const response = {
    page,
    limit,
    total: Number(count),
    data: touches,
  }
 res.send(response);
});

export const getTouch = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let touch
  try {
    touch = await prisma.touch.findUnique({where: {id: JSON.parse(req.params.id)}})
  } catch (error) {
    touch = error
  }
  res.send(touch)
});



// Display detail page for a specific Author.
export const updateTouch = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let updateTouch
  try {
     updateTouch = await prisma.touch.update({
        where: {
          id: JSON.parse(req.params.id),
        },
        data: req.body
    })
  } catch (error) {
    updateTouch = error
  }
 res.send(updateTouch)
})

export const createTouch = (prisma: PrismaClientType) => asyncHandler( async (req, res) => {
const { round, type, status: touchStatus, userId, notes, contactId, jobApplicationId, scheduledDate} = req.body

let result
  try {
    result = await prisma.touch.create({
      data: {
        notes,
        type,
        jobApplicationId: jobApplicationId ? JSON.parse(jobApplicationId) : jobApplicationId,
        userId: JSON.parse(userId),
        contactId: contactId ? JSON.parse(contactId) : contactId,
        scheduledDate:  new Date(scheduledDate).toISOString()
      },
    })
  } catch (error) {
    console.log('err', error)
    result = error
  }
  res.json(result)
})

export const deleteTouch = (prisma: PrismaClientType) => asyncHandler( async (req, res) => {
  let result
  try { 
    result = await prisma.touch.delete({
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
