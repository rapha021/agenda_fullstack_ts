import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { AppError } from "../../errors/appError"

const deleteContactService = async (contactId: string, userId: string) => {
  const contactRepository = AppDataSource.getRepository(Contact)

  const contact = await contactRepository.findOneBy({ id: contactId })

  if (!contact) {
    throw new AppError(404, "Contato não encontrado.")
  }

  if (contact.user.id !== userId) {
    throw new AppError(404, "Contato não encontrado.")
  }

  contactRepository.delete(contactId)

  return
}

export default deleteContactService
