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
import { singUpValidator } from "../utils/validatorsMiddleware"
export const authRouter = express.Router()

// Middleware for authentication
authRouter.post("/signup", singUpValidator, signUp)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.get("/protect", protect)
authRouter.post("/forgot", forgotPassword)
authRouter.post("/reset/:token", resetPassword)
