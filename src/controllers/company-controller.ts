import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import asyncHandler from "express-async-handler"

type PrismaClientType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
// Display list of all Companys.
export const companyList = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let contacts
  try {
     contacts = await prisma.company.findMany()
  } catch (error) {
    contacts = error
  }
  res.send(contacts)
});

export const getCompany = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let company
  try {
    company = await prisma.company.findUnique({where: {id: JSON.parse(req.params.id)}})
  } catch (error) {
    company = error
  }
  res.send(company)
});

// Display detail page for a specific Author.
export const updateCompany = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let updateCompany
  try {
     updateCompany = await prisma.company.update({
      where: {
        id: JSON.parse(req.params.id),
      },
      data: req.body,
    })
  } catch (error) {
    updateCompany = error
  }
 res.send(updateCompany)
})

export const createCompany = (prisma: PrismaClientType) => asyncHandler( async (req, res) => {
const { name, userId, notes } =req.body
  let result
  try {
    result = await prisma.company.create({
      data: {
        name, userId: JSON.parse(userId), notes
      },
    })
  } catch (error) {
    console.log('err', error)
    result = error
  }
  res.json(result)
})

export const deleteCompany = (prisma: PrismaClientType) => asyncHandler( async (req, res) => {
  let result
  try {
    result = await prisma.company.delete({
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
