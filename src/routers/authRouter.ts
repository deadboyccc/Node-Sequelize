import express from "express"
import { login, logout } from "../controllers/authControllers"
export const authRouter = express.Router()

// Middleware for authentication
authRouter.post("/login", login)
authRouter.post("/logout", logout)
