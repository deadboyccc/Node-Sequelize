import { Request, Response, NextFunction, RequestHandler } from "express"

// Define the type for an asynchronous RequestHandler
type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>

/**
 * A higher-order function that wraps an asynchronous request handler
 * and ensures any errors are caught and passed to the next middleware.
 *
 * @param fn - The asynchronous request handler to wrap
 * @returns A request handler that catches errors and forwards them to the next middleware
 */
const catchAsync = (fn: AsyncRequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}

export default catchAsync
