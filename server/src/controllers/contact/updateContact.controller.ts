import { Request, Response } from "express"
import { IContactRequestData } from "../../interfaces/contact.interface"
import updateContactService from "../../services/contact/updateContact.service"

const updateContactController = async (req: Request, res: Response) => {
  const data: IContactRequestData = req.body
  const contactId: string = req.params.id
  const userId: string = req.user.id

  const updatedContact = await updateContactService(contactId, data, userId)

  return res.json(updatedContact)
}

export default updateContactController
