import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/appError"
import jwt from "jsonwebtoken"
import { AppDataSource } from "../data-source"
import { User } from "../entities/user.entity"

const ensureAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization

  if (!token) {
    throw new AppError(401, "Token inválido!")
  }

  token = token.split(" ")[1]

  jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
    if (error) {
      throw new AppError(401, "Token inválido!")
    }

    req.user = { id: decoded.id }

    next()
  })
}

export default ensureAuthMiddleware
