import express from "express"
import {
  forgotPassword,
  login,
  logout,
  protect,
  resetPassword,
  signUp
} from "../controllers/authControllers"
import { check, validationResult } from "express-validator"
import { User } from "../models/userModel"
export const authRouter = express.Router()

// Middleware for authentication
authRouter.post(
  "/signup",

  check("email")
    .isEmail()
    .withMessage("Invalid Email!")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ where: { email } })
      if (user) {
        throw new Error("Email already exists")
      }
    }),
  check("name").notEmpty().withMessage("Name is required!"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password is too short. it has to be at least 8 characters"),
  check("passwordConfirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match")
    }
    return true
  }),
  signUp
)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.get("/protect", protect)
authRouter.post("/forgot", forgotPassword)
authRouter.post("/reset/:token", resetPassword)
