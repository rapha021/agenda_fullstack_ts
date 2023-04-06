import { NextFunction, Request, Response } from "express"

const corsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")

  next()
}

export default corsMiddleware
