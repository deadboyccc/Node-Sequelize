import { RequestHandler } from "express"
import { User } from "../models/userModel"
import catchAsync from "../utils/catchAsync"
import { Op } from "sequelize"

// Create a new user
export const createUser: RequestHandler = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, bio } = req.body
  // console.table({ name, email, password, passwordConfirm, bio }) // Log user data

  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    bio
  })

  res.status(201).json({
    status: "success",
    user
  })
})

// Get all users
export const getUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll()

  res.status(200).json({
    status: "success",
    length: users.length,
    users
  })
})

// Update an existing user
export const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.uuid)

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found"
    })
  }

  const updatedUser = await user.update(req.body)

  res.status(200).json({
    status: "success",
    user: updatedUser
  })
})

// Delete a user
export const deleteUser = catchAsync(async (req, res, next) => {
  const deletedRecord = await User.destroy({
    where: {
      id: {
        [Op.eq]: req.params.uuid
      }
    }
  })

  if (deletedRecord) {
    res.status(204).json({}) // No content
  } else {
    res.status(404).json({
      status: "fail",
      message: "User not found"
    })
  }
})
