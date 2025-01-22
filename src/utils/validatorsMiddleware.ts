import { check } from "express-validator"
import { User } from "../models/userModel"

export const singUpValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email!")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ where: { email } })
      if (user) {
        throw new Error("Email already exists")
      }
    })
    .normalizeEmail()
    .trim(),
  check("name").notEmpty().withMessage("Name is required!"),
  check("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password is too short. it has to be at least 8 characters"),
  check("passwordConfirm")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match")
      }
      return true
    })
]
