import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { AppError } from "../../errors/appError"
import { IContactRequestData } from "../../interfaces/contact.interface"

const updateContactService = async (
  contactId: string,
  data: IContactRequestData,
  userId: string
) => {
  const contactRepository = AppDataSource.getRepository(Contact)

  let contact = await contactRepository.findOneBy({ id: contactId })

  if (!contact) {
    throw new AppError(404, "Contato não encontrado.")
  }

  if (contact.user.id !== userId) {
    throw new AppError(404, "Contato não encontrado.")
  }

  await contactRepository.update(contactId, data)

  contact = await contactRepository.findOneBy({ id: contactId })

  return contact
}

export default updateContactService
