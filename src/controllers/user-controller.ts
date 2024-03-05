import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import asyncHandler from "express-async-handler"

type PrismaClientType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
// Display list of all Users.
export const userList = (prisma: any) => asyncHandler( async (req: any, res: any) => {
  let users
  try {
     users = await prisma.user.findMany()
  } catch (error) {
    users = error
  }
  res.send(users)
});

export const getUser = (prisma: any) => asyncHandler( async (req: any, res: any) => {
  let user
  try {
    user = await prisma.user.findUnique({where: {id: JSON.parse(req.params.id)}})
  } catch (error) {
    user = error
  }
  res.send(user)
});

export const getUserContacts = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let contacts
  try {
    contacts = await prisma.contact.findMany({
      where: {
        userId: JSON.parse(req.params.id)
      }})
  } catch (error) {
    contacts = error
  }
  res.send(contacts)
});

// Display detail page for a specific Author.
export const updateUser = (prisma: PrismaClientType) => asyncHandler( async (req: any, res: any) => {
  let updateUser
  try {
     updateUser = await prisma.user.update({
      where: {
        id: JSON.parse(req.params.id),
      },
      data: req.body,
    })
  } catch (error) {
    updateUser = error
  }
 res.send(updateUser)
})

export const signUpUser = (prisma: PrismaClientType) => asyncHandler( async (req, res) => {
  const { firstName, lastName, email, userName, contacts } = req.body

  let result
  try {
    result = await prisma.user.create({
      data: {
        userName,
        firstName,
        lastName,
        email
      },
    })
  } catch (error) {
    result = error
  }
  res.json(result)

})

export const deleteUser = (prisma: PrismaClientType) => asyncHandler( async (req, res) => {
  let result
  try {
    result = await prisma.user.delete({
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