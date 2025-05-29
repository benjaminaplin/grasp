import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import asyncHandler from "express-async-handler"

type PrismaClientType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
// Display list of all Contacts.
export const getContacts = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
    const page = Math.max(parseInt(req.query.page as string) || 1, 1); // default to page 1
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 100); // default 10, max 100
    const offset = (page - 1) * limit;
 
    try {
      const contacts = await prisma.$queryRawUnsafe(`
      SELECT 
          contact.id,
          contact.title,
          contact.closeness,
          contact."jobApplicationsId",
          contact."companyId",
          contact.type,
          contact.notes,
          contact.created_at,
          contact."firstName",
          contact."lastName",
          company.name as "companyName",
          COALESCE(
            json_agg(
              jsonb_build_object(
                'id', ns.id,
                'action', ns.action,
                'notes', ns."notes",
                'type', ns."type",
                'isCompleted', ns."completed"
              )
            ) FILTER (WHERE ns.id IS NOT NULL),
            '[]'
          ) AS "nextSteps",
          COALESCE(
            json_agg(
              jsonb_build_object(
                'id', touch.id,
                'notes', touch."notes",
                'type', touch."type"
              )
            ) FILTER (WHERE ns.id IS NOT NULL),
            '[]'
          ) AS "touches"
        FROM "Contact" contact
        LEFT JOIN "NextStep" ns ON ns."contactId" = contact.id 
        LEFT JOIN "Touch" touch on touch."userId" = contact.id
        LEFT JOIN "Company" company on company.id = contact."companyId"
        WHERE contact."userId" = 2
        GROUP BY contact.id, company.name
        LIMIT ${limit} OFFSET ${offset};
      `);
      
      const [{ count }] = await prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*)::bigint FROM "Contact" WHERE "userId" = ${2}
      `;
      const response = {
        page,
        limit,
        total: Number(count),
        data: contacts,
      }
      res.send(response);
    } catch (error) {
      console.error("Error in jobApplicationList:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
});

export const contactList = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
    const page = Math.max(parseInt(req.query.page as string) || 1, 1); // default to page 1
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 100); // default 10, max 100
    const offset = (page - 1) * limit;
 
    try {
      const contacts = await prisma.contact.findMany({
        where: {
          userId: 2
        }
      });
      
      res.send( contacts);
    } catch (error) {
      console.error("Error in jobApplicationList:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
});


export const getContact = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let contact
  try {
    contact = await prisma.contact.findUnique({where: {id: JSON.parse(req.params.id)}, include: {
      nextSteps: true,
        companies: true,
        jobApplications: true,
        touches: true
      }})
  } catch (error) {
    contact = error
  }
  res.send(contact)
});

// Display detail page for a specific Author.
export const updateContact = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let updateContact
  try {
     updateContact = await prisma.contact.update({
      where: {
        id: JSON.parse(req.params.id),
      },
      data: {...req.body, companyId: JSON.parse(req.body.companyId)},
    })
  } catch (error) {
    updateContact = error
  }
 res.send(updateContact)
})

export const createContact = (prisma: PrismaClientType) => asyncHandler( async (req, res) => {
const {closeness, firstName, lastName, userId, title, type, notes } = req.body
  let result
  try { 
    result = await prisma.contact.create({
      data: {
       closeness, firstName, lastName, userId: JSON.parse(userId), title, type, notes
      },
    })
  } catch (error) {
    result = error
  }
  res.json(result)
})

export const deleteContact = (prisma: PrismaClientType) => asyncHandler( async (req, res) => {
  let result
  try {
    result = await prisma.contact.delete({
      where: {
        id: JSON.parse(req.params.id)
      },
    })
  } catch (error) {
    result = error
  }
  res.json(result)
})
