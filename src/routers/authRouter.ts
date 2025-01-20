import express from "express"
import { login, logout, protect, signUp } from "../controllers/authControllers"
export const authRouter = express.Router()

// Middleware for authentication
authRouter.post("/login", login)
authRouter.post("/signup", signUp)
authRouter.post("/logout", logout)
authRouter.get("/protect", protect)
