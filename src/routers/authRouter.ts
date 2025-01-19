import express from "express"
import { login } from "../controllers/authControllers"
export const authRouter = express.Router()

// Middleware for authentication
authRouter.post("/login", login)
