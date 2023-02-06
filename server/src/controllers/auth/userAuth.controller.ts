import { Request, Response } from "express"
import { IUserAuth } from "../../interfaces/userData.interface"
import userAuthService from "../../services/auth/userAuth.service"

const userAuthController = async (req: Request, res: Response) => {
  const data: IUserAuth = req.body

  const token = await userAuthService(data)

  return res.status(200).json(token)
}

export default userAuthController
