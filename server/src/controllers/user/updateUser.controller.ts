import updateUserService from "../../services/user/updateUser.service"
import { Response, Request } from "express"
import { IUserRequestData } from "../../interfaces/userData.interface"
import { instanceToPlain } from "class-transformer"

const updateUserController = async (req: Request, res: Response) => {
  const data: IUserRequestData = req.body
  const id: string = req.user.id

  const updatedUser = await updateUserService(data, id)

  return res.status(200).json(instanceToPlain(updatedUser))
}

export default updateUserController
