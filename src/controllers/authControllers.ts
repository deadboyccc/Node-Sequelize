import catchAsync from "../utils/catchAsync"
export const login = catchAsync(async (req, res) => {
  req.session.loggedIn = "joe"
  try {
    await req.session.save()
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: "fail", message: "Internal server error" })
    return // Bypassing the next middleware(response already sent!)
  }
  res.status(200).json({ status: "success", message: "Login successful" })
})

export const logout = catchAsync(async (req, res) => {
  // Promosifying the session.destroy because it's callback-based (WHY LOL)
  await new Promise<void>((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })
  // Clearing the session cookie on the client-side
  res.clearCookie("connect.sid")
  res.status(200).json({ status: "success", message: "Logout successful" })
})
