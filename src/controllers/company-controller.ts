import { Prisma, PrismaClient, User } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import asyncHandler from "express-async-handler"

type PrismaClientType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
// Display list of all Companys.
export const companyList = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  const page = Math.max(parseInt(req.query.page as string) || 1, 1); // default to page 1
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 100); // default 10, max 100
    const offset = (page - 1) * limit;

    try {
      const companies = await prisma.$queryRaw`
          SELECT 
            company.id,
            company.type,
            company.notes,
            company.created_at,
            company.name
        FROM "Company" company
        WHERE company."userid" = 2
        ORDER BY company.name ASC
           LIMIT ${limit} OFFSET ${offset};
      `;
      
      const [{ count }] = await prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*)::bigint FROM "Company" WHERE "userid" = ${2}
      `;
      const response = {
        page,
        limit,
        total: Number(count),
        data: companies,
      }
      console.log("🚀 ~ response:", response)
      res.send(response);
    } catch (error) {
      console.error("Error in jobApplicationList:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
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
