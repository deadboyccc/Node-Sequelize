//testing script
import { Post } from "../models/postModel"
import { User } from "../models/userModel"

// ;(async () => {
//   const newUser = await User.create({
//     name: "John Doe",
//     email: "john@example.com",
//     password: "securePassword",
//     passwordConfirm: "securePassword"
//   })
//   console.log(newUser)
//   process.exit(1)
// })()
;(async () => {
  const [user] = await User.findAll()
  // const posts = await Post.findAll({
  //   where: {
  //     userId: user.id
  //   }
  // })
  const posts = await user.getPosts()
  console.log(posts)
  process.exit(1)
})()
