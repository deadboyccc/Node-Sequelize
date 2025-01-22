import express from "express"
import { createPost, getPosts } from "../controllers/postControllers"

const postRouter = express.Router()

// Define routes using route chaining
postRouter
  .route("/")
  .post(createPost) // Create a new post
  .get(getPosts) // Get all posts

export default postRouter
