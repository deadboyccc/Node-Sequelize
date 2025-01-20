import express from "express"
import {
  forgotPassword,
  login,
  logout,
  protect,
  resetPassword,
  signUp
} from "../controllers/authControllers"
export const authRouter = express.Router()

// Middleware for authentication
authRouter.post("/login", login)
authRouter.post("/signup", signUp)
authRouter.post("/logout", logout)
authRouter.get("/protect", protect)
authRouter.post("/forgot", forgotPassword)
authRouter.post("/reset/:token", resetPassword)
