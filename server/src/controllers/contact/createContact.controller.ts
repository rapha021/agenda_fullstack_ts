import { instanceToPlain } from "class-transformer"
import { Request, Response } from "express"
import { IContactRequestData } from "../../interfaces/contact.interface"
import createContactService from "../../services/contact/createContact.service"

const createContactController = async (req: Request, res: Response) => {
  const data: IContactRequestData = req.body
  const id: string = req.user.id

  const contact = await createContactService(data, id)

  return res.status(201).json(instanceToPlain(contact))
}

export default createContactController
