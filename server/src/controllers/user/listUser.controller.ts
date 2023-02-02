import { instanceToPlain } from "class-transformer"
import { Request, Response } from "express"
import listUserService from "../../services/user/listUser.service"

const listUserController = async (req: Request, res: Response) => {
  const id: string = req.user.id

  const user = await listUserService(id)

  return res.status(200).json(instanceToPlain(user))
}

export default listUserController
