import catchAsync from "../utils/catchAsync"
export const login = catchAsync(async (req, res) => {
  req.session.loggedIn = "joe"
  try {
    await req.session.save() // Wait for session to save
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: "fail", message: "Internal server error" })
    return // Bypassing the next middleware
  }
  res.status(200).json({ status: "success", message: "Login successful" })
})
