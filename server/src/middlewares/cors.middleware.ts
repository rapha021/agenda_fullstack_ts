import { NextFunction, Request, Response } from "express"
import cors from "cors"

const corsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173")
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")

  next()
}

export default corsMiddleware
