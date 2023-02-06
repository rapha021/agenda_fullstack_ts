import { Request, Response } from "express"
import deleteContactService from "../../services/contact/deleteContact.service"

const deleteContactController = async (req: Request, res: Response) => {
  const contactId = req.params.id
  const userId = req.user.id

  await deleteContactService(contactId, userId)

  return res.status(204).json()
}

export default deleteContactController
