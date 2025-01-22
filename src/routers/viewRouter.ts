import express from "express"
import { indexViewController } from "../controllers/viewController"

const viewRouter = express.Router()

// Get all users and render 'index' template
viewRouter.get("/", indexViewController)
export default viewRouter
