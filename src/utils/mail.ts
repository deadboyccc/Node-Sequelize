import nodemailer, { Transporter } from "nodemailer"
import crypto from "crypto"
import { UserAttributes } from "../models/userModel"

//CREATING A GENERAL EMAIL CLASS TO ENCAPSULATE THE EMAIL PROCESS
class Email {
  public readonly from: string = process.env.SMPT_FROM || "default@example.com"
  private to: string
  private name: string

  constructor(
    private user: UserAttributes,
    private url: string
  ) {
    this.to = user.email
    this.name = user.name
  }
  newtTransportor(): Transporter {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        host: process.env.PRODUCTION_SMPT_HOST, //  SMTP host
        port: 587, // Secure SMTP port
        auth: {
          user: process.env.PRODUCTION_SMPT_USER,
          pass: process.env.PRODUCTION_SMPT_PASSWORD
        }
      })
    } else {
      // Development (mailtrap)

      return nodemailer.createTransport({
        host: process.env.DEVELOPMENT_SMPT_HOST,
        port: Number.parseInt(process.env.DEVELOPMENT_SMPT_PORT as string),
        auth: {
          user: process.env.DEVELOPMENT_SMPT_USER,
          pass: process.env.DEVELOPMENT_SMPT_PASSWORD
        }
      })
    }
  }
  async send(subject: string) {
    //2)define email options
    const mailOptions: Record<any, any> = {
      from: this.from,
      to: this.to,
      subject,
      text: `hello ${this.name} url: ${this.url}`
    }

    //3)create transport + send email
    await this.newtTransportor().sendMail(mailOptions)
  }
  async sendWelcome() {
    await this.send("Welcom/viewe to the IO")
  }
  async passwordReset() {
    try {
      // Generate a random reset token
      const resetToken = crypto.randomBytes(32).toString("hex")

      // Set the resetToken and resetTokenExpiry in the user model
      this.user.resetToken = resetToken
      this.user.resetTokenExpiry = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes from now
      await this.send(this.url + resetToken)
    } catch (err) {
      console.log("ERROR SENDING EMAIL", err)
    }
  }
}

export default Email
