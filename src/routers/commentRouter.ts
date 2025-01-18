import express from "express"

// Create an Express Router instance for comments
const commentRouter = express.Router()

// Route handler for GET requests to the root path of the comments endpoint (/)
commentRouter.get("/", (req, res) => {
  // Simulate fetching all comments and send a response
  res.status(200).send("getting all comments")
})

// Route handler for POST requests to the root path of the comments endpoint (/)
commentRouter.post("/", (req, res) => {
  // Simulate creating a comment and send a response
  res.status(201).send("posting a comment")
})

// Export the comment router to be used in other parts of the application
export default commentRouter
