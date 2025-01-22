import { Post } from "../models/postModel"
import { User } from "../models/userModel"
import catchAsync from "../utils/catchAsync"
import { io } from "../app"
// Controller to handle creating a new post
export const createPost = catchAsync(async (req, res) => {
  const user = req.body.user as User
  if (!user) {
    return res.status(400).json({ status: "fail", message: "Invalid User" })
  }
  const post = await user.createPost(req.body)
  res.status(201).json({
    status: "success",
    post
  })
})

// Controller to handle fetching all posts
export const getPosts = catchAsync(async (req, res) => {
  const post = (await Post.findAll()).map((post) => post.text)
  // Experimenting with the socket on Postman (not-project related)
  io.emit("post", { post })
  res.status(200).json({
    status: "success",
    length: post.length,
    post
  })
})
