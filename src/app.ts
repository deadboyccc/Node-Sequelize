// Importing necessary libraries and modules
import express from "express" // Express.js framework
import dotenv from "dotenv" // dotenv package to load environment variables
import path from "path" // Path module to handle file paths

// Define the path for the .env file and load environment variables
const dotEnvPath = path.join(__dirname, "..", "config.env") // Resolve path to config.env
dotenv.config({ path: dotEnvPath }) // Load environment variables from config.env

// Importing routers for different parts of the app
import postRouter from "./routers/postRouter" // Routes for posts
import commentRouter from "./routers/commentRouter" // Routes for comments
import viewRouter from "./routers/viewRouter" // Routes for views
import { syncConnectPostgres, sequelize } from "./database" // Database connection functions
import userRouter from "./routers/userRouter" // Routes for user management
import { User } from "./models/userModel" // User model
import { Post } from "./models/postModel" // Post model
import { Comment } from "./models/commentModel" // Comment model
import morgan from "morgan"
import { Tag } from "./models/tagModel"
import tagRouter from "./routers/tagRouter"
import { PostTag } from "./models/posttag"

// Create an Express application
const app = express()
// Importing morgan for logging HTTP requests

// Use morgan middleware to log HTTP requests in the 'dev' format
app.use(morgan("dev"))

// Middleware to parse JSON bodies
app.use(express.json())

// Custom middleware to attach the first user from the database to each request
app.use(async (req, res, next) => {
  const users = await User.findAll() // Fetch all users from the database
  req.body.user = users.at(0) // Attach the first user to the request body
  next() // Move to the next middleware
})

// Set up EJS as the templating engine
app.set("view engine", "ejs")
// Define the views directory path
app.set("views", path.join(__dirname, "views"))

// Serve static files from the "declare" directory
app.use(express.static(path.join(__dirname, "declare")))

// Define route handlers
app.use("/", viewRouter) // Home and other views routes
app.use("/user", userRouter) // User-related routes
app.use("/post", postRouter) // Post-related routes
app.use("/comment", commentRouter) // Comment-related routes
app.use("/tag", tagRouter)

// Catch-all route for 404 errors
app.use("*", (req, res) => {
  res.status(404).render("404", {
    // Render a 404 page if the route doesn't match
    title: "Page not found (404)"
  })
})

// Function to connect to the database and synchronize models
db()
app.listen(3000, () => {
  console.log("server running on port 3000") // Log that the server is running
})

// Define associations between the models
// A user can have many posts
User.hasMany(Post)
Post.belongsTo(User) // Each post belongs to a user

// A user can have many comments
User.hasMany(Comment)
Comment.belongsTo(User) // Each comment belongs to a user

// A post can have many comments
Post.hasMany(Comment)
Comment.belongsTo(Post) // Each comment belongs to a post
// Tags have many posts & Posts has many tags
Post.belongsToMany(Tag, { through: PostTag, foreignKey: "postId" })
Tag.belongsToMany(Post, { through: PostTag, foreignKey: "tagid" })

// Database synchronization function
async function db() {
  try {
    // Synchronize the database and connect to PostgreSQL
    await syncConnectPostgres()

    // Example code to create a user if none exist (commented out)
    // if ((await User.count()) === 0) {
    //   const mainUser = await User.create({
    //     name: "ahmed", // User's name
    //     email: "ahmed@example.com", // User's email
    //     password: "123", // User's password
    //     passwordConfirm: "123" // Confirm password
    //   })

    //   console.log("user created successfully") // Log success
    // }

    console.log("ALL DONE!") // Log when everything is complete
  } catch (err: Error | unknown) {
    console.error(err) // Catch and log any errors
  }
}
