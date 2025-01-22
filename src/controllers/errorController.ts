import { Response, Request, NextFunction } from "express"
export const errorController = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({
    status: "error",
    message: error.message,
    // Other custom error details can be added here
    stack: error.stack
  })
}
