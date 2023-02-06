import createUserService from "../../services/user/createUser.service"
import { Response, Request } from "express"
import { IUserRequestData } from "../../interfaces/userData.interface"
import { instanceToPlain } from "class-transformer"

const createUserController = async (req: Request, res: Response) => {
  const data: IUserRequestData = req.body

  const newUser = await createUserService(data)

  return res.status(201).json(instanceToPlain(newUser))
}

export default createUserController
