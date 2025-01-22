import { User } from "../models/userModel"
import catchAsync from "../utils/catchAsync"

export const indexViewController = catchAsync(async (req, res) => {
  const users = await User.findAll()
  /**
   * Fetches posts for each user and combines them into a single object.
   *
   * @description Fetches posts for each user in the `users` array and combines
   * the user data with their posts into a single object using `Promise.all`.
   */
  const usersWithPosts = await Promise.all(
    users.map(async (user) => {
      const posts = await user.getPosts()
      return { ...user.toJSON(), posts }
    })
  )
  res.status(200).render("index", {
    title: "main page",
    users: usersWithPosts
  })
})
