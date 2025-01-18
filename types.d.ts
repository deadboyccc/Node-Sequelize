import { UserAttributes } from "./src/models/userModel"

declare global {
  namespace Express {
    interface Request {
      body: {
        user?: UserAttributes
      }
    }
  }
}
