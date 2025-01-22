import express from "express"
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} from "../controllers/userControllers"

const userRouter = express.Router()

// Define routes using route chaining
userRouter
  .route("/")
  .post(createUser) // Create a new user
  .get(getUsers) // Get all users

userRouter
  .route("/:uuid")
  .patch(updateUser) // Update a user by UUID
  .delete(deleteUser) // Delete a user by UUID

export default userRouter
