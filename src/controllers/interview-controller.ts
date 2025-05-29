import { Prisma, PrismaClient, User } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import asyncHandler from "express-async-handler"
import { jobApplicationList } from "./job-application-controller";

type PrismaClientType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
// Display list of all Interviews.
export const interviewList = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let interviews
  try {
     interviews = await prisma.interview.findMany({
        orderBy: {
        date: 'desc', // or 'asc' for ascending
      },
      where: {userId: 2},
      include: {
        jobApplication: {
          include: {
            company: true, // This will include the company object, including its name
          },
        },
        contact: true,
        
      }
     })
 
  } catch (error) {
    interviews = error
  }
  res.send(interviews)
});

export const getInterview = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let interview
  try {
    interview = await prisma.interview.findUnique({where: {id: JSON.parse(req.params.id)}})
  } catch (error) {
    interview = error
  }
  res.send(interview)
});

// Display detail page for a specific Author.
export const updateInterview = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let updateInterview
  try {
     updateInterview = await prisma.interview.update({
        where: {
          id: JSON.parse(req.params.id),
        },
        data: req.body
    })
    console.log('updateInterview', updateInterview)
  } catch (error) {
    updateInterview = error
  }
 res.send(updateInterview)
})

export const createInterview = (prisma: PrismaClientType) => asyncHandler( async (req, res) => {
const { round, type, status: interviewStatus, userId, notes, contactId, jobApplicationId, date} = req.body
  console.log("🚀 ~ createInterview ~ req.body:", req.body)
  let result
  try {
   result = await prisma.interview.create({
    data: {
    round: JSON.parse(round),
    notes,
    type,
    status: interviewStatus,
    jobApplicationId: jobApplicationId ? JSON.parse(jobApplicationId) : null,
    userId: userId ? JSON.parse(userId) : null,
    contactId: contactId ? JSON.parse(contactId) : null,
    date: date ? new Date(date).toISOString() : undefined
  }
  });
  } catch (error) {
    result = error
  }
  res.json(result)
})

export const deleteInterview = (prisma: PrismaClientType) => asyncHandler( async (req, res) => {
  let result
  try { 
    result = await prisma.interview.delete({
      where: {
        id: JSON.parse(req.params.id)
      },
    })
  } catch (error) {
    result = error
  }
  res.json(result)
})
