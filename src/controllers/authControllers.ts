import { User, UserAttributes } from "../models/userModel"
import crypto from "crypto"
import catchAsync from "../utils/catchAsync"
import Mail from "../utils/mail"
import nodemailer from "nodemailer"
import { Op } from "sequelize"
export const login = catchAsync(async (req, res) => {
  // Implementing login using session server-side + cookie client-side
  const { email, password } = req.body
  const user = await User.findOne({ where: { email } })
  if (!user || !(await user.isPasswordValid(password))) {
    return res
      .status(401)
      .json({ status: "fail", message: "Invalid email or password" })
  } else {
    req.session.userId = user.id
    await req.session.save()

    res.status(200).json({ status: "success", message: "Login successful" })
  }
})

export const signUp = catchAsync(async (req, res) => {
  //signing up handler
  const { name, email, password, passwordConfirm } = req.body
  if (await User.findOne({ where: { email } })) {
    return res
      .status(400)
      .json({ status: "fail", message: "Email already exists" })
  }
  const user = await User.create({ name, email, password, passwordConfirm })
  res.status(201).json({ status: "success", user })
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
export const protect = catchAsync(async (req, res, next) => {
  // Implementing middleware to protect routes
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ status: "fail", message: "You are not logged in" })
  } else {
    // TEMPORARY IMPLEMENTATION OF A SUCCESS
    req.user = (await User.findOne({
      where: { id: req.session.userId }
    })) as UserAttributes

    next()
  }
})

export const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body

  // Check if user with the email exists
  const user = await User.findOne({ where: { email } })
  if (!user) {
    return res.status(404).json({ status: "fail", message: "User not found" })
  }

  // Send the email
  new Mail(
    user,
    `${req.protocol + "://" + req.hostname}/auth/reset/`
  ).passwordReset()
  console.log(req.protocol + "://" + req.hostname)
  await user.save()

  res.status(200).json({
    status: "success",
    message: "Password reset email sent successfully"
  })
})

export const resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params
  const { password, passwordConfirm } = req.body
  const user = await User.findOne({
    where: { resetToken: token, resetTokenExpiry: { [Op.gt]: Date.now() } }
  })
  if (!user) {
    return res
      .status(400)
      .json({ status: "fail", message: "Token expired or invalid" })
  } else {
    if (password !== passwordConfirm) {
      return res
        .status(400)
        .json({ status: "fail", message: "Passwords do not match" })
    }
    user.password = password
    user.resetToken = undefined
    user.resetTokenExpiry = undefined
    await user.save()
    //return a response
    res
      .status(200)
      .json({ status: "success", message: "Password reset successful" })
  }
})
