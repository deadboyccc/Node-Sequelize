import { Router } from "express"
import { Request, Response } from "express"
import { createTag, getTags } from "../controllers/tagControllers"

const tagRouter = Router()

tagRouter.get("/", getTags)
tagRouter.post("/", createTag)

export default tagRouter
