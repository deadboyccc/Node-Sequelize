import { UserAttributes } from "./src/models/userModel"
import session from "express-session"

declare global {
  namespace Express {
    interface Request {
      body: {
        user?: UserAttributes
      }
    }
  }
}
declare module "express-session" {
  interface Session {
    loggedIn: string
  }
}
