import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import asyncHandler from "express-async-handler"

type PrismaClientType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
// Display list of all Contacts.
export const contactList = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let contacts
  try {
     contacts = await prisma.contact.findMany()
  } catch (error) {
    contacts = error
  }
  res.send(contacts)
});

export const getContact = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let contact
  try {
    contact = await prisma.contact.findUnique(JSON.parse(req.params.id))
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
      data: req.body,
    })
  } catch (error) {
    updateContact = error
  }
 res.send(updateContact)
})

export const createContact = (prisma: PrismaClientType) => asyncHandler( async (req, res) => {
  const { firstName, lastName, userId, title, type, notes } = JSON.parse(req.body)
  console.log({ firstName, lastName, userId, title, type, notes })
  let result
  try {
    result = await prisma.contact.create({
      data: {
        firstName, lastName, userId: JSON.parse(userId), title, type, notes
      },
    })
  } catch (error) {
    console.log('err', error)
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
    console.log('eror', error)
    result = error
  }
  res.json(result)
})