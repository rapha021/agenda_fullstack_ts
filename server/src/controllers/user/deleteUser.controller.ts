import { Request, Response } from "express"
import deleteUserService from "../../services/user/deleteUser.service"

const deleteUserController = async (req: Request, res: Response) => {
  const id: string = req.user.id

  const user = await deleteUserService(id)

  return res.status(204).json(user)
}

export default deleteUserController
