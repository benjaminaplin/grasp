import { Prisma, PrismaClient, User } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import asyncHandler from "express-async-handler"

type PrismaClientType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
// Display list of all Companys.
export const companyList = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let companies
  try {
     companies = await prisma.company.findMany({ where: { userid: 2 }})
  } catch (error) {
    companies = error
  }
  res.send(companies)
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
        data: {
          ...req.body,
          users: {
            connectOrCreate: {
              where: {
                id: 3,
              },
              create: {
                email: 'joejobseeker@gmail.com',
                firstName: 'Joe',
                lastName: 'Jobseeker',
                userName: 'joejobseeker'
              },
            }
          }
        },
        include: {
          users: true
        }
    })
  } catch (error) {
    updateCompany = error
  }
 res.send(updateCompany)
})

export const createCompany = (prisma: PrismaClientType) => asyncHandler( async (req, res) => {
  const { name, users, notes, userId } = req.body
  let result
  let user
  try {
    user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    console.log('user', user)
  } catch (error) {
    user = error
    res.json(user)
  }
  try {
    result = await prisma.company.create({
      data: {
        name,
        users: {
          connect: [{id: userId}]
        },
        notes
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
