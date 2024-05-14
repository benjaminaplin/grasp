import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import asyncHandler from "express-async-handler"

type PrismaClientType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
// Display list of all JobApplications.
export const jobApplicationList = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let jobApplications
  try {
     jobApplications = await prisma.jobApplication.findMany({where: {userId: 2}})
  } catch (error) {
    jobApplications = error
  }
  res.send(jobApplications)
});

export const getJobApplication = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let jobApplication
  try {
    jobApplication = await prisma.jobApplication.findUnique({where: {id: JSON.parse(req.params.id)}})
  } catch (error) {
    jobApplication = error
  }
  res.send(jobApplication)
});

// Display detail page for a specific Author.
export const updateJobApplication = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let updateJobApplication
  try {
     updateJobApplication = await prisma.jobApplication.update({
      where: {
        id: JSON.parse(req.params.id),
      },
      data: req.body,
    })
  } catch (error) {
    updateJobApplication = error
  }
 res.send(updateJobApplication)
})

export const createJobApplication = (prisma: PrismaClientType) => asyncHandler( async (req, res) => {
  const { userId, role, type, notes, companyId } = req.body

  let result
  try {
    result = await prisma.jobApplication.create({
      data: {
         userId: JSON.parse(userId), type, role, notes, companyId
      },
    })
  } catch (error) {
    console.log('err', error)
    result = error
  }
  res.json(result)
})

export const deleteJobApplication = (prisma: PrismaClientType) => asyncHandler( async (req, res) => {
  let result
  try {
    result = await prisma.jobApplication.delete({
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