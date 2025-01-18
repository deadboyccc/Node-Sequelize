import express from "express"
import { User } from "../models/userModel"

const viewRouter = express.Router()

// Get all users and render 'index' template
viewRouter.get("/", async (req, res) => {
  const users = await User.findAll()
  res.status(200).render("index", {
    title: "main page",
    users
  })
})

export default viewRouter
