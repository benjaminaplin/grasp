import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler"

type PrismaClientType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
// Display list of all JobApplications.
export const jobApplicationList = (prisma: PrismaClient) =>
  asyncHandler(async (req, res) => {
    const page = Math.max(parseInt(req.query.page as string) || 1, 1); // default to page 1
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 100); // default 10, max 100
    const offset = (page - 1) * limit;

    try {
      const jobApplications = await prisma.$queryRaw`
         SELECT 
            ja.id,
            ja.type,
            ja.role,
            ja.notes,
            ja."dateApplied",
            ja.status,
            ja.description,
            ja.link,
            ja.created_at,
            company.name as "company",
            company.id as "companyId"
        FROM "JobApplication" ja
        join "Company" company on ja."companyId" = company.id
          WHERE "userId" = 2
          ORDER BY ja.status DESC
           LIMIT ${limit} OFFSET ${offset}
      `;

      const [{ count }] = await prisma.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(*)::bigint FROM "JobApplication" WHERE "userId" = ${2}
      `;

      res.send({
        page,
        limit,
        total: Number(count),
        data: jobApplications,
      });
    } catch (error) {
      console.error("Error in jobApplicationList:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
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

export const createJobApplication = (prisma: PrismaClientType) => asyncHandler(async (req, res) => {
  const { userId, role, type, notes, companyId, companyName } = req.body;

  try {
    let resolvedCompanyId = companyId;

    if (!companyId && companyName) {
      // Try to find existing company by name (case-insensitive match is safer)
      const existingCompany = await prisma.company.findFirst({
        where: {
          name: {
            equals: companyName,
            mode: 'insensitive', // case-insensitive search
          },
        },
      });

      if (existingCompany) {
        resolvedCompanyId = existingCompany.id;
      } else {
        const newCompany = await prisma.company.create({
          data: { name: companyName, userid: 2 },
        });
        resolvedCompanyId = newCompany.id;
      }
    }

    if (!resolvedCompanyId) {
      res.status(400).json({ error: "Either companyId or companyName is required" });
      return;
    }

    const jobApplicationPayload = {
      userId: JSON.parse(userId),
      type,
      role,
      notes,
      companyId: resolvedCompanyId,
    };

    const result = await prisma.jobApplication.create({ data: jobApplicationPayload });

    res.json(result);
  } catch (error) {
    console.error("err", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
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