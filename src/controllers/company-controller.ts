import { Prisma, PrismaClient, User } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import asyncHandler from "express-async-handler"

type PrismaClientType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
// Display list of all Companys.
export const companyList = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let companies
  try {
     companies = await prisma.company.findMany()
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
/* 
{
      "id": 2,
      "email": "benjaminaplin@gmail.com",
      "firstName": "Benjamin",
      "lastName": "Aplin",
      "userName": "benjaminaplin"
    }
*/

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
                id: 2,
              },
              create: {
                email: 'benjaminaplin@gmail.com',
                firstName: 'Benjamin',
                lastName: 'Aplin',
                userName: 'benjaminaplin'
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
const { name, users, notes } = req.body
  let result
  try {
    result = await prisma.company.create({
      data: {
        name,
        users: {
          create: users.map((user: User) => 
            ({userName: user.userName, firstName: user.firstName, lastName: user.lastName, email: user.email }))
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
